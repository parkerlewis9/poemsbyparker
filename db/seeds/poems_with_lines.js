const poems = [
    {
        title: 'Poem 1',
        lines: ["Line 1", 
                "Line 2",
                "Line 3"]
    },
    {
        title: 'Poem 2',
        lines: ["Line 1", 
                "Line 2",
                "Line 3"]
    }
]

const createPoem = (poem, knex, Promise) => {
    return knex('poems').insert({title: poem.title}, 'id')
        .then(poemData => {
            let poemId = poemData[0]
            let linesPromises = poem.lines.map(line => createLine(line, poemId, knex))

            return Promise.all(linesPromises)
        })
}

const createLine = (line, poemId, knex) => {
    return knex("lines").insert({content: line, poem_id: poemId})
}

exports.seed = (knex, Promise) => {
    return knex('lines').del()
        .then(() => knex('poems').del())
        .then(() => {
            let poemPromises = poems.map((poem) => createPoem(poem, knex, Promise))
            return Promise.all(poemPromises)
        });
}

