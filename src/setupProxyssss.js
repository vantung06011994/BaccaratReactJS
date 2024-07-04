//const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
//const host = "http://172.31.77.22:8080/";
const host = "http://172.31.77.98:8081/";

// All controllers to be proxied
// Sync with components/dashboard-routes/Iframe/iframeMap.js
const controllers = ["/api"];
const proxyAll = createProxyMiddleware("/", { target: host });

module.exports = (app) => {
    app.use((req, res, next) => {
        if (controllers.some((c) => req.path.startsWith(c))) {
            proxyAll(req, res, next);
        } else {
            next();
        }
    });
};

//module.exports = function(app) {
//   app.use(proxy(  '/',{   target: host+'/'}));
//   app.use(proxy(  '/api',{   target: host+'/api'}));
//   app.use(proxy(  '/themes',{   target: host+'/themes'}));
//   app.use(proxy(  '/locales',{   target: host+'/locales'}));
//   app.use(proxy(  '/login',{   target: host+'/login'}));
//   app.use(proxy(  '/logout',{   target: host+'/logout'}));
//};
