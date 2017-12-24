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
        knex('collections')
            .where('uuid', req.query.uuid)
            .update({   name: req.body.name,
                        description: req.body.description
                    }, 'name')
            .then((name) => res.redirect(`/collections/c?name=${name}`))
    })
    .delete((req, res) => {
        knex('collections')
            .where('uuid', req.query.uuid)
            .del()
            .then(res.redirect('/collections'))
    })

router.route('/new')
    .get((req, res) => {
        res.render('collections/new')
    })

router.route('/c')
    .get((req, res) => {
        knex('poems')
            .where('collection_name', req.query.name)
            .then(poems => res.render('collections/show', {poems}))
    })

router.route('/c/edit')
    .get((req, res) => {
        knex('collections')
            .where('name', req.query.name)
            .first()
            .then(collection => res.render('collections/edit', {collection}))
    })

module.exports = router