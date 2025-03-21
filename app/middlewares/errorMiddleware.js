// errorMiddleware.js
import {
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ConnectionError
} from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.name, message: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.name, message: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(401).json({ error: err.name, message: err.message });
    }

    if (err instanceof ConnectionError) {
        return res.status(503).json({ error: err.name, message: err.message || 'Error de conexión con el servidor.' });
    }
};
