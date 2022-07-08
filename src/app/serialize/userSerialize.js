const serialize = ({ _id, username, email, password, type, area, profilePic, contributionPoints, groups, helpRequests }) => ({
    _id, 
    username, 
    email, 
    password, 
    type,
    area, 
    profilePic, 
    contributionPoints, 
    groups,
    helpRequests
  });
  
  const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
    users: docs.map(serialize),
    limit,
    total: totalDocs,
    offset: pagingCounter,
    offsets: totalPages
  });
  
  module.exports = { serialize, paginateSerialize };