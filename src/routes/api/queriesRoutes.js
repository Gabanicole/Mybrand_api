import express from 'express'
import { QueryController } from '../../controllers/queriesController'

const route = express.Router()

route.get('/', new QueryController().getAllQueries)

route.post('/', new QueryController().createQuery)

route.get('/:id', new QueryController().getQuery)

route.patch('/:id', new QueryController().updateQuery)

route.delete('/:id', new QueryController().deleteQuery)

export default route