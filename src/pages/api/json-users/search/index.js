const checkReqErrors = require('@/includes/status').checkReqErrors;
const usersQuery = require('../../../../json-db/querys/querys');
export default (req, res) => {
  if (req.method === 'GET') {
    usersQuery
      .searchOne(req)
      .then(erg => {
        checkReqErrors(erg, res);
      })
      .catch(err => {
        checkReqErrors({error: 'Something went wrong', err: err}, res);
      });
  }
};
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
