const serialize = ({ _id, content, creationDate, creationTime, group }) => ({
    _id, 
    content, 
    creationDate, 
    creationTime, 
    group
  });
  
  const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
    helpRequests: docs.map(serialize),
    limit,
    total: totalDocs,
    offset: pagingCounter,
    offsets: totalPages
  });
  
  module.exports = { serialize, paginateSerialize };