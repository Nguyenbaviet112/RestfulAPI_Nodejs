import logger from "../utils/logger.js";

const logging = function (req, res, next) {
  

    var path = req.get("host") + req.originalUrl;
  
  
    var res_status = 0;
  
    var oldSend = res.send;
  
    console.log(JSON.stringify(req.body) + '')
  
    res.send = function(data)
    {
  
      res_status = res.statusCode;
      
      logger.log(
        "info",
        "method: " +
          `${req.method}` +
          " url: " +
          `${req.url}` +
          " path: " +
          path +
          " statusCode: " +
          res_status +
          " response: " +
          data +
          " requestBody: " +
          JSON.stringify(req.body)
          
      );
  
      oldSend.apply(res, arguments);
  
    }
    
    next();
  };

  export default logging;