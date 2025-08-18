const login = async (page, username, pw) => {
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(pw)
    await page.getByRole('button').click()
}

const addBlog = async (page, title, author, url) => {
    await page.getByText('add blog').click()

    await page.getByRole('textbox').nth(0).fill(title)
    await page.getByRole('textbox').nth(1).fill(author)
    await page.getByRole('textbox').nth(2).fill(url)

    await page.getByText('Create').click()
}

module.exports = { login, addBlog }
