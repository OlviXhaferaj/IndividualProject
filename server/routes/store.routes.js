const StoreControllers = require('../controllers/store.controllers');
const {authenticate} = require('../config/jwt.config');
const {authPage} =require('../middleware')

module.exports = (app) => {
    app.get('/api/store', StoreControllers.findAllProducts);
    app.get('/api/store/:id', StoreControllers.findOneProduct);
    app.post('/api/store',authenticate,authPage(["Admin"]), StoreControllers.createProduct);
    app.put('/api/store/:id',authenticate, authPage(["Admin"]), StoreControllers.updateProduct);
    app.put('/api/store/buy/:id',authenticate, StoreControllers.updateProduct);

    app.delete('/api/store/:id', authenticate, authPage(["Admin"]),  StoreControllers.deleteProduct);
}