import Query from "../models/query"

export class QueryServices {
    static async createQuery(data) {
        return await data.save()
    }
    static async getAllQueries() {
        const queries = await Query.find()
        return queries
    }

    static async getQuery(id) {
        const query = await Query.findOne({ _id: id })
        return query
    }

    static async deleteQuery(id) {
        return await Query.deleteOne({ _id: id })
    }

    static async updateQuery(id, data) {

        const query = await Query.findOne({ _id: id })
        if (data.sender) {
            if (data.sender.name) {
                query.sender.name = data.sender.name
            }
            if (data.sender.email) {
                query.sender.email = data.sender.email
            }
        }
        if (data.message) {
            query.message = data.message
        }

        if (data.location) {
            query.location = data.location
        }

        await query.save()
        return query

    }
}