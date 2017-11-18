exports.up = (knex, Promise) => {
    return knex.schema.createTable('poems', table => {

        table.string('title')
            .primary()
            .notNullable()

        table.timestamp('created_at')
            .defaultTo(knex.fn.now())
            .notNullable()

        table.timestamp('updated_at')
            .defaultTo(knex.fn.now())
            .notNullable()

    })
}

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('poems')
}
