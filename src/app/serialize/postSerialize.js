const serialize = ({ _id, content, creationDate, creationTime, likes, deslikes, author, comments, group }) => ({
    _id, 
    content, 
    creationDate, 
    creationTime, 
    likes, 
    deslikes, 
    author, 
    comments,
    group
  });
  
  const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
    posts: docs.map(serialize),
    limit,
    total: totalDocs,
    offset: pagingCounter,
    offsets: totalPages
  });
  
  module.exports = { serialize, paginateSerialize };