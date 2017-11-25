exports.up = (knex, Promise) => {
    return knex.schema.createTable('poems', table => {

        table.uuid('uuid')
            .unique()

        table.string('title')
            .primary()
            .notNullable()

        table.string('date_written')

        table.string('collection_name')
            .notNullable()

        table.foreign('collection_name')
            .references('collections.name')

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
