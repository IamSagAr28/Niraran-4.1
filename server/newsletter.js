const express = require('express');
const { subscribeToNewsletter } = require('./shopify');
const router = express.Router();

/**
 * POST /api/newsletter/subscribe
 * Subscribe an email to the newsletter (adds to Shopify customers with marketing consent)
 */
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
        return res.status(400).json({
            success: false,
            error: 'Valid email address is required'
        });
    }

    try {
        const result = await subscribeToNewsletter(email);

        return res.status(200).json({
            success: true,
            message: result.isNew
                ? 'Thank you for subscribing! Check your email for your 10% discount code.'
                : 'You\'re already subscribed! Check your email for exclusive offers.',
            isNew: result.isNew
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);

        // Check if it's a Shopify API error
        if (error.response?.data) {
            return res.status(500).json({
                success: false,
                error: 'Failed to subscribe. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? error.response.data : undefined
            });
        }

        return res.status(500).json({
            success: false,
            error: 'An error occurred. Please try again later.'
        });
    }
});

module.exports = router;
