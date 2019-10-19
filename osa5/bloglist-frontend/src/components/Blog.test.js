import React from 'react'
//import 'jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react' 
import Blog from './Blog'

//afterEach(cleanup)

test('renders only title and author at first', () => {

  const blog = {
    title: 'Ploki',
    author: 'Timppa',
    url: 'www.ploki.fi',
    likes: 1000000,
    user: {
        username: 'pena'
    }, 
  }
  const user = {
      username: 'pena'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  ) 
  //component.debug()
 
  expect(component.container).toHaveTextContent('Ploki')
  expect(component.container).toHaveTextContent('Timppa')
  expect(component.container.querySelector(".likesAndUser")).toHaveStyle('display: none') 
 
})

 