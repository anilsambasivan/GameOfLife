module GameOfLifeJs.View {
    export class CellsRowView extends Backbone.View<Model.Cell> {
        template: any;

        constructor() {
            super({ tagName: 'div' });
        }

        initialize() {
        }

        render() {
            this.$el.addClass("RowX");
            return this;
        }
    }
}   