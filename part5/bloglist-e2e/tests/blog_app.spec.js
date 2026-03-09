const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const notification = await page.getByText('wrong username/password')
      await expect(notification).toBeVisible()
      // improved check: ensure notification is styled as error (red)
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
      
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByTestId('title').fill('A new blog title')
      await page.getByTestId('author').fill('A new blog author')
      await page.getByTestId('url').fill('http://newblog.url')
      await page.getByRole('button', { name: 'create' }).click()

      const blogElement = page.locator('.blog').filter({ hasText: 'A new blog title' }).filter({ hasText: 'A new blog author' })
      await expect(blogElement).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('First blog')
        await page.getByTestId('author').fill('First author')
        await page.getByTestId('url').fill('http://first.url')
        await page.getByRole('button', { name: 'create' }).click()
        await page.locator('.blog').filter({ hasText: 'First blog' }).filter({ hasText: 'First author' }).waitFor()
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('it can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        
        // Mock window.confirm to always return true
        await page.evaluate(() => {
          window.confirm = () => true
        })

        await page.getByRole('button', { name: 'delete' }).click()

        await expect(page.locator('.blog').filter({ hasText: 'First blog First author' })).not.toBeVisible()
      })
      
      test('only the creator can see the delete button', async ({ page, request }) => {
        // Create a second user
        await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Teuvo Testaaja',
              username: 'teuvo',
              password: 'password'
            }
          })

        // Logout
        await page.getByRole('button', { name: 'logout' }).click()

        // Login as second user
        await page.getByRole('textbox').first().fill('teuvo')
        await page.getByRole('textbox').last().fill('password')
        await page.getByRole('button', { name: 'login' }).click()

        // Check that delete button is not visible
        await page.locator('.blog').filter({ hasText: 'First blog' }).filter({ hasText: 'First author' }).waitFor()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })
    })

    describe('and multiple blogs exist', () => {
        beforeEach(async ({ page }) => {
            // Create 3 blogs
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByTestId('title').fill('Blog with 0 likes')
            await page.getByTestId('author').fill('Author 1')
            await page.getByTestId('url').fill('http://1.url')
            await page.getByRole('button', { name: 'create' }).click()
            await page.locator('.blog').filter({ hasText: 'Blog with 0 likes' }).waitFor()

            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByTestId('title').fill('Blog with 10 likes')
            await page.getByTestId('author').fill('Author 2')
            await page.getByTestId('url').fill('http://2.url')
            await page.getByRole('button', { name: 'create' }).click()
            await page.locator('.blog').filter({ hasText: 'Blog with 10 likes' }).waitFor()

            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByTestId('title').fill('Blog with 5 likes')
            await page.getByTestId('author').fill('Author 3')
            await page.getByTestId('url').fill('http://3.url')
            await page.getByRole('button', { name: 'create' }).click()
            await page.locator('.blog').filter({ hasText: 'Blog with 5 likes' }).waitFor()
            
            // Like the second blog 10 times
            const blog10 = page.locator('.blog').filter({ hasText: 'Blog with 10 likes' })
            await blog10.getByRole('button', { name: 'view' }).click()
            for(let i=0; i<10; i++) {
                await blog10.getByRole('button', { name: 'like' }).click()
                await blog10.getByText(`likes ${i+1}`).waitFor()
            }
            await blog10.getByRole('button', { name: 'hide' }).click()

            // Like the third blog 5 times
            const blog5 = page.locator('.blog').filter({ hasText: 'Blog with 5 likes' })
            await blog5.getByRole('button', { name: 'view' }).click()
            for(let i=0; i<5; i++) {
                await blog5.getByRole('button', { name: 'like' }).click()
                await blog5.getByText(`likes ${i+1}`).waitFor()
            }
            await blog5.getByRole('button', { name: 'hide' }).click()
        })

        test('blogs are ordered by likes', async ({ page }) => {
            const blogs = page.locator('.blog')
            const firstBlog = blogs.nth(0)
            const secondBlog = blogs.nth(1)
            const thirdBlog = blogs.nth(2)

            await expect(firstBlog).toContainText('Blog with 10 likes')
            await expect(secondBlog).toContainText('Blog with 5 likes')
            await expect(thirdBlog).toContainText('Blog with 0 likes')
        })
    })

  })
})
