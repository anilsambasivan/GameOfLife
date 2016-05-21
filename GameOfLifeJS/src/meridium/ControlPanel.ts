module GameOfLifeJs {
    export class ControlPanel implements IComponent {
        initialize(options: View.IControlPanleOptions) {
            var controlPanel = new View.ControlPanelView(options);
            $(options.container).append(controlPanel.render().el);
        }
    }
}     