const _ = require ('lodash')


// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return blogs ? 1 : 1
}
  

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  for (let i = 0; i < blogs.length; i++){
    if(blogs[i].likes > favorite.likes)
     favorite = blogs[i]
  }

  return favorite
}

const mostBlogs = (blogs) => {

  let result = _.countBy(blogs, "author")
  let mostBlogsAuthor = _.max(Object.keys(result), key => result[key])
  let mostBlogs = result[mostBlogsAuthor]
  
  
  return mostBlogs ? {author: mostBlogsAuthor, blogs: mostBlogs} : null
}

const mostLikes = (blogs) => {
  let grouped = _.groupBy(blogs, blog => blog.author)
  
  const getTotalLikes = (authorBlogs) => {
    return _.sumBy(authorBlogs, blog => blog.likes)
  }

  let newList = Object.keys(grouped).reduce( (acc, key) => {
      return [...acc, { author: key, likes: getTotalLikes(grouped[key]) }]
    }, [])

  const mostLiked = _.maxBy(newList, 'likes')
  return mostLiked ? mostLiked : null
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}