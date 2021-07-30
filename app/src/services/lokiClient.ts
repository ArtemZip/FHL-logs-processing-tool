import { ILogsClient, ParsedLine } from "../types/logsParserInterfaces";

export class LokiClient implements ILogsClient {
    // todo: add to config file 
    private lokiEndpoint: string = 'http://localhost:3101/loki/api/v1/push';
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
              'Content-Type': 'application/json',
              'Origin': "http://localhost:8080/",
              'Referrer-Policy': 'no-referrer',
              'Referrer Policy': 'no-referrer',
            },
            // mode: 'no-cors',
            body: JSON.stringify(body)
        };

        fetch("http://localhost:3101/metrics", {method: 'GET'}).then(r => {
            console.log(`HERE: ${r}`);
        }).catch(e => {
            console.log(`ERROR: ${e}`);
        })

        try {
           
            const response = await fetch(this.lokiEndpoint, requestOptions);
            const data = await response.json();
            console.log(data);
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
