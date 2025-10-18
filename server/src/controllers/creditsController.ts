import Transaction from '../models/transactionModel.js';
import razorpay from '../config/razorpay.js';
import Razorpay from 'razorpay';
import Stripe from 'stripe';

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
export const getPlans = (req: any, res: any) => {
    try{
        res.status(200).json({ success: true, plans });
    }
    catch{
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// API controller to handle credit purchase using Razorpay
// export const purchaseCredits = async (req: any, res: any) => {
//     try{
//         const userId = req.user._id;
//         const { planId } = req.body;
//         const plan = plans.find(p => p._id === planId);
//         if(!plan){
//             return res.status(404).json({ success: false, message: "Plan not found" });
//         }
//         // Create a new transaction
//         const transaction = await Transaction.create({
//             userId,
//             planId: plan._id,
//             amount: plan.price,
//             credits: plan.credits,
//             isPaid: false
//         });

//         // In a real application, integrate with a payment gateway here
//         const options = {
//             amount: transaction.amount * 100, // amount in paise
//             currency: "INR",
//             receipt: `txn_${transaction._id}`, // unique receipt id
//             payment_capture: 1,               // 1 = auto-capture payment
//         };
//         // 1. Creating Order using razorpay SDK
//         const order = await razorpay.orders.create(options);
//         if (!order) return res.status(500).json({ success: false, message: "Error creating payment order" });

//         // 2. Sending order details to client
//         return res.status(200).json({order, transactionId: transaction._id});

//         // 3. Verify payment signature


//         // 4. Update transaction status in DB


//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// }

// API controller to handle credit purchase using Stripe
export const purchaseCredits = async (req: any, res: any) => {
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


        const { origin } = req.headers;

        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
            currency: 'usd',
            product_data: { name: plan.name },
            unit_amount: plan.price * 100,
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: `${origin}/success`,
        cancel_url: `${origin}/cancel`,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        metadata: {
            transactionId: transaction._id.toString(),
            appId: 'QuickGPT'
        }
        });

        res.status(200).json({ url: session.url, transactionId: transaction._id });


    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
