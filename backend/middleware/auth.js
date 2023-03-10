const VALID_AUTH_TOKEN = 'valid_token';
const ROLE_ADMIN = 'Admin';

const validateAuthToken = (req, res, next) => {
    const authToken = req.headers["authorization-token"];

    if (!authToken || authToken !== `Bearer ${VALID_AUTH_TOKEN}`) {
        return res.status(401).json({ error: 'Invalid authorization token' });
    }

    next();
}

const validateAuthTokenRole = (roleName) => {
    return (req, res, next) => {
        const authToken = req.headers["authorization-token"];

        if (!authToken || authToken !== `Bearer ${VALID_AUTH_TOKEN}`) {
            return res.status(401).json({ error: 'Invalid authorization token' });
        }

        if (roleName !== ROLE_ADMIN) {
            return res.status(403).json({ error: 'Access forbidden' });
        }

        next();
    };
}

module.exports = { validateAuthToken, validateAuthTokenRole };