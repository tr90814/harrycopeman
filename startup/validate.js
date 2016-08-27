const JSCK = require('jsck');

const validate = function(res, schemaObj, data) {
  const schema = new JSCK.draft4(schemaObj);
  const { errors, valid } = schema.validate(data);
  if (valid) return true;
  console.error('[validation_error]', JSON.stringify(errors, null, 2));
  res.statusCode = 401;
  res.data = { errors };
  res.end('Validation error.');
  return false;
};

module.exports = {
  validate
};
