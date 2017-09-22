const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req,res) => {
      const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'eur',
            description: 'Pay',
            source: req.body.token.id
        });

        req.user.credits += req.body.amount;
        const user = await req.user.save();

        res.send(user);

    });

};