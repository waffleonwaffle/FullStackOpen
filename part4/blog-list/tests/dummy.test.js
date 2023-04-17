const list_helper = require('../utils/list_helper')
console.log(list_helper)
test('dummy returns one', () => {
    const blogs = []
    expect(list_helper.dummy(blogs)).toBe(1)
})

test('no blogposts equals 0 likes', () => {
    const blogs = []
    expect(list_helper.totalLikes(blogs)).toBe(0)
})

describe('total likes', () => {
    const oneBlogPost = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
      ]

    test('when list has only one blog, equals the likes of that', () => {
        expect(list_helper.totalLikes(oneBlogPost)).toBe(5)
    })

    test('when list has multiple blogs, equals the likes of all the blogs', () => {
        expect(list_helper.totalLikes(blogs)).toBe(24)
    })

    test('no blogposts equals 0 likes', () => {
        const blogs = []
        expect(list_helper.totalLikes(blogs)).toBe(0)
    })
})
