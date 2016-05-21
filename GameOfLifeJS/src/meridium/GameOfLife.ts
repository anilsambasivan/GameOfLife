var BackBoneEvents = BackBoneEvents || {};

module GameOfLifeJs {
    export class GameOfLife {
        randomData: boolean[][];
        dataManager: DataManager;

        constructor(elGameBoard: HTMLElement, elControlPanel: HTMLElement, dataManager: DataManager) {
            this.dataManager = dataManager;
            _.extend(BackBoneEvents, Backbone.Events);

            var gvOptions = <View.IGridViewOptions>{
                cellCollection: {},
                width: 70,
                height: 70,
                dataManager: this.dataManager,
                componentType: 'gameboard',
                container: elGameBoard
            };

            var cpOptions = <View.IControlPanleOptions>{
                dataManager: this.dataManager,
                patterns: null,
                componentType: 'controlpanel',
                container: elControlPanel
            };

            ComponentFactory.createComponent(gvOptions);
            ComponentFactory.createComponent(cpOptions);
        }

        getRandomLife(): any {
            this.randomData = [];
            for (var i = 0; i < 70; i++) {
                this.randomData[i] = [];
                for (var j = 0; j < 70; j++) {
                    this.randomData[i][j] = ((Math.floor((Math.random() * 700) + 1) % 5) === 0) ? true : false;
                }
            }

            return this.randomData;
        }
    }
}

window.onload = () => {
    var elGameBoard = document.getElementById('content');
    var elControlPanel = document.getElementById('controls');
    var dataManager = new GameOfLifeJs.DataManager({
        baseurl: 'http://localhost/GameOfLifeService/api'
    });
    var gameOfLifeApp = new GameOfLifeJs.GameOfLife(elGameBoard, elControlPanel, dataManager);
    
};