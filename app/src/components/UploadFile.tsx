import { ChangeEvent, Component, CSSProperties } from "react";
import { getLogsParserService } from "../services/logsService";

const inputUploadFile: CSSProperties = {
  display: 'none',
};

const buttonUploadFile: CSSProperties = {
    margin: 8,
};

interface UploadFileOwnProps { }
interface UploadFileProps extends UploadFileOwnProps { }
interface UploadFileStateProps { }

export class UploadFileComponent extends Component<UploadFileProps, UploadFileStateProps>  {
    private getFileFromInput(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file);
        });
    }

    private manageUploadedFile(binary: String, file: File) {
        const logsService = getLogsParserService();
        logsService.upload(binary.toString());
        // todo: display upload result and file info if necessary
        console.log(`File size: ${binary.length}`);
        console.log(`File name: ${file.name}`);
    }

    private handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        event.persist();
        const files: FileList | null = event.target.files;
        if (files != null) {
            Array.from(files).forEach(file => {
                this.getFileFromInput(file)
                    .then((binary) => {
                        this.manageUploadedFile(binary, file);
                    }).catch(function (reason) {
                        console.log(`Error during upload ${reason}`);
                        event.target.value = ''; // to allow upload of same file if error occurs
                    });
            });
        }
    }


    public render(): JSX.Element {
        return (
            // todo: change style
            <div className="App">
                <header className="App-header">
                    <input accept=".txt" style={inputUploadFile} id="file" multiple={true} type="file"
                        onChange={this.handleFileChange.bind(this)} />
                    <label htmlFor="file">
                        Click to upload
                    </label>
                </header>
            </div>
        );
    }
}
