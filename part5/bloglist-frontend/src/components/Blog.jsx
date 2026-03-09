import { useState } from "react";

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // 🔥 Safe check for owner (handles both object and string cases)
  const isOwner =
    user &&
    blog.user &&
    (blog.user.id
      ? blog.user.id === user.id || blog.user.id === user.username // Check username fallback
      : blog.user === user.id);

  return (
    <div style={blogStyle} className="blog">
      <div className="blogContent">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div className="togglableContent">
          <div>{blog.url}</div>

          <div>
            likes {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>

          <div>{blog.user?.name}</div>

          {/* ✅ Delete button only for owner */}
          {isOwner && (
            <button onClick={() => removeBlog(blog.id)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
