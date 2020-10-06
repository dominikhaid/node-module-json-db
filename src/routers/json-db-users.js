const express = require('express');
const router = express.Router();
const checkReqErrors = require('../includes/status').checkReqErrors;
const usersQuery = require('../json-db/querys/querys');
const db = require('../json-db/db/db').db;

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
  db.push(`/json-users[]`, user, true);
  console.error('Created Users');
}

router.get('/json-users', (req, res) => {
  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    usersQuery
      .findOne(req)
      .then(erg => {
        checkReqErrors(erg, res);
      })
      .catch(err => {
        checkReqErrors({error: 'Something went wrong', err: err}, res);
      });
  } else {
    usersQuery
      .find(req)
      .then(erg => {
        checkReqErrors(erg, res);
      })
      .catch(err => {
        checkReqErrors({error: 'Something went wrong', err: err}, res);
      });
  }
});

router.post('/json-users', (req, res) => {
  usersQuery
    .createOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.delete('/json-users', (req, res) => {
  usersQuery
    .deleteOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.patch('/json-users', (req, res) => {
  usersQuery
    .updateOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.get('/json-users/search', (req, res) => {
  usersQuery
    .searchOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.get('/json-users/:id', (req, res) => {
  usersQuery
    .findOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.get('/json-users/search/:email', (req, res) => {
  usersQuery
    .searchOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.post('/json-users/:email', (req, res) => {
  usersQuery
    .createOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.delete('/json-users/:email', (req, res) => {
  usersQuery
    .deleteOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.patch('/json-users/:email', (req, res) => {
  usersQuery
    .updateOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

module.exports = router;
