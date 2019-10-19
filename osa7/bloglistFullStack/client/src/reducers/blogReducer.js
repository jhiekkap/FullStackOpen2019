import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
  /*  console.log('blog state now: ', state)
  console.log('blog action', action) */
  switch (action.type) {
    case 'LIKE_BLOG': 
      let likedBlog = action.data
      return state.map(blog => (blog.id !== likedBlog.id ? blog : likedBlog))
    case 'COMMENT_BLOG':
      let commentedBlog = action.data
      return state.map(blog =>
        blog.id !== commentedBlog.id ? blog : commentedBlog
      )
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.like(likedBlog.id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog,
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = { ...blog, comments: blog.comments.concat(comment) }
    await blogService.comment(commentedBlog.id, commentedBlog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog,
    })
  }
}

export default blogReducer
