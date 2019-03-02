import { remote, app } from 'electron';
import fs from 'fs';
import { join } from 'lodash';
import path from 'path';

enum Logs {
  STDOUT = 'stdoutLogFileName',
  ERROR = 'errorLogFileName',
  WARNING = 'warningLogFileName',
}

interface ILog {
  stdoutLogFileName: string;
  errorLogFileName: string;
  warningLogFileName: string;
}

class Log {
  private stdoutLogFileName: string;
  private errorLogFileName: string;
  private warningLogFileName: string;
  private app: Electron.App;

  constructor(options: ILog) {
    this.stdoutLogFileName = options.stdoutLogFileName;
    this.errorLogFileName = options.errorLogFileName;
    this.warningLogFileName = options.warningLogFileName;

    // This is the instance of the Electron app
    this.app = !remote ? app : remote.app;

    this.checkLogPaths();
  }

  public log(...data: any): void {
    // tslint:disable-next-line no-console
    console.log(...data);

    this.writeToLog(Logs.STDOUT, data);
  }

  public error(...data: any): void {
    // tslint:disable-next-line no-console
    console.error(...data);

    this.writeToLog(Logs.ERROR, data);
  }

  public warning(...data: any): void {
    // tslint:disable-next-line no-console
    console.warn(...data);

    this.writeToLog(Logs.WARNING, data);
  }

  private writeToLog(logFile: Logs, ...data: any) {
    const currentDate = new Date();
    const formattedTime = [
      `${currentDate.getUTCFullYear()}${currentDate.getUTCMonth() + 1}${currentDate.getUTCDate()}`,
      '/',
      `${currentDate.getUTCHours()}${currentDate.getUTCMinutes()}${currentDate.getUTCSeconds()}`,
      ':',
    ];
    const formattedLog = `\r\n${join(formattedTime, '')}: ${join(data, '')}`;
    fs.appendFileSync(this[logFile], formattedLog);
  }

  private getPathOf(logFile: Logs) {
    const logDir = this.app.getPath('logs');

    return path.join(logDir, this[logFile]);
  }

  private checkLogPaths(): void {
    // Each Log file is created if not yet existing
    if (!fs.existsSync(this.getPathOf(Logs.STDOUT))) {
      fs.writeFileSync(this.getPathOf(Logs.STDOUT), 'Log started.');
    }

    if (!fs.existsSync(this.getPathOf(Logs.ERROR))) {
      fs.writeFileSync(this.getPathOf(Logs.ERROR), 'Log started.');
    }

    if (!fs.existsSync(this.getPathOf(Logs.WARNING))) {
      fs.writeFileSync(this.getPathOf(Logs.WARNING), 'Log started.');
    }
  }
}

export default new Log({
  stdoutLogFileName: process.env.VUE_APP_STDOUT_LOG_FILENAME as string,
  errorLogFileName: process.env.VUE_APP_ERROR_LOG_FILENAME as string,
  warningLogFileName: process.env.VUE_APP_WARNING_LOG_FILENAME as string,
});
