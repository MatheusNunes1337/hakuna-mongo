const errorSerialize = (error) => {
  if (error.details) {
    const errors = error.details.map((err) => ({
      description: err.path[0],
      name: err.message
    }));

    return errors;
  }

  return { description: error.name, name: error.message };
};

module.exports = errorSerialize;
