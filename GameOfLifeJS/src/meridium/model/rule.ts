module GameOfLifeJs.Model {
    export class Rule extends Backbone.Model {
        survival: number[];
        birth: number[];

        defaults() {
            return {
                survival: [],
                birth: []
            }
        }

        constructor(options) {
            super();
            this.survival = options.survival;
            this.birth = options.birth;
        }
        
        initialize() {
            if (!this.get('survival')) {
                this.set({ 'survival': this.defaults().survival });
            }
            if (!this.get('birth')) {
                this.set({ 'birth': this.defaults().birth });
            }
        }
    } 
}