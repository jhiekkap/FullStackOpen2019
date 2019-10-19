import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react' 
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Ploki',
    author: "Timppa",
    likes: 1000000
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
 
  expect(component.container).toHaveTextContent('Ploki')
  expect(component.container).toHaveTextContent('Timppa')
  expect(component.container).toHaveTextContent(1000000)
 
})

test('clicking the button twice calls event handler twice', async () => {
    const blog = {
        title: 'Ploki',
        author: "Timppa",
        likes: 1000000
      }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
 