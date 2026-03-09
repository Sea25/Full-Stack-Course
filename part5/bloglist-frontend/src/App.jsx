import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import "./index.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  // Load blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Restore logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username/password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  // UPDATE LIKES
  const updateLikes = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const returnedBlog = await blogService.update(blog.id, updatedBlog);

    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
  };

  // DELETE BLOG
  const removeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );

    if (!confirmDelete) return;

    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      setErrorMessage("failed to delete blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // ADD BLOG
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      blogFormRef.current.toggleVisibility();

      // 🔥 FIX for 5.9
      setBlogs(
        blogs.concat({
          ...returnedBlog,
          user: user,
        }),
      );

      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      );

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("failed to add blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // NOT LOGGED IN VIEW
  if (user === null) {
    return (
      <div>
        {notification && <div className="success">{notification}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}

        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  // LOGGED IN VIEW
  return (
    <div>
      {notification && <div className="success">{notification}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  );
}

export default App;
