import { convertTypeAcquisitionFromJson } from 'typescript';
import type { ILogsParser, ParsedLine, ParsingResult } from '../../types/logsParserInterfaces';

export class TmpLogsParser implements ILogsParser {
    private currentTimestamp: number | undefined;

    public parse(lines: string[]): ParsingResult {
        let parsedLines: ParsedLine[] = [];
        lines.forEach(line => {
            let l = this.parseLine(line);
            if(l) {
                try {
                    let a = parseInt(l.columns[0]);
                    if(a) {                
                        parsedLines.push(l);
                    }
                } catch (e) {
                    console.log(e); 
                }
            }
        })
        
        return {
            parsedContent: parsedLines.sort((a,b) => parseInt(a.columns[0]) - parseInt(b.columns[0]))
        };
    }

    private parseLine(line: string) : ParsedLine | undefined {
        try{
            const dateTime = line.match(/^.*Z/)?.[0];
            if (dateTime) {
                const logLevel = line.match(/\b(?:Inf|Err|War)\b/)?.[0] ?? '';
                const resource = line.match(`(?<=${logLevel}\s*):`)?.[0] ?? '';
                const message = line.match(`(?<=${resource}\s*).*`)?.[0] ?? '';
                        //Date.now() * 1000000;
                this.currentTimestamp = Date.parse(dateTime) * 1000000;
                const parsedLine = [`${this.currentTimestamp}`, `level='${logLevel.trim()}' resource='${resource.trim()}' msg='${message.trim()}'`];

                return { columns: parsedLine };
            }

            if(this.currentTimestamp) {
                return { columns: [`${this.currentTimestamp}`, `msg='${line}'`]}
            }
        } catch(error) {
            console.log(error);
        }
        return undefined;
        
    }
}
