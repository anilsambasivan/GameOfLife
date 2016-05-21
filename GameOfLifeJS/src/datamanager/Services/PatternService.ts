module GameOfLifeJs {
    export class PatternService implements IPatternService {
        url: string;

        constructor(options: IDataManagerOptions) {
            this.url = options.baseurl + "/pattern";
        }

        getPatterns(): JQueryPromise<Model.Pattern[]> {
            return <JQueryPromise<Model.Pattern[]>>$.ajax({
                type: "GET",
                url: this.url,
                contentType: "application/json; charset=utf-8",
            });
        }
    }
}

