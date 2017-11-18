exports.up = (knex, Promise) => {
    return knex.schema.createTable('lines', table => {

        table.string('content')
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
    return knex.schema.dropTable('lines')
}
