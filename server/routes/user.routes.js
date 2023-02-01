const userControllers = require('../controllers/user.controllers')

module.exports = (app) => {
    app.post("/api/users/register", userControllers.register);
    app.post("/api/users/login", userControllers.login);
    app.post("/api/users/logout", userControllers.logout);
}