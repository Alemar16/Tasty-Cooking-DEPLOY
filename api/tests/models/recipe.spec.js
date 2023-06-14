const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Model definition", () => {
    beforeEach(() => Recipe.sync({ force: true }));

    it("should define the Recipe model", () => {
      expect(conn.models).to.have.property("Recipe");
    });
  });


  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });

    describe("summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({ name: "Milanesa a la napolitana" })
          .then(() => done(new Error("It requires a summary")))
          .catch(() => done());
      });
    });

    describe("healthScore", () => {
      it("should throw an error if healthScore is less than 0", (done) => {
        Recipe.create({
          name: "Milanesa a la napolitana",
          summary: "Delicious dish",
          healthScore: -1,
        })
          .then(() =>
            done(new Error("Health score must be greater than or equal to 0"))
          )
          .catch(() => done());
      });

      it("should throw an error if healthScore is greater than 100", (done) => {
        Recipe.create({
          name: "Milanesa a la napolitana",
          summary: "Delicious dish",
          healthScore: 101,
        })
          .then(() =>
            done(new Error("Health score must be less than or equal to 100"))
          )
          .catch(() => done());
      });
    });

    describe("stepbyStep", () => {
      it("should throw an error if stepbyStep is not an array of texts", (done) => {
        Recipe.create({
          name: "Milanesa a la napolitana",
          summary: "Delicious dish",
          stepbyStep: "Not an array",
        })
          .then(() => done(new Error("Step by step must be an array of texts")))
          .catch(() => done());
      });
    });

    describe("createIndb", () => {
      it("should have a default value of false", async () => {
        try {
          const recipe = await Recipe.create({
            name: "Milanesa a la napolitana",
            summary: "Delicious dish",
          });
          expect(recipe.createIndb).to.equal(false);
        } catch (err) {
          console.error(err);
        }
      });
    });
  });
});
