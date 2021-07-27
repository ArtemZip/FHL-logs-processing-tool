import { ILogsParserService } from "../types/logsParserInterfaces";

export class LogsParserService implements ILogsParserService {
    public Parse(content: string): void {
        throw new Error("Method not implemented.");
    }
}
