import { Router } from 'express';
import { DEFAULT_FILE_PATH_PARAMETER_NAMES } from '../../consts.js';
import Validator from '../../Classes/Validator.js';
import ErrorResponser from '../../Classes/Error.js';

export default Router()
    .use((req, res, next) => {
        var response;
        const validator = new Validator();
        for(const param of DEFAULT_FILE_PATH_PARAMETER_NAMES) {
            if(response !== undefined) continue;
            if(req.query[param] || req.body[param]) {
                response = validator.ValidateFilePath(req.query[param] || req.body[param]) === false ? new ErrorResponser(res) : undefined;
            }
        }
        if(response !== undefined)
            response?.send(req.i18n.t('validation.error'));
        else next();
    });