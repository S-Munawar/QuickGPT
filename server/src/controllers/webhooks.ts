import Stripe from 'stripe';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';

import { Request, Response } from 'express';

export const stripeWebhook = async (req: Request, res: Response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
        try {
            event = stripe.webhooks.constructEvent(req.body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (err) {
            console.error('[stripeWebhook] signature verification failed:', err);
            return res.status(400).send(`Webhook Error: ${String(err)}`);
        }

        // Log summary of incoming event to help debug why metadata may be missing
        try {
            console.log('[stripeWebhook] received event', { id: event?.id, type: event?.type });
            // Avoid huge dumps; log the object id and keys
            const obj = event?.data?.object || {};
            console.log('[stripeWebhook] event.data.object keys:', Object.keys(obj));
        } catch (logErr) {
            console.warn('[stripeWebhook] error logging event summary', logErr);
        }

    } catch (err) {
        console.error('[stripeWebhook] unexpected error after constructEvent:', err);
        return res.status(500).send('Internal Server Error');
    }

    try{
        console.log('[stripeWebhook] incoming event type:', event?.type);
        switch(event.type){
            
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as any;
                let { transactionId, appId } = paymentIntent.metadata || {};
                
                // If payment intent has no metadata, look up the checkout session
                if (!transactionId) {
                    console.log('[stripeWebhook] payment_intent has no metadata, looking for checkout session');
                    try {
                        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
                        const sessions = await stripe.checkout.sessions.list({
                            payment_intent: paymentIntent.id,
                            limit: 1,
                        });
                        console.log('[stripeWebhook] found sessions:', sessions.data.length);
                        if (sessions.data.length > 0) {
                            const session = sessions.data[0];
                            console.log('[stripeWebhook] session metadata:', session.metadata);
                            transactionId = session.metadata?.transactionId;
                            appId = session.metadata?.appId;
                        }
                    } catch (error) {
                        console.error('[stripeWebhook] error listing checkout sessions:', error);
                    }
                }
                
                if (!transactionId || appId !== 'QuickGPT') {
                    console.log('[stripeWebhook] skipping payment_intent (no transactionId or wrong appId)');
                    return res.status(200).json({ received: true });
                }
                const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
                if (!transaction) {
                    console.log('[stripeWebhook] transaction not found or already paid');
                    return res.status(200).json({ received: true });
                }

                await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits || 0 } });
                transaction.isPaid = true;
                await transaction.save();

                console.log('[stripeWebhook] Transaction completed:', transactionId);
                return res.status(200).json({ received: true });
            }
            
            default: {
                console.log('[stripeWebhook] Unhandled event type:', event.type);
                return res.status(200).json({ received: true });   
            }
        }
    }
    catch (error) {
        console.error('Error processing Stripe webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
};