import Transaction from '../models/transactionModel.js';
import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 25,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];

// API controller to get available plans
export const getPlans = (req: Request, res: Response) => {
    try{
        res.status(200).json({ success: true, plans });
    }
    catch{
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// API controller to purchase credits using Stripe
export const purchaseCredits = async (req: Request, res: Response) => {
    try{
        const userId = req.user._id;
        const { planId } = req.body;
        const plan = plans.find(p => p._id === planId);
        if(!plan){
            return res.status(404).json({ success: false, message: "Plan not found" });
        }
        // Create a new transaction
        const transaction = await Transaction.create({
            userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        });

        console.log('[purchaseCredits] created transaction', { transactionId: transaction._id.toString(), userId, planId: plan._id, amount: transaction.amount });


    const { origin } = req.headers;
    console.log('[purchaseCredits] origin header:', origin);

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
            currency: 'usd',
            product_data: { name: plan.name },
            unit_amount: plan.price * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${origin}`,
        cancel_url: `${origin}/cancel`,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        metadata: {
            transactionId: transaction._id.toString(),
            appId: 'QuickGPT'
        }
        });

    console.log('[purchaseCredits] stripe session created', { sessionId: session.id, url: session.url });
    res.status(200).json({ success: true, url: session.url, transactionId: transaction._id });

    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
