// const express = require("express");
// require('express-async-errors');
// const expressRouter = express.Router;

// function hookCustomMethods(router) {
//   const prefix = (prefix) => {
//     router._prefix = prefix;
//     return router;
//   }
//   const registerController = (controller) => {
//     const allowedMethods = ["get", "post", "put", "patch", "delete", "options"];
//     const { method, middlewares = [], handler, path } = controller;
//     if (!method || !handler || !path)
//       throw new Error("BaseRoute.registerController: controller must have path, method, handler properties");
//     if (!allowedMethods.includes(method.toLowerCase()))
//       throw new Error(`BaseRoute.registerController: controller allowed methods: ${allowedMethods.join(', ')}`);
//     const concatPath = router._prefix ? `${router._prefix}/${path}` : path;
//     router[method.toLowerCase()](
//       concatPath.replace(/\/+/g, '/'), // remove duplicate slash /
//       middlewares,
//       handler,
//     );
//     return router;
//   }
//   router.prefix = prefix;
//   router.registerController = registerController;
// }

// function overrideExpressRouter() {
//   express.Router = function () {
//     const router = expressRouter.apply(this, arguments);
//     hookCustomMethods(router)
//     return router;
//   };
// }

// overrideExpressRouter();

// module.exports = express.Router;

const userRouter = require("../../user/router");


const arrayRouters = [
    userRouter
]

module.exports = arrayRouters;