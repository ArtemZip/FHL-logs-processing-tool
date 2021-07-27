export interface ILogsParserService {
    Parse(content: string): void;
}

export interface ILogsParser {
    Parse(lines: string[]): ParsingResult;
}

export type ParsingResult = {
}
