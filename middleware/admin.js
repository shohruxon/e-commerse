module.exports = (req, res, next) => {
    if (req.session.auth) {
        if (req.session.admin === 'admin') {
            req.session.admin.moderator = true
        } else {

            req.session.admin.intern = true
        }
        res.locals.admin = req.session.admin
        next()  
    } else {
        res.redirect('/auth/login')
    }

}