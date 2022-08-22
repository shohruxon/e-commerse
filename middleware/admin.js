module.exports = (req, res, next) => {
    if (req.session.auth) {
        if (req.session.admin.status === 'admin') {
            req.session.admin.moderator = true
        } else {
            req.session.admin.intern = true
        }

        console.log(req.session.admin);
        res.locals.admin = req.session.admin
        next()
        return
    }

    next()
}