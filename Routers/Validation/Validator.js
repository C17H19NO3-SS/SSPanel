import { Router } from 'express';
import { DEFAULT_FILE_PATH_PARAMETER_NAMES, DEFAULT_FILEMANAGER_DIR } from '../../consts.js';
import Validator from '../../Classes/Validator.js';
import ErrorResponser from '../../Classes/Error.js';
import Utils from '../../Utils/Utils.js';

export default Router()
    .use((req, res, next) => {
        var response;
        const validator = new Validator();
        req.paramStat = {
            query: {},
            body: {}
        };
        for(const param of DEFAULT_FILE_PATH_PARAMETER_NAMES) {
            if(response !== undefined) continue;
            if(req.query[param]) {
                req.paramStat.query[param] = validator.ValidateFilePath(`${DEFAULT_FILEMANAGER_DIR}/${req.query[param]}`);
            }
            if(req.body[param]) {
                req.paramStat.body[param] = validator.ValidateFilePath(`${DEFAULT_FILEMANAGER_DIR}/${req.body[param]}`);
            }
        }
        req.Utils = Utils;
        next();
    });
