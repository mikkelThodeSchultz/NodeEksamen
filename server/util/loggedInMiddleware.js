
const isLoggedIn = (req, res, next) => {
    if (!req.session.isUserLoggedIn) {
    return res.status(400).json({ message: "User is not logged in" });
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.isUserLoggedIn){
        return res.status(400).json({message: "User is logged in"})
    }
    next();
};

const isAdmin = (req, res, next) => {
    if(req.session.role !== "Admin"){
        return res.status(400).json({message: "Logged in user is not an Admin"})
    }
    next();
};
export {isLoggedIn, isLoggedOut, isAdmin};