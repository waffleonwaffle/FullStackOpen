const Blog = require('../models/blogschema')

const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',   
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
]


const blogsInDB = async () => {
    // Blog.set('toJSON', {
    //     transform: (document, returnedObject) => {
    //         returnedObject.id = returnedObject._id
    //         delete returnedObject._id
    //     }
    // })
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())

}


module.exports = {
    initialBlogs, blogsInDB
}