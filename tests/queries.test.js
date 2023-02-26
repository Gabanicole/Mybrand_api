import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Query from '../src/models/query';

use(chaiHttp)

let queryTest

let queryTest2

describe('QUERY END-POINT-TEST', () => {

    before('POPULATE QUERY', (done) => {

        const createQuery1 = async function(){
            const query1 = Query({
                sender: {
                    name: "sender name test",
                    email: "testtest@test.com"
                },
                message: "Test query message",
                location: "testLocation"
            })
    
    
            const setQueryTest2 = async function () {
                queryTest2 = await query1.save()
            }
            await setQueryTest2()
        }

        createQuery1()

        const createQuery = async function(){
            const query2 = Query({
                sender: {
                    name: "sender name",
                    email: "testtest@test.com"
                },
                message: "Test query message",
                location: "testLocation"
            })
    
            const setQueryTest = async function () {
    
                queryTest = await query2.save()
            }
    
            await setQueryTest()
        }

        createQuery()
        done()
    });

    it('QUERY SHOULD BE CREATED', (done) => {
        request(app)
            .post("/api/v1/queries")
            .send({
                sender: {
                    name: "sender name",
                    email: "testtest@test.com"
                },
                message: "Test query message create",
                location: "testLocation"
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('SHOULD GET ALL QUERY', (done) => {
        request(app)
            .get("/api/v1/queries")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    it('SHOULD GET ALL QUERY FAIL', (done) => {
        request(app)
            .get("/api/v1/querie")
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

    it('SHOULD GET ONE QUERY', (done) => {
        request(app)
            .get(`/api/v1/queries/${queryTest._id}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    it('SHOULD DELETE ONE QUERY', (done) => {
        request(app)
            .delete(`/api/v1/queries/${queryTest2._id}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(204)
                done()
            })
    });

    after('AFTER ALL QUERY TEST', (done) => {
        Query.deleteMany({}, (err) => {
            console.log("success");
            done()
        });
    });

});

