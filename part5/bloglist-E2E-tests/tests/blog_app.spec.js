const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, addBlog } = require('./helpers')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User',
                username: 'testuser',
                password: 'testpw',
            },
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User 2',
                username: 'testuser2',
                password: 'testpw',
            },
        })

        await page.goto('http://localhost:5173')
    })

    describe('logging in', () => {

        test('login form is shown', async ({ page }) => {
            const locator = await page.getByText('Please log in before proceeding')
            await expect(locator).toBeVisible()
            await expect(page.getByRole('button')).toHaveText('Log in')
        })

        test('succeeds with valid creds', async ({ page }) => {
            await login(page, 'testuser', 'testpw')

            await expect(page.getByText('Logged in as Test User')).toBeVisible()
        })

        test('fails with invalid creds', async ({ page }) => {
            await login(page, 'testuser', 'testpp')

            await expect(page.getByText('Username or password incorrect')).toBeVisible()
        })
    })

    describe('After logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'testuser', 'testpw')
        })

        test('user can create a blog', async ({ page }) => {
            await addBlog(page, 'Test Title', 'Test Author', 'testurl.dev')

            await expect(page.getByText('Test Title Test Author')).toBeVisible()
        })

        test('blogs can be liked', async ({ page }) => {
            await addBlog(page, 'Test Title', 'Test Author', 'testurl.dev')

            await page.getByText('view').click()
            await expect(page.getByText('likes: 0')).toBeVisible()
            await page.getByText('like').click()

            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('user can delete a blog they own', async ({ page }) => {
            await addBlog(page, 'Test Title', 'Test Author', 'testurl.dev')

            await page.getByText('view').click()

            page.on('dialog', dialog => dialog.accept())
            await page.getByText('remove').click()
            await expect(page.getByText('Test Title Test Author')).not.toBeVisible()
        })

        test('user cannot see delete button for a blog they do not own', async ({ page }) => {
            await addBlog(page, 'Test Title', 'Test Author', 'testurl.dev')

            await page.getByText('Log out').click()

            await login(page, 'testuser2', 'testpw')
            await page.getByText('view').click()
            await expect(page.getByText('remove')).not.toBeVisible()

        })
    })
})
