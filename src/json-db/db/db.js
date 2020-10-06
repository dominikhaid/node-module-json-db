const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const Options = require('../../../config/json-db-conf');

module.exports.db = new JsonDB(
  new Config(
    Options.path,
    Options.pushSave,
    Options.readable,
    Options.seperator,
  ),
);
