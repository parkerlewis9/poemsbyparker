exports.up = (knex, Promise) => {
    return knex.schema.alterTable('poems', table => {

        table.uuid('uuid')
            .unique()
        table.string('collection_name')
            .notNullable()

        table.foreign('collection_name')
            .references('collections.name')

    })
}

exports.down = (knex, Promise) => {
    return knex.raw('drop extension if exists "uuid-ossp"')
}
