import type { ILogsParser, ParsedLine, ParsingResult } from '../../types/logsParserInterfaces';

export class TswLogsParser implements ILogsParser {
    public parse(lines: string[]): ParsingResult {
        let parsedLines: ParsedLine[] = [];
        lines.forEach(line => {
            const dateTime = line.match(/^.*Time\)/)?.[0];
            if (dateTime) {
                const logLevel = line.match(/\b(?:event|info|error|warning|debug)\b/)?.[0] ?? '';
                const message = line.match(`(?<=${logLevel} -- ).*`)?.[0] ?? '';
                const parsedLine = [`${Date.parse(dateTime)}`, `level=${logLevel} msg=${message}`];
                parsedLines.push({ columns: parsedLine });
            }
        });

        return {
            parsedContent: parsedLines
        };
    }

    private splitMessageToKeyValue(message?: string): Map<string, string>{
        if (!message) {
            return new Map();
        }

        let result = new Map();
        message?.match(/^[a-zA-Z0-9]*:/);
        return result;
    }
}
