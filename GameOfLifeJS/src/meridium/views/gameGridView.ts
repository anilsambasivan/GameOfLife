
module GameOfLifeJs.View {
    export class GameGridView extends Backbone.View<Model.Cell> {
        collection: Collection.CellCollection;
        width: number;
        height: number;
        rule: Model.Rule;
        timer: Timer;
        rowTemplate: any;
        columnTemplate: any;
        dm: DataManager;

        constructor(options?: IGridViewOptions) {
            if (!options)
                options = <IGridViewOptions>{};
            options.tagName = 'div';
            options.className = 'gridView';
            super(options);
            this.dm = options.dataManager;

            //this.rule = new Model.Rule({ survival: [2, 3], birth: [3] });
        }

        initialize(options?: IGridViewOptions) {
            if (options) {
                this.width = options.width;
                this.height = options.height;
            }
            this.collection = this.generateCollection();

            this.timer = new Timer();
            BackBoneEvents.on("Timer:tick", this.redrawGridView, this);
            BackBoneEvents.on("ControlPanel:start", this.start, this);
            BackBoneEvents.on("ControlPanel:stop", this.stop, this);
            BackBoneEvents.on('ControlPanel:patternChange', this.applyPattern, this);
        }

        render() {
            if (this.dm) {
                this.dm.getRuleService().getRule().done(data => {
                    this.rule = new Model.Rule(data);
                    var count = 1;
                    var rowViewEl = new CellsRowView().render().el;
                    this.$el.append(rowViewEl);
                    this.collection.each(function (cell) {
                        var cellView = new View.CellView({ model: cell, className: 'cell' });
                        $(rowViewEl).append(cellView.render().el);
                        if (count % this.width === 0) {
                            rowViewEl = new CellsRowView().render().el;
                            this.$el.append(rowViewEl);
                        }
                        count++;
                    }, this);

                    return this;
                }).fail((error) => {
                    console.log("pull rule from server failed");
                });
            }

            return this;
        }

        applyPattern(pattern: Model.Pattern) {
            this.collection.setParren(pattern, this.width, this.height);
            BackBoneEvents.trigger("GameGridView:patternChange");
        }

        redrawGridView() {
            if (this.rule && this.collection.length > 0) {
                this.collection.each(function (cell) {
                    cell.applyRule(this.rule, this.collection.getLiveNeighbours(cell, this.width, this.height));
                }, this);
                BackBoneEvents.trigger("GameGridView:redraw");
            }
        }

        clear() {
            this.collection.clear();
        }

        randomize() {
            this.collection.randomize();
        }

        generateCollection(): Collection.CellCollection {
            var strValues = '';
            var cellCollection = new Collection.CellCollection();
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    cellCollection.add(new Model.Cell({
                        column: j,
                        row: i,
                        alive: false,
                        nextState: false
                    }));
                }
            }
            return cellCollection;
        }

        start() {
            this.timer.start();
        }

        stop() {
            this.timer.stop();
        }
    }
}   