import Query from "../models/query";
import { QueryServices } from "../services/queryServices";

export class QueryController {


    async createQuery(req, res, next) {
        try {

            const query = await Query({
                sender: req.body.sender,
                message: req.body.message,
                location: req.body.location
            })

            res.send(await QueryServices.createQuery(query))
        } catch (error) {
            console.log(error);
            res.status(404).send({ error: 'Query not created check provided content' })
        }
    }

    async getAllQueries(req, res, next) {
        try {
            const queries = await QueryServices.getAllQueries()
            res.send(queries)
        } catch (error) {
            res.status(404).send({ error: 'Something went wrong' })
        }
    }

    async getQuery(req, res, next) {
        try {
            const query = await QueryServices.getQuery(req.params.id)

            res.send(query)
        } catch (error) {
            res.status(404).send({ error: 'Something went wrong' })
        }
    }

    async deleteQuery(req, res, next) {
        try {
            const query = await QueryServices.getQuery(req.params.id)
            await QueryServices.deleteQuery(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({ error: 'Something went wrong' })
        }
    }

    async updateQuery(req, res, next) {
        try {
            const query = await QueryServices.getQuery(req.params.id)
            const data = {}

            if (req.body.sender) {
                data['sender'] = req.body.sender
            }
            if (req.body.message) {
                data['message'] = req.body.message
            }
            if (req.body.location) {
                data['location'] = req.body.location
            }

            const newQuery = await QueryServices.updateQuery(req.params.id, data)

            res.send(newQuery)
        } catch (error) {

            res.status(404).send({ error: 'Something went wrong' })
        }
    }


}