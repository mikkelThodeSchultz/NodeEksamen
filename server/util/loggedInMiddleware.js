
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
}

export {isLoggedIn, isLoggedOut};