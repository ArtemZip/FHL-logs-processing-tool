import type { ILogsParser } from '../types/logsParserInterfaces';
import { TmpLogsParser } from './sources/tmpLogsParser';
import { TswLogsParser } from './sources/tswLogsParser';

export const initLogsParser = (content: string): ILogsParser => {
   const tswRegex = new RegExp(/^[a-zA-Z]{3} [a-zA-Z]{3} \d{2}/);
   const tmpRegex = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);

    if (content.match(tmpRegex)) {
        return new TmpLogsParser();
    }
    else if (content.match(tswRegex)) {
        return new TswLogsParser();
    }

    throw new Error('Not resolved');
};
