const transformFilterToRegex = (filter) => {
    const objFields = Object.keys(filter);
    objFields.forEach((field) => {
      filter[field] = new RegExp(filter[field], 'i');
    });
  
    return filter;
};

module.exports = transformFilterToRegex;
  