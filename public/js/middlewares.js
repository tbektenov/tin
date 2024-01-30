const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    let token = req.cookies.token;

    var details = {
        title: "Unauthorized",
        description: "Unauthorized page."
    }

    if(!token) {
        return res.redirect('/login');
    }
    
    try {
        let decodedToken = jwt.verify(token, 'AbiyDyadyaZaChtosh');
        req.userId = decodedToken.userId;
        req.isAdmin = decodedToken.isAdmin;
        next(); 
    } catch (error) {
        return res.render('user/unauthorizedPage', { details });
    }
};

module.exports = { authMiddleWare };