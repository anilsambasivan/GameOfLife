module GameOfLifeJs {
    export class ComponentFactory {
        static createComponent(options: IComponentOptions) {
            switch (options.componentType) {
                case "gameboard":
                    var gb = new GameBoard();
                    gb.initialize(<View.IGridViewOptions>options);
                break;
                case "controlpanel":
                    var cp = new ControlPanel();
                    cp.initialize(<View.IControlPanleOptions>options);
                break;
            }
        }
    }
}     