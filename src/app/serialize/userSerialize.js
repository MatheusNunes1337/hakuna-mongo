const serialize = ({ _id, username, email, password, type, profilePic, contributionPoints, groups }) => ({
    _id, 
    username, 
    email, 
    password, 
    type, 
    profilePic, 
    contributionPoints, 
    groups
  });
  
  const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
    users: docs.map(serialize),
    limit,
    total: totalDocs,
    offset: pagingCounter,
    offsets: totalPages
  });
  
  module.exports = { serialize, paginateSerialize };