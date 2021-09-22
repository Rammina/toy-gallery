Object.defineProperty(exports, '__esModule', { value: true });
var controller = require('./toy.controller');
exports.default = function (Router) {
  var router = new Router({
    prefix: '/toys',
  });
  router
    .get('/:toyId', controller.getToy)
    .get('/', controller.getToyList)
    .post('/', controller.createToy)
    .patch('/:toyId', controller.editToy)
    .patch('/:toyId/toggle_completion', controller.toggleToyCompletion)
    .delete('/:toyId', controller.deleteToy);
  return router;
};
