const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    let token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        let decodedToken = jwt.verify(token, 'AbiyDyadyaZaChtosh');
        req.userId = decodedToken.userId;
        req.isAdmin = decodedToken.isAdmin;
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authMiddleWare };