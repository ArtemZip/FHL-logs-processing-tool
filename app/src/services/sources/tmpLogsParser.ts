import type { ILogsParser } from '../../types/logsParserInterfaces';

export class TmpLogsParser implements ILogsParser {
    public Parse(lines: string[]): string {
        throw new Error('Method not implemented.');
    }
}
