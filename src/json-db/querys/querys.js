const db = require('../db/db').db;

try {
  db.count('/json-users');
} catch (error) {
  let user = [
    {
      email: 'nulla.tempor@curabitur.edu',
      password: 'password',
      emailVerified: false,
      displayName: 'Deborah Ochoa',
      photoUrl: 'http://www.host/photo.jpg',
      phoneNumber: '+449956933282',
      disabled: false,
    },
    {
      email: 'nunc.ut.erat@classaptenttaciti.co.uk',
      password: 'password',
      emailVerified: false,
      displayName: 'Maite Dixon',
      photoUrl: 'http://www.host/photo.jpg',
      phoneNumber: '+445234038881',
      disabled: true,
    },
    {
      email: 'odio.etiam.ligula@nonummy.org',
      password: 'password',
      emailVerified: true,
      displayName: 'Savannah Watkins',
      photoUrl: 'http://www.host/photo.jpg',
      phoneNumber: '+449756972227',
      disabled: true,
    },
    {
      email: 'tempus.mauris.erat@enim.net',
      password: 'password',
      emailVerified: false,
      displayName: 'Isaiah Stout',
      photoUrl: 'http://www.host/photo.jpg',
      phoneNumber: '+444619021745',
      disabled: false,
    },
    {
      email: 'malesuada.augue@nibhaliquamornare.com',
      password: 'password',
      emailVerified: true,
      displayName: 'Kirsten Joseph',
      photoUrl: 'http://www.host/photo.jpg',
      phoneNumber: '+441519076042',
      disabled: true,
    },
  ];
  db.push(`/users`, user, true);
  console.error('Created Users');
}
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
    queryFields && queryFields.search_email
      ? queryFields.search_email
      : bodyFields.search_email;
  let ind = db.getIndex('/users', search, 'email');
  if (ind === -1) return {error: 'No results'};
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
