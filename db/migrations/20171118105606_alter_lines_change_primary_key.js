exports.up = (knex, Promise) => {
    return knex.schema.alterTable('lines', table => {

        table.increments()

        table.string('poem_title')
            .notNullable()

        table.foreign('poem_title')
            .references('poems.title')

    })
};

exports.down = (knex, Promise) => {

};
