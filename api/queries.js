if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

const getBackgrounds = (request, response) => {
  executeSelect(`SELECT * FROM wrath_glory.background;`, response, 200);
};
const getBackgroundById = (request, response) => {
  const id = parseInt(request.params.id);
  executeSelect(`SELECT * FROM wrath_glory.background WHERE id = ${id};`, response, 200);
};

const getCharacters = (request, response) => {
  executeSelect(`SELECT * FROM wrath_glory.characters;`, response, 200);
};

const getCharacterById = (request, response) => {
  const id = parseInt(request.params.id);
  executeSelect(`SELECT * FROM wrath_glory.characters where id = ${id};`, response, 200);
};

const createCharacter = (request, response) => {
  const characterObject = JSON.stringify(request.body.state);
  const version = request.body.version;
  executeInsert(
    `INSERT INTO wrath_glory.characters ("character_object", "version") VALUES ('${characterObject}', '${version}');`,
    response,
    201
  );
};

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

const executeInsert = (sql, response, successStatusCode) => {
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

module.exports = {

  // Characters
  createCharacter,
  getCharacters,
  getCharacterById,

  // Backgrounds
  getBackgrounds,
  getBackgroundById,

};
