module GameOfLifeJs.View {
    export class CellView extends Backbone.View<Model.Cell> {
        constructor(options) {
            super(options);
        }
        initialize() {
            this.model.on("change:alive", this.render, this);
        }

        render() {
            (this.model.get("alive")) ? this.$el.addClass("alive") : this.$el.removeClass("alive");
            return this;
        }
    }
}  