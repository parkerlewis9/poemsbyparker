exports.up = (knex, Promise) => {
    return knex.schema.createTable('lines', table => {

        table.uuid('uuid')
            .unique()

        table.string('content')
            .notNullable()

        table.integer('line_number')
            .notNullable()

        table.string('poem_title')
            .notNullable()

        table.foreign('poem_title')
            .references('poems.title')

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
