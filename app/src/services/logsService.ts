import { ILogsClient, ILogsParserService } from "../types/logsParserInterfaces";
import { initLogsParser } from "./logsParserResolver";
import { getLogsClient } from "./lokiClient";

export class LogsParserService implements ILogsParserService {
    private logsClient: ILogsClient;

    public constructor() {
        this.logsClient = getLogsClient();
    }

    public async upload(content: string): Promise<void> {
        try {
            const logsParser = initLogsParser(content);
            const lines = this.splitFileContent(content);
            // todo: think about parsing whole content or split into chunks
            const result = logsParser.parse(lines);
            await this.logsClient.push(result.parsedContent);
        } catch (error) {
            console.log(error)
        }
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
