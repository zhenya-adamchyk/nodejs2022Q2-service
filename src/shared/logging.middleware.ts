import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const log = `method:${method} query:${JSON.stringify(
        query,
      )} body:${JSON.stringify(body)} statusCode:${statusCode} \n`;

      // fs.readdir('src/logs', (err, files) => {
      //   const currentFile = files[files.length - 1];
      //   const lastFileSize = fs.statSync(`src/logs/${currentFile}`).size;
      //   const index = +currentFile.split('.')[0].replace('log', '');
      //
      //   if (lastFileSize < +process.env.MAX_LOGS_FILE_SIZE) {
      //     fs.appendFile(`src/logs/${currentFile}`, log, (err) => {});
      //   } else {
      //     fs.writeFile(`src/logs/log${index + 1}.txt`, log, (err) => {});
      //   }
      // });

      this.logger.log(log);
    });

    next();
  }
}
