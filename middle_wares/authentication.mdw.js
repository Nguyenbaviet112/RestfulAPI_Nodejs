
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const basic_authentication = async function (req, res, next) {

  var data = req.headers.authorization;

  if (data)
  {
    data = data.split(' ')[1];
    var account = Buffer.from(data, 'base64').toString('utf-8');


    account = account.split(':');
    var username = account[0]
    var password = account[1]


    const user = await userModel.findByUsername(username);

    if (user == null)
    {
        return res.status(401).json({
            authenticated : false
        });
    }

    if (bcrypt.compareSync(password, user.password) == false){
        return res.status(401).json({
            authenticated : false
        });
    }

    next();
    
  }
  else{
    return res.status(401).json({
      authenticated: false
    })
  }
}

  

export default basic_authentication;