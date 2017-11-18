const collections = require('../poems_data/index')

const createCollection = (collection, knex, Promise) => {
    return knex('collections').insert({name: collection.name, uuid: collection.uuid}, 'name')
        .then(collectionData => {
            let collectionName = collectionData[0]
            let poemPromises = collection.poems.map(poem => createPoem(poem, knex, Promise))
            return Promise.all(poemPromises) 
        })
}

const createPoem = (poem, knex, Promise) => {
    return knex('poems').insert({uuid: poem.uuid, title:poem.title, collection_name: poem.collection_name}, 'title')
        .then(poemData => {
            let poemTitle = poemData[0]
            let linesPromises = poem.lines.map(line => createLine(line, poemTitle, knex))
            return Promise.all(linesPromises)
        })
}

const createLine = (line, poemTitle, knex) => {
    return knex('lines').insert({content: line, poem_title: poemTitle})
}

exports.seed = (knex, Promise) => {
    return knex('lines').del()
        .then(() => knex('poems').del())
        .then(() => knex('collections').del())
        .then(() => {
            let collectionPromises = collections.map((collection) => createCollection(collection, knex, Promise))
            return Promise.all(collectionPromises)
        });
}

