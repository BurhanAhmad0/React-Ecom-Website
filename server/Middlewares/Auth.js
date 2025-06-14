const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
    const token = req.cookies.SESSION_TOKEN;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = Auth;
