import type { ILogsParser, ParsingResult } from '../../types/logsParserInterfaces';

export class TmpLogsParser implements ILogsParser {
    public parse(lines: string[]): ParsingResult {
        throw new Error('Method not implemented.');
    }
}
