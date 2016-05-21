module GameOfLifeJs {
    export class DataManager {
        private patternService: IPatternService;
        private ruleService: IRuleService;

        constructor(options: IDataManagerOptions) {
            this.patternService = new PatternService(options);
            this.ruleService = new RuleService(options);
        }

        getPatternService() {
            return this.patternService;
        }

        getRuleService() {
            return this.ruleService;
        }
    }

    export interface IDataManagerOptions {
        baseurl: string;
    }
}

