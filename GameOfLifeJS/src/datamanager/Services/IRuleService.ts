module GameOfLifeJs {
    export interface IRuleService {
        getRule(): JQueryPromise<Model.Rule>;
    }
}
 