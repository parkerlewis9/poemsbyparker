exports.up = (knex, Promise) => {
    return knex.schema.createTable('collections', (table) => {

        table.uuid('uuid')

        table.string('name')
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
    return knex.schema.dropTable('collections')
}
