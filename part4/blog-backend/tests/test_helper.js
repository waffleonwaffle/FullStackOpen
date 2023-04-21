const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

const initialBlogs = [
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
]


const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}

const usersInDB = async () => {
    const users = await User.find({})
    // console.log(users)
    return users.map((user) => user.toJSON())
}


module.exports = {
    initialBlogs, blogsInDB, usersInDB
}