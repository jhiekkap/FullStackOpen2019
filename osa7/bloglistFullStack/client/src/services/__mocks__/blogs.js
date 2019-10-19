const blogs = [
    {
      id: 1,
      author: 'Timppa',
      title: 'Ploki',
      url: 'www.ploki.fi',
      likes: 1,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      id: 2,
      author: 'Tomppa',
      title: 'Pluki',
      url: 'www.pluki.fi',
      likes: 2,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      id: 3,
      author: 'Tömppä',
      title: 'Plöki',
      url: 'www.ploeki.fi',
      likes:3,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    }
  ]
  
  const getAll = () => {
    return Promise.resolve(blogs)
  }

  
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
  
  export default { getAll, setToken }