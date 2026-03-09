import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Testing React components",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      username: "root",
      name: "Superuser",
    },
  };

  const user = {
    username: "root",
    name: "Superuser",
  };

  const mockUpdateLikes = vi.fn();
  const mockRemoveBlog = vi.fn();

  test("renders title and author but not url or likes by default", () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />,
    );

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("Testing React components");
    expect(div).toHaveTextContent("Test Author");

    const togglableContent = container.querySelector(".togglableContent");
    expect(togglableContent).toBeNull();
  });

  test("renders url and likes when view button is clicked", async () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />,
    );

    const userInstance = userEvent.setup();
    const button = screen.getByText("view");
    await userInstance.click(button);

    const togglableContent = container.querySelector(".togglableContent");
    expect(togglableContent).toBeInTheDocument();
    expect(togglableContent).toHaveTextContent("http://testurl.com");
    expect(togglableContent).toHaveTextContent("likes 5");
  });

  test("if like button is clicked twice, event handler is called twice", async () => {
    render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        removeBlog={mockRemoveBlog}
      />,
    );

    const userInstance = userEvent.setup();
    const viewButton = screen.getByText("view");
    await userInstance.click(viewButton);

    const likeButton = screen.getByText("like");
    await userInstance.click(likeButton);
    await userInstance.click(likeButton);

    expect(mockUpdateLikes.mock.calls).toHaveLength(2);
  });
});
