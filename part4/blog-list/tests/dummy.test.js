const list_helper = require('../utils/list_helper')
console.log(list_helper)
test('dummy returns one', () => {
    const blogs = []
    expect(list_helper.dummy(blogs)).toBe(1)
})