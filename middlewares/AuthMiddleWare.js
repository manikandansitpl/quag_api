const jwt = require("jsonwebtoken");
const User = require("../scheema/AuthScheema");

const Authentication = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extracting the token part
            const decode = await jwt.verify(token, "mani22kpcbh");
            req.user = await User.findById(decode.id).select('-password'); // Corrected the method name
            next();
        } catch (error) {  
            return res.status(403).json({ error: "Authentication failed!" }); // Improved error handling
        }
    } else {
        return res.status(401).json({ error: "Token not provided, user not authenticated!" }); // Improved error handling
    }
}

module.exports = Authentication;
