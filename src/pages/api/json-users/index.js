const checkReqErrors = require('@/includes/status').checkReqErrors;
const usersQuery = require('../../../json-db/querys/querys');

export default (req, res) => {
  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    if (req.method === 'GET') {
      usersQuery
        .findOne(req)
        .then(erg => {
          checkReqErrors(erg, res);
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    } else if (req.method === 'DELETE') {
      usersQuery
        .deleteOne(req)
        .then(erg => {
          checkReqErrors(erg, res);
        })
        .catch(err => {
          checkReqErrors(err, res);
        });
    } else if (req.method === 'POST') {
      usersQuery
        .createOne(req)
        .then(erg => {
          checkReqErrors(erg, res);
        })
        .catch(err => {
          checkReqErrors(err, res);
        });
    } else if (req.method === 'PATCH') {
      usersQuery
        .updateOne(req)
        .then(erg => {
          checkReqErrors(erg, res);
        })
        .catch(err => {
          checkReqErrors(err, res);
        });
    }
  } else {
    if (req.method === 'GET') {
      usersQuery
        .find(req)
        .then(erg => {
          checkReqErrors(erg, res);
        })
        .catch(err => {
          checkReqErrors({error: 'Something went wrong', err: err}, res);
        });
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
