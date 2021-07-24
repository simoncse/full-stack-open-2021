const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
      title: "A Blog",
      author: "simon",
      url: "simon_blog.com",
      likes: 22
    },
    {
      title: "My New Blog",
      author: "MV",
      url: "blog.com",
      likes: 100,
    },
  ];

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON()) 
} 


module.exports = {
    initialBlogs, blogsInDb, usersInDb
  }