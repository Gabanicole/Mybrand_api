import express from 'express'
import { CommentController } from '../../controllers/commentController'

const route = express.Router()

route.get('/', new CommentController().getAllComments)

route.post('/', new CommentController().createComment)

route.get('/:id', new CommentController().getComment)

export default route