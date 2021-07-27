import type { ILogsParser } from '../../types/logsParserInterfaces';

export class TswLogsParser implements ILogsParser {
    public Parse(lines: string[]): string {
        throw new Error('Method not implemented.');
    }
}
