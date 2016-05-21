module GameOfLifeJs.Collection {
    export class PatternCollection extends Backbone.Collection<Model.Pattern> {

        constructor(options) {
            super(options);
        }

        initialize(options) {
            _.each(options, (model: any) => {
                this.add(new Model.Pattern(model));
            });
        }

        getPattern(id: number): Model.Pattern {
            return this.get(id);
        }
    }
} 