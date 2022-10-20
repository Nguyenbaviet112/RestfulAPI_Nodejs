import db from "../utils/db.js";

const basic_authentication = async function (req, res, next)
{
  let data = req.headers['authentication'];
  console.log("data: " + data);
  let account = Buffer.from(data, 'base64').toString('utf-8');

  
  account = account.split('|');
  let username = account[0]
  let password = account[1]

  let result = await db('account').where('username', username)
                            .andWhere('password', password);

  if (result.length != 0) {
    next();
  }
  else
  {
    res.status(400).json({ message: 'Username or password is incorrect' });
  }
}

export default basic_authentication;