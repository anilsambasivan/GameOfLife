module GameOfLifeJs.View {
    export interface IGridViewOptions extends IComponentOptions {
        cellCollection: Collection.CellCollection;
        width: number;
        height: number;
        tagName: string;
        className: string;
    }

    export interface IControlPanleOptions extends IComponentOptions {
        patterns: Collection.PatternCollection;
        tagName: string;
        className: string;
        role: string;
        events: any;
    }
} 