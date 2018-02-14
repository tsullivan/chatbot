const mapFieldToResponse = (field, value) => {
  const map = {
    name: `Hello, ${value}! Nice to meet you.`
  };

  return map[field] || null;
};

module.exports = { mapFieldToResponse };
