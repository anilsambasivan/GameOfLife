module GameOfLifeJs.Model {
    export class Cell extends Backbone.Model {
        alive: boolean;
        row: number;
        column: number;
        nextState: boolean;

        defaults() {
            return {
                alive: false,
                nextState: false,
                column: 0,
                row: 0
            }
        }

        constructor(options: ICellOption) {
            super(options);
            this.column = options.column;
            this.row = options.row;
        }

        initialize() {
            if (!this.get('alive')) {
                this.set({ 'alive': this.defaults().alive });
            }

            if (!this.get('column')) {
                this.set({ 'column': this.defaults().column });
            }
            if (!this.get('row')) {
                this.set({ 'row': this.defaults().row });
            }
            if (!this.get('nextState')) {
                this.set({ 'nextState': this.defaults().nextState });
            }

            BackBoneEvents.on("GameGridView:redraw", this.regenerate, this);
        }

        applyRule(rule: Model.Rule, neighbours: number) {
            if (this.get("alive")) {
                this.set("nextState", this.checkSurvivalStatus(rule, neighbours));
            } else {
                this.set("nextState", this.checkBirthStatus(rule, neighbours));
            }
        }

        clear() {
            this.alive = false;
        }

        setAlive(isAlive: boolean) {
            this.set("alive", isAlive);
        }

        regenerate() {
            this.set("alive", this.get("nextState"));
            this.set("nextState", false);
        }

        checkSurvivalStatus(rule: Model.Rule, neighbours: number) {
            var status = [];
            _.each(rule.survival, (ruleCount: number) => {
                if (neighbours === ruleCount) {
                    status.push(true);
                }
            });

            return status.length > 0;
        }

        checkBirthStatus(rule: Model.Rule, neighbours: number) {
            var status = [];
            _.each(rule.birth, (ruleCount: number) => {
                if (neighbours === ruleCount) {
                    status.push(true);
                }
            });
            return status.length > 0;
        }
    }

    export interface ICellOption {
        alive?: boolean;
        nextState?: boolean;
        row: number;
        column: number;
    }
}