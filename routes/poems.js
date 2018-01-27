let express = require('express'),
    router = express.Router(),
    knex = require("../knex"),
    uuid = require('uuid/v4')

// Edit

// Update

// Delete

// √ Index
// √ Create
// √ New
// √ Show

router.route("/")
    .get((req, res) => {
        knex('poems')
            .select('*')
            .orderBy('title', 'asc')
            .then(poems => res.render('poems/index', {poems}) )
    })
    .post((req, res) => {
        req.body.date_written = req.body.date_written || ""
        knex('poems')
            .insert({   uuid: uuid(),
                        title: req.body.title,
                        date_written: req.body.date_written,
                        collection_name: req.body.collection_name
                    }, 'title')
            .then(poem_title => {
                let new_lines = req.body.lines.split("\r\n").map((line, i) => {
                    return knex('lines')
                            .insert({   uuid: uuid(),
                                        content: line,
                                        line_number: i + 1,
                                        poem_title: poem_title[0]
                                    })
                })
                return {new_lines: Promise.all(new_lines), poem_title: poem_title[0]}
            })
            .then(promises_and_title => {
                res.redirect(`/collections/poems/p?title=${promises_and_title.poem_title}`)
            })
    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    })

router.route("/new")
    .get((req, res) => {
        knex('collections')
        .select('*')
        .then(collections => res.render('poems/new', {collections}) )
    })

router.route('/p')
    .get((req, res) => {
        knex('poems')
            .where('title', req.query.title)
            .select('*')
            .first()
            .then((poem) => {
                knex('lines')
                    .where('poem_title', poem.title)
                    .select('*')
                    .orderBy('line_number', 'asc')
                    .then(lines => res.render('poems/show', {poem, lines}) )
            })
    })

router.route('/p/edit')
    .get((req, res) => {
        knex('poems')
            .where('title', req.query.title)
            .select('*')
            .first()
            .then(poem => {
                return knex('lines')
                    .where('poem_title', poem.title)
                    .select('*')
                    .orderBy('line_number', "asc")
                    .then(lines => {
                        return {lines, poem}
                    })
            })
            .then(({lines, poem}) => {
                // console.log(lines)
                console.log("foo" + lines[1].content + "bar")
                // console.log(poem)
            })
    })

module.exports = router



                // res.render('poems/edit', {poem})








