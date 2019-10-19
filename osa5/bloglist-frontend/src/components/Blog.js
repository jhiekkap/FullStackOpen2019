import React, { useState } from 'react' 

const Blog = ({ blog, user, handleLikeButton, handleRemoveButton }) => {

  const [visible, setVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid', 
    //borderWidth: 1,
    marginBottom: 5
  }
 
  const hideWhenVisible = { display: visible ? 'none' : '' }
  
  return (
    <div className="blog" style={blogStyle}>
      <div style={{ display: '' }} onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div className="likesAndUser" style={hideWhenVisible}>
        {blog.url}<br />
        {blog.likes} likes <button className="btn btn-success" onClick={()=>handleLikeButton(blog)}>like</button><br />
        added by {blog.user.name}<br />
        {user && (user.username === blog.user.username) && <button className="btn btn-danger" onClick={()=>handleRemoveButton(blog)}>remove</button>}
      </div>
    </div>
  )
}
export default Blog