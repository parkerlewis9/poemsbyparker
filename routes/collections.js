let express = require('express'),
    router = express.Router(),
    knex = require('../knex.js'),
    uuid = require('uuid/v4')

router.route('/')
    .get((req, res) => {
        knex('collections')
            .select('*')
            .orderBy('name', 'asc')
            .then(collections => res.render('collections/index', {collections}))
    })
    .post((req, res) => {
        knex('collections')
            .insert({   uuid: uuid(),
                        name: req.body.name,
                        description: req.body.description
                    })
            .then(() => res.redirect('/'))
    })
    .patch((req, res) => {
        console.log(req.body)
        console.log(req.query)
        let uuid = req.query.uuid
        console.log(uuid)
        knex('collections')
            .where({uuid: uuid})
            .update({   name: req.body.name,
                        description: req.body.description
                    }, 'name')
            .then((name) => res.redirect('/collections/c?collection_name=${name}'))
    })

router.route('/c')
    .get((req, res) => {
        knex('poems')
            .where('collection_name', req.query.collection)
            .then(poems => res.render('collections/show', {poems}))
    })

router.route('/new')
    .get((req, res) => {
        res.render('collections/new')
    })


// Edit

router.route('/c/edit')
    .get((req, res) => {
        knex('collections')
            .where('name', req.query.collection)
            .first()
            .then(collection => res.render('collections/edit', {collection}))
    })


// Update

// Delete


module.exports = router