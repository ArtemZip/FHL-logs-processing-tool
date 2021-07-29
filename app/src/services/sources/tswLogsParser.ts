import type { ILogsParser, ParsedLine, ParsingResult } from '../../types/logsParserInterfaces';

export class TswLogsParser implements ILogsParser {
    public parse(lines: string[]): ParsingResult {
        let parsedLines: ParsedLine[] = [];
        lines.forEach(line => {
            let dateTime = line.match(/^.*Time\)/)?.[0] ?? '';
            const parsedLine = [`${Date.parse(dateTime)}`];
            parsedLines.push({ columns: parsedLine });
        });

        return {
            parsedContent: parsedLines
        };
    }
}
