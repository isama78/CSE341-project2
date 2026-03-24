import swaggerUi from 'swagger-ui-express'; // <-- Importar Swagger UI
import swaggerDocument from '../../swagger-output.json' with {type: 'json'};
import { Router } from 'express';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
