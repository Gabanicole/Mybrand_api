import Comment from "../models/comment";
import { CommentServices } from "../services/commentServices";

export class CommentController {


    async createComment(req, res, next) {
        try {

            const data = await Comment({
                sender: req.body.sender,
                article: req.body.article,
                comment: req.body.comment
            })

            res.send(await CommentServices.createComment(data))
        } catch (error) {
            console.log(error);
            res.status(404).send({ error: 'Comment not created check provided content' })
        }
    }

    async getAllComments(req, res, next) {
        try {
            const comments = await CommentServices.getAllComment()
            res.send(comments)
        } catch (error) {
            res.status(404).send({ error: 'Something went wrong' })
        }
    }

    async getComment(req, res, next) {
        try {
            const comment = await CommentServices.getComment(req.params.id)

            res.send(comment)
        } catch (error) {
            res.status(404).send({ error: 'Something went wrong' })
        }
    }


}