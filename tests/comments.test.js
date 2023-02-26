import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Comment from '../src/models/comment';

use(chaiHttp)

describe('COMMENT END-POINT-TEST', () => {

    it('SHOULD GET ALL QUERY', (done) => {
        request(app)
            .get("/api/v1/comments")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    it('SHOULD GET ALL QUERY FAIL', (done) => {
        request(app)
            .get("/api/v1/comment")
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

});

