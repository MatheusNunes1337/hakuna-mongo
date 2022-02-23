const serialize = ({ _id, name, description, discipline, topics, isPublic, password, favorites, maxMembers, createdAt, members, mods, posts}) => ({
    _id, 
    name, 
    description, 
    discipline, 
    topics, 
    isPublic, 
    password, 
    favorites,
    maxMembers,
    createdAt,
    members,
    mods,
    posts
  });
  
  const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
    groups: docs.map(serialize),
    limit,
    total: totalDocs,
    offset: pagingCounter,
    offsets: totalPages
  });
  
  module.exports = { serialize, paginateSerialize };