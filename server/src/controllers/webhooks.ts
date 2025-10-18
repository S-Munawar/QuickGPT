import Stripe from 'stripe';
import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';

export const stripeWebhook = async (req: any, res: any) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);

    } catch (err) {
        console.error('Stripe webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    try{
        switch(event.type){
            case 'payment_intent.succeeded':{
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                    limit: 1,
                });
                const session = sessionList.data[0];
                if (!session || !session.metadata) return res.status(400).send('No session metadata found');
                const {transactionId, appId} = session.metadata;
                if(appId === 'QuickGPT'){
                    const transaction = await Transaction.findOne({_id: transactionId, isPaid: false});
                    // Update transaction and user credits
                    if (!transaction) return res.status(400).send('Transaction not found or already paid');
                    await User.updateOne({_id: transaction.userId}, { $inc: { credits: transaction.credits || 0 } });

                    // Update credit transaction status
                    transaction.isPaid = true;
                    await transaction.save();
                }
                else return res.status(400).send('Invalid appId in metadata');
            }
            default:{
                return res.status(400).send('Unhandled event type');   
            }
        }
    }
    catch (error) {
        console.error('Error processing Stripe webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
};