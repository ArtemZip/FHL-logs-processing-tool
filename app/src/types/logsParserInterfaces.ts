export interface ILogsParserService {
    upload(content: string): Promise<void>;
}

export interface ILogsParser {
    parse(lines: string[]): ParsingResult;
}

export interface ILogsClient {
    push(content: ParsedLine[]): Promise<boolean>;
} 

export type ParsingResult = {
    parsedContent: ParsedLine[]
}

export type ParsedLine = {
    columns: string[]
}
