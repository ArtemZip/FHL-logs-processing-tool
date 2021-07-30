import type { ILogsParser, ParsedLine, ParsingResult } from '../../types/logsParserInterfaces';

export class TmpLogsParser implements ILogsParser {
    private currentTimestamp: number | undefined;

    public parse(lines: string[]): ParsingResult {
        let parsedLines: ParsedLine[] = [];
        lines.forEach(line => {
            let l = this.parseLine(line);
            if(l) {
                parsedLines.push(l);
            }
        })
        return {
            parsedContent: parsedLines
        };
    }

    private parseLine(line: string) : ParsedLine | undefined {
        const dateTime = line.match(/^.*Z/)?.[0];
        if (dateTime) {
            const logLevel = line.match(/\b(?:Inf|Err|War)\b/)?.[0] ?? '';
            const resource = line.match(`(?<=${logLevel}\s*).*: `)?.[0] ?? '';
            const message = line.match(`(?<=${resource}\s*).*`)?.[0] ?? '';

            this.currentTimestamp = Date.parse(dateTime);
            const parsedLine = [`${Date.parse(dateTime)}`, `level='${logLevel.trim()}' resource='${resource.trim()}' msg='${message.trim()}'`];

            return { columns: parsedLine };
        }

        if(this.currentTimestamp) {
            return { columns: [`${this.currentTimestamp}`, `msg='${line}'`]}
        }
        return undefined;
        
    }
}
