if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Pool, Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: true,
  //  user: DATABASE_USER,
  //  host: DATABASE_HOST,
  //  database: DATABASE_NAME,
  //  password: DATABASE_PASSWORD,
  //  port: DATABASE_PORT,
});

const query = (text, params, callback) => { return pool.query(text, params, callback); };

const executeSelect = (sql, response, successStatusCode) => {
  const client = new Client({ connectionString: DATABASE_URL, ssl: true, });
  client.connect();
  client.query(sql, (error, results) => {
    if (error) {
      response.status(500).json({status: 'error', message: `${error}`});
    } else {
      response.status(successStatusCode).json(results.rows);
    }
    client.end();
  });
};

const executeChange = (sql, response, successStatusCode) => {
  const client = new Client({ connectionString: DATABASE_URL, ssl: true, });
  client.connect();
  client.query(sql, (error, results) => {
    if (error) {
      response.status(500).json({status: 'error', message: `${error}`});
    } else {
      response.status(successStatusCode).json({status: 'success'});
    }
    client.end();
  });
};

// USERS
const createUser = (payload, response) => {
  const client = new Client({ connectionString: DATABASE_URL, ssl: true, });
  client.connect();
  pool.query(`INSERT INTO wrath_glory.user (uuid) VALUES ($1) RETURNING *`, [payload.uuid], (error, result) => {
    if ( error ) {
      response.status(500).json({status: 'error', message:'Could not create user.', error: error})
    } else {
      const user = result.rows.map( r => { return { id: r.id, uuid: r.uuid}; });
      response.status(201).json({status:'success', data: user[0] });
    }
    client.end();
  });
};

const getUserByUuid = (uuid) => {

};

// BACKGROUNDS

const getBackgrounds = (request, response) => {
  executeSelect(`SELECT * FROM wrath_glory.background;`, response, 200);
};

const getBackgroundById = (request, response) => {
  const id = parseInt(request.params.id);
  executeSelect(`SELECT * FROM wrath_glory.background WHERE id = ${id};`, response, 200);
};

const createCharacter = (request, response) => {
  const characterObject = JSON.stringify(request.body.state);
  const version = request.body.version;
  const userHash = request.body.userHash;
  executeChange(
    `INSERT INTO wrath_glory.characters ("character_object", "version") VALUES ('${characterObject}', '${version}');`,
    response,
    201
  );
};

const getCharacters = (request, response) => {
  //const userHash = request.body.userHash;
  const userHash = request.header('X-USER-HASH');
  executeSelect(`SELECT * FROM wrath_glory.characters WHERE user_hash = '${userHash}';`, response, 200);
};

const getCharacterById = (request, response) => {
  const id = parseInt(request.params.id);
  executeSelect(`SELECT * FROM wrath_glory.characters where id = ${id};`, response, 200);
};

const updateCharacterById = (request, response) => {
  const id = parseInt(request.params.id);
  const characterObject = JSON.stringify(request.body.state);
  const version = request.body.version;
  const userHash = request.body.userHash;
  executeChange(
    `UPDATE wrath_glory.characters SET "character_object" = '${characterObject}', "version" = '${version}' WHERE id = ${id} AND "user_hash" = '${userHash}';`,
    response,
    200
  );
};

const deleteCharacterById = (request, response) => {
  const id = parseInt(request.params.id);
  const userHash = request.body.userHash;
  executeChange(
    `DELETE FROM wrath_glory.characters WHERE id = ${id} ;`,
    response,
    200
  );
};

module.exports = {

  query,

  // User (account)
  createUser,
  //getUserByUuid,

  // Characters
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacterById,
  deleteCharacterById,

  // Backgrounds
  getBackgrounds,
  getBackgroundById,

};
