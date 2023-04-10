const posts = require('../dummy_data/filtered.json')

const fetch_Results = (date, time, env, subject, subfield) => {

    // filter the posts array based on them
    // const filteredPosts = posts.filter(post => {
    //     return post.date == date && post.time == time && post.env == env && post.subject == subject && post.subfield == subfield
    // })

    // send dummy data for now
    return posts
}

module.exports = { fetch_Results }