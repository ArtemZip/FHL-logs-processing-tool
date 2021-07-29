import { ILogsClient, ParsedLine } from "../types/logsParserInterfaces";

export class LokiClient implements ILogsClient {
    // todo: add to config file 
    private lokiEndpoint: string = 'http://localhost:3100/loki/api/v1/push';
    private chunksSize: number = 10;

    public async push(content: ParsedLine[]): Promise<boolean> {
        let values: string[][] = [];
        content.slice(0, 20).forEach(line => values.push(line.columns));

        const body = {
            streams: [
                {
                    stream: {
                        label: `${Date.now()}`
                    },
                    values: values
                }
            ]
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            // mode: 'no-cors',
            body: JSON.stringify(body)
        };

        try {
           
            const response = await fetch(this.lokiEndpoint, requestOptions);
            const data = await response.json();
            return true;
        } catch (error) {
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
