import React  from "react" 

const BlogForm = ({
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl,
  handleCreateBlog,
}) => {
 
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div className="form-group">
          title:
          <input
            className="form-control"
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div className="form-group">
          author:
          <input
            className="form-control"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div className="form-group">
          url:
          <input
            className="form-control"
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm 
