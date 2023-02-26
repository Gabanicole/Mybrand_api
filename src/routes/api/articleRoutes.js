import express from 'express'
import { ArticleController } from '../../controllers/articleController'
import { fileFilter } from '../../helpers/fileFilter.js';
import multer from 'multer'
import { articleValidation } from '../../validations/articleValidation/article.validations.js';
import { authenticate } from '../../middlewares/authenticate';


const route = express.Router()

const storageFile = multer.diskStorage({})
const upload = multer({storage: storageFile, file: fileFilter})

route.get('/',new ArticleController().getAllArticles)
route.post('/', authenticate, upload.single('image'), articleValidation, new ArticleController().createArticle)
route.get('/:id', new ArticleController().getArticle)
route.get('/:id/comments', new ArticleController().commentsOnArticle)
route.post('/:id/comments', new ArticleController().createComment)
route.patch('/:id',authenticate, articleValidation, new ArticleController().updateArticle)

route.delete('/:id',authenticate, new ArticleController().deleteArticle)

export default route