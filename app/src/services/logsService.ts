import { ILogsParser, ILogsParserService } from "../types/logsParserInterfaces";
import { initLogsParser } from "./logsParserResolver";

export class LogsParserService implements ILogsParserService {
    private logsParser: ILogsParser;
    private chunksSize: number = 10;

    public constructor() {
        this.logsParser = initLogsParser();
    }

    public Upload(content: string): void {
        const lines = this.splitFileContent(content);
        // todo: think about parsing whole content or split into chunks
        const parsedContent = this.logsParser.Parse(lines);
        // todo: push to Loki
    }

    private splitFileContent(content: string): string[] {
        return content.replace(/\r\n/g, '\n').split('\n');
    }
}

let parserService: ILogsParserService;

export function getLogsParserService() {
    if (!parserService) {
        parserService = new LogsParserService();
    }
    return parserService;
}
