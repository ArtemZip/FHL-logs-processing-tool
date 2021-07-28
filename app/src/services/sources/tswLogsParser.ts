import type { ILogsParser, ParsedLine, ParsingResult } from '../../types/logsParserInterfaces';

export class TswLogsParser implements ILogsParser {
    public Parse(lines: string[]): ParsingResult {
        let parsedLines: ParsedLine[] = [];
        lines.forEach(line => {
            let dateTime = line.match(/^.*Time\)/)?.[0] ?? '';
            const parsedLine = [dateTime];
            parsedLines.push({ columns: parsedLine });
        });

        return {
            parsedContent: parsedLines
        };
    }
}
