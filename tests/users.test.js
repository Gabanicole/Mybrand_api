import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import User from '../src/models/user';
import { comparePassword, hashPassword } from "../src/helpers/passwordSecurity"


use(chaiHttp)

describe("USER END-POINT-TEST", () => {

  before('BEFORE ALL TEST', async () => {
    const user = {
      name: 'testUser',
      username: 'testusername',
      email: 'test@testing.com',
      password: hashPassword('@Test12345')
    }

    await new User(user).save()

  });


 
  it("should accept user to login", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send({
        email: "test@testing.com",
        password: "@Test12345",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Should not login", (done) => {
    request(app)
      .post("/api/v1/users/login")
      .send({
        email: "test",
        password: "test",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });


  after('AFTER ALL TEST',  () => {
    User.deleteMany({},  (err) => {
    });
  });


});