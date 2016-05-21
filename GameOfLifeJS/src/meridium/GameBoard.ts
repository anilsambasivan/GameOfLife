module GameOfLifeJs {
    export class GameBoard implements IComponent {
        initialize(options: View.IGridViewOptions) {
            var gameOfLife = new View.GameGridView(options);
            $(options.container).append(gameOfLife.render().el);
        }
    }
}      