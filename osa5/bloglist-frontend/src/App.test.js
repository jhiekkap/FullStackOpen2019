  import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {

    test('if no user logged, blogs are not rendered', async () => {

        const component = render(
            <App />
        )
        component.rerender(<App />)


        await waitForElement(
            () => component.getByText('login')
        )

          const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)  

        component.debug()

        expect(component.container).not.toHaveTextContent(
            'Ploki'
        )
    })

        test('if user is logged, blogs are rendered', async () => {

        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () =>  component.container.querySelector('.blog')
        )

        //component.debug()

          const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)  

        expect(component.container).toHaveTextContent(
            'Ploki'
        )
    })    
})  