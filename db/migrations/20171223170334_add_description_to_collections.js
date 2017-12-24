exports.up = (knex, Promise) => {
    return knex.schema.alterTable('collections', (table) => {
        table.string('description')
            .notNullable()
    })
}

exports.down = (knex, Promise) => {}
