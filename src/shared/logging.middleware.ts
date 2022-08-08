import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, query, body, baseUrl } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const log = `method:${method} baseUrl:${baseUrl} query:${JSON.stringify(
        query,
      )} body:${JSON.stringify(
        body,
      )} statusCode:${statusCode} statusMessage:${statusMessage} \n`;

      if (!fs.existsSync('src/logs')) fs.mkdirSync('src/logs');

      fs.readdir('src/logs', (err, files) => {
        const currentFile = files[files.length - 1];
        let lastFileSize;
        let index;
        if (currentFile) {
          lastFileSize = fs.statSync(`src/logs/${currentFile}`).size;
          index = +currentFile.split('.')[0].replace('log', '');
        }

        if (!currentFile) {
          fs.appendFile('src/logs/log1.txt', log, (err) => {
            if (err) throw err;
          });
        } else if (lastFileSize < +process.env.MAX_LOGS_FILE_SIZE) {
          fs.appendFile(`src/logs/${currentFile}`, log, (err) => {
            if (err) throw err;
          });
        } else {
          fs.writeFile(`src/logs/log${index + 1}.txt`, log, (err) => {
            if (err) throw err;
          });
        }
      });

      this.logger.log(log);
    });

    next();
  }
}
