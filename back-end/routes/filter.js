const express = require('express')
const router = express.Router()

// Receive preferences from filter screen and return posts that match
// Filters.jsx sends a POST request to this route with the following data: date and time, environment, subject, subfield
// This route will return an array of posts that match the filters 
// FilteredScreen.jsx sends a GET request to this route to get the filtered posts

const posts = [
        {id: 3, date_time: "May 1, 2023 12:00 PM", meeting_type: "No Preference", subject: "Physics", topic: "Quantum Mechanics", title: "Quantum Electrodynamics"},
        {id: 7, date_time: "May 4, 2023 2:00 PM", meeting_type: "Online", subject: "Mathematics", topic: "Linear Algebra", title: "Study session for LA with Professor X"},
        {id: 12, date_time: "May 5, 2023 5:30 PM", meeting_type: "In Person", subject: "Computer Science", topic: "Data Structures", title: "Study session for DS with Professor Y"}
    ]

router.get('/:date/:time/:env/:dubject/:subfield', (req, res) => {

    // take the 5 params
    // const date = req.body.date
    // const time = req.body.time
    // const meeting_type = req.body.meeting_type
    // const subject = req.body.subject
    // const topic = req.body.topic

    // filter the posts array based on them

    // send dummy data for now
    res.send(posts)
})

module.exports = router
