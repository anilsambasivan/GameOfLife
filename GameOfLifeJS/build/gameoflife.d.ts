declare module GameOfLifeJs {
    class DataManager {
        private patternService;
        private ruleService;
        constructor(options: IDataManagerOptions);
        getPatternService(): IPatternService;
        getRuleService(): IRuleService;
    }
    interface IDataManagerOptions {
        baseurl: string;
    }
}
declare module GameOfLifeJs {
    interface IPatternService {
        getPatterns(): JQueryPromise<Model.Pattern[]>;
    }
}
declare module GameOfLifeJs {
    interface IRuleService {
        getRule(): JQueryPromise<Model.Rule>;
    }
}
declare module GameOfLifeJs {
    class PatternService implements IPatternService {
        url: string;
        constructor(options: IDataManagerOptions);
        getPatterns(): JQueryPromise<Model.Pattern[]>;
    }
}
declare module GameOfLifeJs {
    class RuleService implements IRuleService {
        url: string;
        constructor(options: IDataManagerOptions);
        getRule(): JQueryPromise<Model.Rule>;
    }
}
declare var BackBoneEvents: any;
declare module GameOfLifeJs {
    class GameOfLife {
        randomData: boolean[][];
        dataManager: DataManager;
        constructor(elGameBoard: HTMLElement, elControlPanel: HTMLElement, dataManager: DataManager);
        getRandomLife(): any;
    }
}
declare module GameOfLifeJs.Collection {
    class CellCollection extends Backbone.Collection<Model.Cell> {
        currentPattern: Model.Pattern;
        neighbourCells(): number[][];
        initialize(): void;
        getLiveNeighbours(cell: Model.Cell, boardWidth: number, boardHeight: number): number;
        clear(): void;
        randomize(): void;
        setParren(pattern: Model.Pattern, width: number, height: number): void;
        findCellByDimention(col: number, row: number): Model.Cell;
    }
}
declare module GameOfLifeJs.Collection {
    class PatternCollection extends Backbone.Collection<Model.Pattern> {
        constructor(options: any);
        initialize(options: any): void;
        getPattern(id: number): Model.Pattern;
    }
}
declare module GameOfLifeJs {
    class Component {
        initialize(options: IComponentOptions): void;
    }
}
declare module GameOfLifeJs {
    class ComponentFactory {
        static createComponent(options: IComponentOptions): void;
    }
}
declare module GameOfLifeJs {
    class ControlPanel implements IComponent {
        initialize(options: View.IControlPanleOptions): void;
    }
}
declare module GameOfLifeJs {
    class GameBoard implements IComponent {
        initialize(options: View.IGridViewOptions): void;
    }
}
declare module GameOfLifeJs {
    interface IComponent {
        initialize(options: IComponentOptions): any;
    }
}
declare module GameOfLifeJs {
    interface IComponentOptions {
        dataManager: DataManager;
        container: HTMLElement;
        componentType: string;
    }
}
declare module GameOfLifeJs.Model {
    class Pattern extends Backbone.Model {
        id: number;
        name: string;
        data: any;
        defaults(): {
            id: string;
            name: string;
            data: any[];
        };
        constructor(options: any);
        initialize(): void;
    }
}
declare module GameOfLifeJs.Model {
    class Rule extends Backbone.Model {
        survival: number[];
        birth: number[];
        defaults(): {
            survival: any[];
            birth: any[];
        };
        constructor(options: any);
        initialize(): void;
    }
}
declare module GameOfLifeJs.Model {
    class Cell extends Backbone.Model {
        alive: boolean;
        row: number;
        column: number;
        nextState: boolean;
        defaults(): {
            alive: boolean;
            nextState: boolean;
            column: number;
            row: number;
        };
        constructor(options: ICellOption);
        initialize(): void;
        applyRule(rule: Model.Rule, neighbours: number): void;
        clear(): void;
        setAlive(isAlive: boolean): void;
        regenerate(): void;
        checkSurvivalStatus(rule: Model.Rule, neighbours: number): boolean;
        checkBirthStatus(rule: Model.Rule, neighbours: number): boolean;
    }
    interface ICellOption {
        alive?: boolean;
        nextState?: boolean;
        row: number;
        column: number;
    }
}
declare module GameOfLifeJs {
    class Timer {
        tick: number;
        timer: any;
        defaults(): void;
        initialize(): void;
        start(): void;
        stop(): void;
        changeSpeed(newSpeed: any): void;
        onTick(): void;
    }
}
declare module GameOfLifeJs.View {
    class CellsRowView extends Backbone.View<Model.Cell> {
        template: any;
        constructor();
        initialize(): void;
        render(): this;
    }
}
declare module GameOfLifeJs.View {
    class CellView extends Backbone.View<Model.Cell> {
        constructor(options: any);
        initialize(): void;
        render(): this;
    }
}
declare module GameOfLifeJs.View {
    class ControlPanelView extends Backbone.View<any> {
        width: number;
        height: number;
        rule: Model.Rule;
        template: any;
        patternSelecion: View.PatternListView;
        options: IControlPanleOptions;
        dm: DataManager;
        constructor(options?: IControlPanleOptions);
        initialize(options?: IControlPanleOptions): void;
        render(): this;
        onStart(): void;
        onStop(): void;
        onPatternSelected(pattern: Model.Pattern): void;
        clear(): void;
        randomize(): void;
    }
}
declare module GameOfLifeJs.View {
    class GameGridView extends Backbone.View<Model.Cell> {
        collection: Collection.CellCollection;
        width: number;
        height: number;
        rule: Model.Rule;
        timer: Timer;
        rowTemplate: any;
        columnTemplate: any;
        dm: DataManager;
        constructor(options?: IGridViewOptions);
        initialize(options?: IGridViewOptions): void;
        render(): this;
        applyPattern(pattern: Model.Pattern): void;
        redrawGridView(): void;
        clear(): void;
        randomize(): void;
        generateCollection(): Collection.CellCollection;
        start(): void;
        stop(): void;
    }
}
declare module GameOfLifeJs.View {
    interface IGridViewOptions extends IComponentOptions {
        cellCollection: Collection.CellCollection;
        width: number;
        height: number;
        tagName: string;
        className: string;
    }
    interface IControlPanleOptions extends IComponentOptions {
        patterns: Collection.PatternCollection;
        tagName: string;
        className: string;
        role: string;
        events: any;
    }
}
declare module GameOfLifeJs.View {
    class PatternItemView extends Backbone.View<Model.Pattern> {
        options: any;
        constructor(options: any);
        render(): this;
        itemClicked(): void;
    }
    class PatternListView extends Backbone.View<Model.Pattern> {
        template: any;
        constructor(options: any);
        initialize(options: any): void;
        render(): this;
    }
}
