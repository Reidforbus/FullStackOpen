import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('extra info is not rendered', () => {
    const blog = {
        title: 'The title',
        author: 'The author',
        url: 'THE URL',
        likes: 123,
        user: {
            id: 'abcd',
            username: 'testuser',
            name: 'Test User',
        }
    }

    const { container } = render(<Blog blog={blog} username={'testuser'} />)

    const blogElement = container.querySelector('div.bloginfo')
    expect(blogElement).toBeDefined()
    expect(blogElement).toHaveTextContent('The title The author')

    const urlElement = container.querySelector('div.url')
    expect(urlElement).toBeNull()
    const likesElement = container.querySelector('div.likes')
    expect(likesElement).toBeNull()
})

test('extra info is rendered after button click', async () => {
    const blog = {
        title: 'The title',
        author: 'The author',
        url: 'THE URL',
        likes: 123,
        user: {
            id: 'abcd',
            username: 'testuser',
            name: 'Test User',
        }
    }

    const { container } = render(<Blog blog={blog} username={'testuser'}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = container.querySelector('div.url')
    expect(urlElement).toHaveTextContent('THE URL')
    const likesElement = container.querySelector('div.likes')
    expect(likesElement).toHaveTextContent('likes: 123')
})

test('each like is processed', async () => {
    const blog = {
        title: 'The title',
        author: 'The author',
        url: 'THE URL',
        likes: 123,
        user: {
            id: 'abcd',
            username: 'testuser',
            name: 'Test User',
        }
    }

    const mockLikeHandler = vi.fn()

    const { container } = render(<Blog blog={blog} username={'testuser'} handleLike={mockLikeHandler}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
