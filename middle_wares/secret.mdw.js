import crypto from 'crypto'
const secret_key = function (req, res, next) {

  var secret = "UGFzc3dvcmQxMjNA";
  var url_requests = req.originalUrl;


  var input_token = req.headers.authorization.split(' ')[1];
  input_token = input_token.split("|");
  var input_date = input_token[1];
  var input_time = input_token[2];
  var requests_token = input_token[0];


  var date = new Date();

  var request_date = new Date(input_date + " " + input_time);
  var FIVE_MIN = 5 * 60 * 1000;
  console.log(date - request_date, FIVE_MIN)
  if (date - request_date <= FIVE_MIN) {

    var token = url_requests + input_date + input_time + secret;
    console.log(token);
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    console.log(hash);
    console.log(requests_token)
    if (hash === requests_token) {
      next();
    } else {
      res.status(400).json({ message: "Invalid token" });
    }

  }
  else {
    res.status(400).json({ message: "Invalid date" });
  }
}

export default secret_key;
