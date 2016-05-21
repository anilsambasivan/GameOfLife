module GameOfLifeJs.Model {
    export class Pattern extends Backbone.Model {
        id: number;
        name: string;
        data: any;

        defaults() {
            return {
                id: '',
                name: '',
                data: []
            }
        }

        constructor(options) {
            super(options);
        }

        initialize() {
            if (!this.get('id')) {
                this.set({ 'id': this.defaults().id });
            }
            if (!this.get('name')) {
                this.set({ 'name': this.defaults().name });
            }
            if (!this.get('data')) {
                this.set({ 'data': this.defaults().data });
            }
        }
    } 
}