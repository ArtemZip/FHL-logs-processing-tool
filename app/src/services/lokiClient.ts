import { ILogsClient, ParsedLine } from "../types/logsParserInterfaces";

export class LokiClient implements ILogsClient {
    // todo: add to config file 
    private lokiEndpoint: string = 'http://localhost:3101/loki/api/v1/push';
    private chunksSize: number = 50;

    public async push(content: ParsedLine[]): Promise<boolean> {
        const label = `Logs::[${new Date().toISOString()}]`;

        let result: boolean = true;
        for(let i = 0; i < content.length; i+=this.chunksSize) {
            result = result && await this.pushChunk(content.slice(i, i+this.chunksSize), label);
        }

        return result;
    }

    private async pushChunk (content: ParsedLine[], label: string) {
        const body = {
            streams: [
                {
                    stream: {
                        label: label
                    },
                    values: content.map(e => e.columns)
                }
            ]
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        try {
            await fetch(this.lokiEndpoint, requestOptions);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

let logsClient: ILogsClient;

export function getLogsClient() {
    if (!logsClient) {
        logsClient = new LokiClient();
    }
    return logsClient;
}
