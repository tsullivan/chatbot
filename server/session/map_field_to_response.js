const mapFieldToResponse = (field, value) => {
  const map = {
    name: {
      method: 'setName',
      response: `Hello, ${value}! Nice to meet you.`,
    },
  };
  const noMapping = { response: null };
  return map[field] || noMapping;
};

module.exports = { mapFieldToResponse };
