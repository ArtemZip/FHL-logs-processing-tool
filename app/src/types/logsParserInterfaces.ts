export interface ILogsParserService {
    Upload(content: string): void;
}

export interface ILogsParser {
    Parse(lines: string[]): ParsingResult;
}

export type ParsingResult = {
    parsedContent: ParsedLine[]
}

export type ParsedLine = {
    columns: string[]
}
