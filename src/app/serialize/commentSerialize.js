const serialize = ({ _id, content, creationDate, creationTime, likes, deslikes, author, post }) => ({
    _id, 
    content, 
    creationDate, 
    creationTime, 
    likes, 
    deslikes, 
    author, 
    post
  });
  

  const allComentsSerialize = ({comments}) => ({
    comments: comments.map(serialize),
  });
  
  
  module.exports = { serialize, allComentsSerialize };