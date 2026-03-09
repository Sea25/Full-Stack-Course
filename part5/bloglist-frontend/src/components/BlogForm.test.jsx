import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByText("title:").querySelector("input");
  const inputAuthor = screen.getByText("author:").querySelector("input");
  const inputUrl = screen.getByText("url:").querySelector("input");
  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "Test Form Author");
  await user.type(inputUrl, "http://testform.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("Test Form Author");
  expect(createBlog.mock.calls[0][0].url).toBe("http://testform.com");
});
