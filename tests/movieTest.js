/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { it, describe, beforeEach } = require("mocha");

const server = require("../index");

const Movie = require("../db");

describe("Test Movie", () => {
  let testMovie;

  beforeEach((done) => {
    Movie.deleteMany((err) => {
      if (!err) {
        Movie.create(
          {
            title: "The Hunger Games",
            description: "Book adaptation",
            ageRating: "12A",
          },
          (error, created) => {
            if (!error) {
              testMovie = created;
            }
            return done();
          },
        );
      }
    });
  });

  it("Should create movie information", (done) => {
    chai
      .request(server)
      .post("/movie/create")
      .send({
        title: "Thor: Ragnarok",
        description: "Marvel movie",
        ageRating: "12A",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.haveOwnProperty("text", "Successfully created");
        return done();
      });
  });

  it("Should NOT create movie information", (done) => {
    chai
      .request(server)
      .post("/movie/create")
      .send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        return done();
      });
  });

  it("Should find movie information", (done) => {
    chai
      .request(server)
      .get("/movie/get/" + testMovie.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.haveOwnProperty("title", "The Hunger Games");
        expect(res.body).to.haveOwnProperty("description", "Book adaptation");
        expect(res.body).to.haveOwnProperty("ageRating", "12A");
        return done();
      });
  });

  it("Should find ALL movie information", (done) => {
    chai
      .request(server)
      .get("/movie/getAll/")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        return done();
      });
  });

  it("Should update movie information", (done) => {
    chai
      .request(server)
      .put("/movie/replace/" + testMovie.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(202);
        expect(res.body).to.haveOwnProperty("title", "The Hunger Games");
        expect(res.body).to.haveOwnProperty("description", "Book adaptation");
        expect(res.body).to.haveOwnProperty("ageRating", "12A");
        return done();
      });
  });

  it("Should delete movie information", (done) => {
    chai
      .request(server)
      .delete("/movie/remove/" + testMovie.id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        return done();
      });
  });
});
