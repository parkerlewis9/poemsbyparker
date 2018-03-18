process.env.NODE_ENV = "test";

const   mocha = require("mocha"),
        expect = require("chai").expect,
        knex = require("../knex");

describe("Migration Tests", () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => done())
            .catch((err) => done(err));
    })
    describe("Poem Model Migration Test", () => {
        it("should do stuff", () => {
            expect(0).to.equal(0)
        })
    })
})
