import express from 'express';
import cp from 'child_process';
import fs from 'fs';
import { DEFAULT_FILEMANAGER_DIR, DEFAULT_FILE_PATH_VALIDATE_COMMAND } from '../consts.js';

export default class Validator {
    ValidateFilePath(path) {
        var stat = {};
        if(fs.existsSync(path))
            if(cp.execSync(`${DEFAULT_FILE_PATH_VALIDATE_COMMAND} ${path}`).toString().startsWith(DEFAULT_FILEMANAGER_DIR))
                stat = {exist:true, success:true}; 
            else stat = {exist: true, success: false};
        else stat = {exist: false, success: false};
        return stat;
    }
}