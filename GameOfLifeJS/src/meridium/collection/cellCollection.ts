module GameOfLifeJs.Collection {
    export class CellCollection extends Backbone.Collection<Model.Cell> {
        currentPattern: Model.Pattern;

        neighbourCells() {
            return [
                [-1, -1], [0, -1], [1, -1],
                [-1, 0], [1, 0],
                [-1, 1], [0, 1], [1, 1]
            ];
        }

        initialize() {

        }

        getLiveNeighbours(cell: Model.Cell, boardWidth: number, boardHeight: number) {
            var column = cell.get("column");
            var row = cell.get("row");

            var livingNeighbours = _.filter(this.neighbourCells(), function (neighboursRelativeCoordinates) {
                var neighbourColumn = neighboursRelativeCoordinates[0] + column;
                var neighbourRow = neighboursRelativeCoordinates[1] + row;

                if (neighbourColumn < 0 || neighbourRow < 0 || neighbourColumn > this.width - 1 || neighbourRow > this.height - 1) {
                    return false;
                }

                var neighbour = this.at(neighbourColumn + neighbourRow * boardWidth);

                return neighbour ? neighbour.get("alive") : false;
            }, this);
            
            return livingNeighbours.length;
        }

        clear() {
            this.each((cell) => {
                cell.set("alive", false);
            }, this);
        }

        randomize() {
            this.each((model) => {
                model.set("alive", !!Math.round(Math.random() * 1));
            });
        }

        setParren(pattern: Model.Pattern, width: number, height: number) {

            var dataX = JSON.parse(pattern.get('data'));
            for (var i = 0; i < dataX.length; i++) {
                for (var j = 0; j < dataX[0].length; j++) {
                    var cell = this.findCellByDimention(i, j);

                    cell.setAlive(dataX[i][j]);
                    //cell.set('nextState', dataX[i][j]);
                }
            }
        }

        findCellByDimention(col: number, row: number): Model.Cell {
            var selectedCell;
            this.each((cell: Model.Cell, inex: number) => {
                if (cell.column === col && cell.row === row) {
                    selectedCell = cell;
                }
            });
            return selectedCell;
        }
    }
}