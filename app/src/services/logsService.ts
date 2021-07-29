import { ILogsClient, ILogsParser, ILogsParserService } from "../types/logsParserInterfaces";
import { initLogsParser } from "./logsParserResolver";
import { getLogsClient } from "./lokiClient";

export class LogsParserService implements ILogsParserService {
    private logsParser: ILogsParser;
    private logsClient: ILogsClient;

    public constructor() {
        this.logsParser = initLogsParser();
        this.logsClient = getLogsClient();
    }

    public async upload(content: string): Promise<void> {
        const lines = this.splitFileContent(content);
        // todo: think about parsing whole content or split into chunks
        const result = this.logsParser.parse(lines);
        // todo: split
        await this.logsClient.push(result.parsedContent);
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
