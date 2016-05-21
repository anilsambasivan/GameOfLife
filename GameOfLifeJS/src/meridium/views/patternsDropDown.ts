module GameOfLifeJs.View {
    export class PatternItemView extends Backbone.View<Model.Pattern> {
        options: any;

        constructor(options) {
            options.tagName = 'option';
            options.events = {
                'click': "itemClicked"
            };
            super(options);
            this.options = options;
        }

        render() {
            this.$el.attr('value', this.options.model.get('name'));
            this.$el.append(this.model.get('name'));
            return this;
        }

        itemClicked() {
            BackBoneEvents.trigger('PatternItemView:patternSelected', this.model);
        }
    }

    export class PatternListView extends Backbone.View<Model.Pattern> {
        template: any;

        constructor(options) {
            options.tagName = 'select';
            options.id = 'patternDropDown';
            options.className = 'form-control';
            super(options);
        }
        initialize(options) {
            this.collection = new Collection.PatternCollection(options.models);
        }
        render () {
            _.each(this.collection.models, function (item) {
                this.$el.append(new PatternItemView({ model: item }).render().el);
            }, this);
            return this;
        }
    }
}  
