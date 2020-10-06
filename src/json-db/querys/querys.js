const db = require('../db/db').db;

const setUser = ({
  id = null,
  email = null,
  phoneNumber = undefined,
  emailVerified = false,
  displayName = null,
  photoUrl = undefined,
  disabled = false,
}) => {
  return id
    ? {
        uid: id,
        email: decodeURIComponent(email),
        phoneNumber: decodeURIComponent(phoneNumber),
        emailVerified: Boolean(Number(emailVerified)),
        displayName: decodeURIComponent(displayName),
        photoUrl: decodeURIComponent(photoUrl),
        disabled: Boolean(Number(disabled)),
      }
    : {
        email: decodeURIComponent(email),
        phoneNumber: decodeURIComponent(phoneNumber),
        emailVerified: Boolean(Number(emailVerified)),
        displayName: decodeURIComponent(displayName),
        photoUrl: decodeURIComponent(photoUrl),
        disabled: Boolean(Number(disabled)),
      };
};

try {
  var data = db.getData('/users');
  let search = db.getData(
    `/users[${db.getIndex('/users', 'tempus.mauris.erat@enim.net', 'email')}]`,
  );
  let numberOfElement = db.count('/users');
  let ind = db.getIndex('/users', 'tempus.mauris.erat@enim.net', 'email');
  let last = db.getData('/users[-1]');
} catch (error) {
  console.error(error);
}

// Deleting data
//db.delete('/test1');
// db.delete(
//   '/arraytest/myarray[' + db.getIndex('/arraytest/myarray', 65464646155) + ']',
// );

// Save the data (useful if you disable the saveOnPush)
//db.save();

/**
 *
 *Find all Documents
 *
 */
module.exports.find = async req => {
  let res = new Object();

  res = db.getData('/users');
  if (!res) return {error: 'No results'};
  return res;
};

/**
 * CREATE PERsON
 */

module.exports.createOne = async req => {
  let [queryFields, bodyFields] = req.xssFilter([
    'email',
    'phoneNumber',
    'emailVerified',
    'photoUrl',
    'displayName',
    'disabled',
  ]);

  let data = queryFields ? setUser(queryFields) : setUser(bodyFields);

  db.push(`/users[]`, data, true);

  return data;
};

/**
 * READ PERSON
 */

module.exports.findOne = async req => {
  let res = new Object();
  let [queryFields, bodyFields] = req.xssFilter(['id']);

  let id =
    queryFields && queryFields.id
      ? Number(queryFields.id)
      : Number(bodyFields.id);

  res = db.getData(`/users[${id}]`);

  if (!res) return {error: 'No results'};
  return res;
};

/**
 *SEARCH
 */
module.exports.searchOne = async req => {
  let res = new Object();
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let search =
    queryFields && queryFields.email ? queryFields.email : bodyFields.email;
  let ind = db.getIndex('/users', search, 'email');
  if (ind === -1) return {error: 'No results'};
  res = db.getData(`/users[${ind}]`);

  if (!res) return {error: 'No results'};
  return res;
};

/**
 * UPDATE PERSON
 */
module.exports.updateOne = async function (req) {
  let [queryFields, bodyFields] = req.xssFilter([
    'email',
    'phoneNumber',
    'emailVerified',
    'photoUrl',
    'displayName',
    'disabled',
    'search_email',
  ]);

  let data = queryFields ? setUser(queryFields) : setUser(bodyFields);

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      if (element === undefined || element === 'undefined') delete data[key];
    }
  }

  let search =
    queryFields && queryFields.email ? queryFields.email : bodyFields.email;
  let ind = db.getIndex('/users', search, 'email');

  db.push(`/users[${ind}]`, data, false);

  data = db.getData(`/users[${ind}]`);
  return data;
};

/**
 *DELTE PERSON
 */

module.exports.deleteOne = async function (req) {
  let [queryFields, bodyFields] = req.xssFilter(['email']);

  let search =
    queryFields && queryFields.email ? queryFields.email : bodyFields.email;
  let ind = db.getIndex('/users', search, 'email');
  if (ind === -1) return {error: 'No results'};

  db.delete(`/users[${ind}]`);
  return search;
};
