import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { Table } from 'react-bootstrap'
import LoginForm from "./components/LoginForm"
import { useField } from "./hooks"

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("") 
  const blogFormRef = React.createRef()
  const username = useField("text");
  const password = useField("password");

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, []) 

  useEffect(() => {
    const loggedUserJSON = window
      .localStorage
      .getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleCreateBlog = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    console.log(' NEW STUFF', newTitle, newAuthor, newUrl)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    let returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    setNotification(`positive  a new blog ${newTitle} by ${newAuthor} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLikeButton = async (blog) => {

    let upDatedBlog = { ...blog, likes: blog.likes + 1 }
    let returnedBlog = await blogService.update(blog.id, upDatedBlog)
    setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : upDatedBlog))
    console.log('UPDATED BLOG: ', returnedBlog)
  }

  const handleRemoveButton = async (blog) => {

    if (user) {
      if (user.username === blog.user.username) {
        if (window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author} ? `)) {
          let id = blog.id
          await blogService.remove(id)
          setBlogs(blogs.filter(blog => blog.id !== id))
          console.log('REMOVED BlOG: ', blog)
        }
      } else {
        alert('removing not allowed')
      }
    } else {
      alert('removing possible only by logged user')
    }
  }


  const handleLogin = async event => {
    
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(
        "LOCALSTORAGE: ",
        window.localStorage.getItem("loggedBlogAppUser")
      );

      setUser(user);
      username.reset();
      password.reset(); 

    } catch (exception) {
      setNotification(" wrong username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window
      .localStorage
      .removeItem('loggedBlogappUser')
    setUser(null)
    console.log('LOCALSTORAGE: ', window.localStorage.getItem('loggedBlogappUser'))
  }

  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return -1
    }
    if (a.likes > b.likes) {
      return 1
    }
    return 0
  }

  //objs.sort( compare ) 

  return (

    <div className="container">
      {/*  {user === null && loginForm()} */}
      {!user &&
        <LoginForm
          className="login"
          notification={notification}
          username={username}
          password={password} 
          handleLogin={handleLogin}
        />}
      {user &&
        <div >
          <div className="row">
            <h2>blogs</h2>
          </div>
          <div className="row">
            <Notification notification={notification} />
          </div>
          <div className="row">
            {user &&
              <p>{user.name}&nbsp;
                logged in&nbsp;
                    <button onClick={handleLogout} className="btn btn-primary">
                  logout</button>
              </p>}
          </div>
          <div className="row">
            <Table striped>
              <tbody>
                {blogs.sort(compare).map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleLikeButton={handleLikeButton}
                        handleRemoveButton={handleRemoveButton}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {user && <div className="row">
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newAuthor={newAuthor}
                setNewAuthor={setNewAuthor}
                newUrl={newUrl}
                setNewUrl={setNewUrl}
                handleCreateBlog={handleCreateBlog}
              />
            </Togglable>
          </div>}
        </div>}
      <Footer />
    </div>
  )
}

export default App 
