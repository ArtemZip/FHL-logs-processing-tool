import type { ILogsParser, ParsingResult } from '../../types/logsParserInterfaces';

export class TmpLogsParser implements ILogsParser {
    public Parse(lines: string[]): ParsingResult {
        throw new Error('Method not implemented.');
    }
}
