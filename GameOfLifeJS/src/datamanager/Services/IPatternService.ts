module GameOfLifeJs {
    export interface IPatternService {
        getPatterns(): JQueryPromise<Model.Pattern[]>;
    }
}

