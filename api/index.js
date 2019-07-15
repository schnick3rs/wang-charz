// https://www.nexmo.com/blog/2018/09/11/add-2fa-to-nuxt-with-nexmo-verify-dr?sf92467419=1
// api/index.js

console.log(`exporting api/index`);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Client } = require('pg');

const DATABASE_URL = process.env.databaseUrl;

export default function (request, response, next) {

  // req is the Node.js http request object
  console.log(request.path)
  //console.log(`using ${DATABASE_URL}`);

  // res is the Node.js http response object

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: true,
  });

  client.connect();

  client.query('SELECT id, name, hint FROM wrath_glory.background;', (err, res) => {
    if (err) {
      response.status(500).json({status: 'error', message: 'Something went wrong'});
    };

    let data = [];
    for (let row of res.rows) {
      data.push(row)
    }
    console.log(data);
    response.status(200).json({status: 'success', data: data});
    client.end();
  });

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
}
