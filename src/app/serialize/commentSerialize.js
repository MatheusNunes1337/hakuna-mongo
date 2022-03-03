const serialize = ({ _id, content, creationDate, creationTime, likes, deslikes, author, files, post }) => ({
    _id, 
    content, 
    creationDate, 
    creationTime, 
    likes, 
    deslikes, 
    author,
    files, 
    post
  });
  

  const allComentsSerialize = ({comments}) => ({
    comments: comments.map(serialize),
  });
  
  
  module.exports = { serialize, allComentsSerialize };