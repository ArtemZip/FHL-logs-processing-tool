import type { ILogsParser } from '../types/logsParserInterfaces';
import { TswLogsParser } from './sources/tswLogsParser';

export const initLogsParser = (): ILogsParser => {
    // todo: add proper implementation
    return new TswLogsParser();
};
