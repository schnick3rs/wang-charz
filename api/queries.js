if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

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
  console.info(sql);
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
