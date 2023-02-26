import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Article from '../src/models/article';

use(chaiHttp)

before(() => {

});

let articleTest

describe('ARTICLE END-POINT-TEST', () => {

    before((done) => {

        const art1 = {
            title: 'article test title',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }
        const createArticle1 = async function () {

            await new Article(art1).save()
        }
        createArticle1()
        done()

    });


    it('SHOULD GET MESSAGE', (done) => {
        request(app)
            .get("/")
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

    it('SHOULD GET ALL ARTICLES', (done) => {
        request(app)
            .get("/api/v1/articles")
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

    it('SHOULD NOT GET ONE ARTICLE', (done) => {


        request(app)
            .get(`/api/v1/articles/1`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })



    });


    after('AFTER EACH ARTICLE TEST', (done) => {
        Article.deleteMany({}, (err) => {
            done()
        });
    });

});

