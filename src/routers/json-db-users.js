const express = require('express');
const router = express.Router();
const checkReqErrors = require('../includes/status').checkReqErrors;
const usersQuery = require('../json-db/querys/querys');

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
  usersQuery
    .createOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.delete('/', (req, res) => {
  usersQuery
    .deleteOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.patch('/', (req, res) => {
  usersQuery
    .updateOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.get('/search', (req, res) => {
  usersQuery
    .searchOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.get('/:id', (req, res) => {
  usersQuery
    .findOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.get('/search/:email', (req, res) => {
  usersQuery
    .searchOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors({error: 'Something went wrong', err: err}, res);
    });
});

router.post('/:email', (req, res) => {
  usersQuery
    .createOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.delete('/:email', (req, res) => {
  usersQuery
    .deleteOne(req)
    .then(erg => {
      checkReqErrors(erg, res);
    })
    .catch(err => {
      checkReqErrors(err, res);
    });
});

router.patch('/:email', (req, res) => {
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
