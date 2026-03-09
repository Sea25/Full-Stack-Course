const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    { title: 'A', author: 'A', likes: 5 },
    { title: 'B', author: 'B', likes: 12 },
    { title: 'C', author: 'C', likes: 7 },
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[1])
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: 'Robert C. Martin', likes: 5 },
    { author: 'Robert C. Martin', likes: 7 },
    { author: 'Edsger W. Dijkstra', likes: 12 },
    { author: 'Robert C. Martin', likes: 10 },
  ]

  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const blogs = [
    { author: 'Edsger W. Dijkstra', likes: 5 },
    { author: 'Edsger W. Dijkstra', likes: 12 },
    { author: 'Robert C. Martin', likes: 10 },
  ]

  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

