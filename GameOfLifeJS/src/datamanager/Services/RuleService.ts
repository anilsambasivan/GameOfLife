module GameOfLifeJs {
    export class RuleService implements IRuleService {
        url: string;

        constructor(options: IDataManagerOptions) {
            this.url = options.baseurl + "/rule";
        }

        getRule(): JQueryPromise<Model.Rule> {
            return <JQueryPromise<Model.Rule>>$.ajax({
                type: "GET",
                url: this.url,
                contentType: "application/json; charset=utf-8",
            });
        }
    }
}
 