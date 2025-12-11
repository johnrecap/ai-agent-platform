/**
 * Admin Authorization Middleware
 * AI Agent Hosting Platform
 */

/**
 * Middleware to check if user is admin
 * Must be used AFTER auth middleware
 */
const adminAuth = (req, res, next) => {
    try {
        // Check if user exists (auth middleware should have set this)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        next();
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        return res.status(500).json({
            success: false,
            error: 'Authorization error'
        });
    }
};

module.exports = adminAuth;
