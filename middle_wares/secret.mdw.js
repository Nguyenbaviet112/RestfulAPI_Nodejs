import crypto from 'crypto'
const secret_key = function (req, res, next) {

  var secret = "UGFzc3dvcmQxMjNA";
  var url_requests = req.originalUrl;

  var input_token = req.headers.authorization;

  if (input_token)
  {
    input_token = input_token.split(' ')[1];
    input_token = input_token.split("|");

    var request_time = input_token[1];
    var requests_token = input_token[0];
  
    var current_time = Date.now();
  
    if (current_time - request_time <= 60000) {
  
      var token = url_requests + request_time + secret;

      const hash = crypto.createHash("sha256").update(token).digest("hex");

      if (hash === requests_token) {
        next();
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
  
    }
    else {
      res.status(401).json({ message: " Invalid time. " });
    }
  }
  else {
    res.status(401).json({ message: " token not found. " });
  }
  
}

export default secret_key;
