const dummy = (blogs) => {
    return 1 
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let blog = null
    let maximum = -1
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > maximum) {
            maximum = blogs[i].likes
            blog = blogs[i]
        }
    }
    const newBlog = JSON.stringify(blog, (key, value) => {
        if(key === '_id' || key === '__v' || key === 'url') {
            return undefined
        }
        return value
    })
    return JSON.parse(newBlog)
}

const mostBlogs = (blogs) => {
    let authors = {}
    let obj = {"author": null, blogs: -1}
    let val = -1
    let max_blogs = -1 
    let max_author = null
    for(let i = 0; i < blogs.length; i++) {
        if (authors[blogs[i].author] === undefined) {
            authors[blogs[i].author] = 1
            // max_blogs = authors[blogs[i].author]
            // max_author = blogs
        } else {
            authors[blogs[i].author] += 1
            // val = authors[blogs[i].author]
        }
        val = authors[blogs[i].author]
        if (val > max_blogs) {
            max_blogs = val
            max_author = blogs[i].author
        }
    }

    obj.author = max_author
    obj.blogs = max_blogs
    return obj
    
}



module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog, 
    mostBlogs
}