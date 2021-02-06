const admin = async (req, res, next) => {
    try {
        if (req.user.admin == 0) {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({error: 'Unauthorized'})
    }
}

module.exports = admin