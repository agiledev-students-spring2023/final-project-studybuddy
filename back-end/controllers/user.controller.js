
const loginController = (req, res) => {
    const { username, password } = req.body;
    return res.status(200).json({token: "123"})
}

module.exports = {
    loginController
}