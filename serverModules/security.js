var security = {
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
          
            return true;
        } else
            res.json(401, "User need to be authenticated to access this resource!");

    }
}


module.exports = security;