const STRING = { type: 'string' };

const EMAIL = { type: 'string', format: 'email' };

const INBOUND_EVENT = {
  type: 'object',
  properties: {
    msg: {
      type: 'object',
      properties: {
        raw_msg: STRING,
        from_name: STRING,
        email: STRING
      },
      required: ['raw_msg', 'from_name', 'email']
    }
  },
  required: ['msg']
};

const INBOUND_EVENTS = {
  type: 'array',
  items: INBOUND_EVENT
};

module.exports = {
  STRING,
  EMAIL,
  INBOUND_EVENTS
};
