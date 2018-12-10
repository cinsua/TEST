//default response to all success scenarios
var server = require('../tools/serverTools')
const UserError = require('../tools/customErrors').UserError

module.exports = {
    sendResponse: async function (req, res, next){
        
        res.setHeader('Content-Type', 'application/json');
        //404 in api v1
        //throw new UserError('Fede Puto','PW1')

        if (!req.data && !req.status){
            req.status = 404
            server.showReq(req)
            res.status(req.status)
            res.send('Not Found in API/v1')
            return next();
        }
        let result = {
            data: req.data,
            success: true
        }
        
        if (!req.status) req.status = 200
        //let status = req.status || 200
        if (process.env.NODE_ENV === 'development'){
            //console.log(`${server.tagGreen} [${req.originalUrl}] [${req.method}] [STATUS: ${req.status}]`)
            server.showReq(req)
        }
        res.status(req.status)
        res.send(result);
        return next();
    }
}