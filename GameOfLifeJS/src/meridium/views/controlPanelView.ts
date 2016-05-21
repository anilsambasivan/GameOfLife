
module GameOfLifeJs.View {
    export class ControlPanelView extends Backbone.View<any> {
        width: number;
        height: number;
        rule: Model.Rule;
        template: any;
        patternSelecion: View.PatternListView;
        options: IControlPanleOptions;
        dm: DataManager;

        constructor(options?: IControlPanleOptions) {
            if (!options)
                options = <IControlPanleOptions>{};
            options.tagName = 'div';
            options.role = 'form';
            options.events = {
                "click #btnStart": "onStart",
                "click #btnStop": "onStop"
            }
            super(options);

        }

        initialize(options?: IControlPanleOptions) {
            this.dm = options.dataManager;


            this.options = options;
            this.template = _.template('<fieldset><div class="form-group"><label>Select Life Pattern</label><div id="selectPattern"></div></div><div class="checkbox"><label><input type="checkbox">Disabled Checkbox</label></div><button type="submit" id="btnStart" class="btn btn-primary">Start</button><button type="submit" id="btnStop" class="btn btn-primary">Stop</button></fieldset>');
            BackBoneEvents.on("PatternItemView:patternSelected", this.onPatternSelected, this);
        }

        render() {
            if (this.dm) {
                this.dm.getPatternService().getPatterns().done(data => {
                    this.options.patterns = new Collection.PatternCollection(data);
                    if (this.options.patterns && this.options.patterns.length > 0) {

                        this.patternSelecion = new PatternListView({ models: this.options.patterns.models });
                        this.$el.html(this.template());
                        this.$("#selectPattern").append(this.patternSelecion.render().el);
                        BackBoneEvents.trigger("ControlPanel:patternChange", this.options.patterns.models[0]);
                        return this;

                    }

                }).fail((error) => {
                    console.log("pull rule from server failed");
                });
            }
            return this;
        }

        onStart() {
            BackBoneEvents.trigger("ControlPanel:start");
        }

        onStop() {
            BackBoneEvents.trigger("ControlPanel:stop");
        }

        onPatternSelected(pattern: Model.Pattern) {
            BackBoneEvents.trigger("ControlPanel:patternChange", pattern);
        }

       
        clear() {
            BackBoneEvents.trigger("ControlPanel:clear");
        }

        randomize() {
            BackBoneEvents.trigger("ControlPanel:randomize");
        }
    }
}    