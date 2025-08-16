import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('blog form calls blog creator correctly', async () => {

    const mockBlogHandler = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={mockBlogHandler}/>)

    const titleBox = container.querySelector('.blogform #blogform-title')
    const authorBox = container.querySelector('.blogform #blogform-author')
    const urlBox = container.querySelector('.blogform #blogform-url')
    const createButton = screen.getByText('Create')

    await user.type(titleBox, 'The title')
    await user.type(authorBox, 'The author')
    await user.type(urlBox, 'theurl.com')
    await user.click(createButton)

    expect(mockBlogHandler.mock.calls[0][0].title).toBe('The title')
    expect(mockBlogHandler.mock.calls[0][0].author).toBe('The author')
    expect(mockBlogHandler.mock.calls[0][0].url).toBe('theurl.com')

})
