import { ILogsClient, ParsedLine } from "../types/logsParserInterfaces";

export class LokiClient implements ILogsClient {
    // todo: add to config file 
    private lokiEndpoint: string = 'http://localhost:3100/loki/api/v1/push';

    public async push(content: ParsedLine[]): Promise<boolean> {
        let values: string[][] = [];
        content.forEach(line => values.push(line.columns));

        const body = {
            streams: [
                {
                    stream: {
                        label: "value"
                    },
                    values: values
                }
            ]
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
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
