import Comment from "../models/comment"

export class CommentServices {

    static async createComment(data) {
        return await data.save()
    }
    static async getAllComment() {
        const articles = await Comment.find()
        return articles
    }
    static async getComment(id) {
        const article = await Comment.findOne({ _id: id })
        console.log(article);
        return article
    }

}