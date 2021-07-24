const mongoose = require ('mongoose')
const Blog = require('../models/blog')
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
  




describe ('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  
  test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
      
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  

  describe ('viewing a specific blog', () => {
    
    test('a blog has an unique id', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body[0].id).toBeDefined()
      expect(response.body[1].id).toBeDefined()
      })
  })

  describe('addition of a new blog', () => {
    beforeAll(async () => {
      let token = null
      await User.deleteMany({})

      const testUser = await new User({
        username: 'Testing',
        passwordHash: await bcrypt.hash("test1234", 10),
      }).save()

      const userForToken = { username: "Vladimir Lenin", id: testUser.id }
      token = jwt.sign(userForToken, process.env.SECRET)
    })

    test('a valid blog can be added', async () => {
      const newBlog = {
        title: "A New Blog",
        author: "Michael",
        url: "michael_blog.com",
        likes: 10
      }

      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(b => b.title)
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('A New Blog')
    })

    test('likes are set to 0 if request does not provide one', async () => {
      const newBlog = {
        title: "XYZ Blog",
        author: "Marry",
        url: "marryblogs.com",
      };
      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const currentLikes = response.body[response.body.length-1].likes
      expect(currentLikes).toBe(0)
    })

    test('blog without title and url cannot be not added', async () => {
      const newBlog = {
        author: 'Steve'
      }

      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('token not provided', async () => {
      const newBlog = {
        title: "A New Blog",
        author: "Michael",
        url: "michael_blog.com",
        likes: 10
      }

      token = null

      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe("updating a blog", () => {
  test("blog can be updated", async () => {
    const newBlog = {
      title: "A happy blog",
      author: "simon",
      url: "simon_blog.com",
      likes: 120,
    }

    const initialBlogs = await helper.blogsInDb()
    // console.log('before updating:', initialBlogs)
    const blogToUpdate = initialBlogs[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)

    const blogsAfter = await helper.blogsInDb()
    // console.log('after updating:', blogsAfter)

    const updatedBlog = blogsAfter[0]

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

    expect(updatedBlog.likes).toBe(120)
    expect(updatedBlog.title).toBe('A happy blog')
  })
  })


  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mike234',
        name: 'Mike Portnoy',
        password: 'sayyyyyy',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    }, 100000)
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)
  
    test('invalid username that is shorter than 3 characters', async() => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'K',
        name: 'Kelly',
        password: 'sailing',
      }
  
      await api.post('/api/users').send(newUser).expect(400)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)
  
    test('invalid password that is shorter than 3 characters', async() => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'kellymmm',
        name: 'Kelly',
        password: 'sa',
      }
  
      const result = await api.post('/api/users').send(newUser).expect(404)
      console.log(result.body.error)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }, 100000)
  
  
  
  })


})





afterAll(() => {
  mongoose.connection.close()
})
