var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var DataManager = (function () {
        function DataManager(options) {
            this.patternService = new GameOfLifeJs.PatternService(options);
            this.ruleService = new GameOfLifeJs.RuleService(options);
        }
        DataManager.prototype.getPatternService = function () {
            return this.patternService;
        };
        DataManager.prototype.getRuleService = function () {
            return this.ruleService;
        };
        return DataManager;
    }());
    GameOfLifeJs.DataManager = DataManager;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var PatternService = (function () {
        function PatternService(options) {
            this.url = options.baseurl + "/pattern";
        }
        PatternService.prototype.getPatterns = function () {
            return $.ajax({
                type: "GET",
                url: this.url,
                contentType: "application/json; charset=utf-8",
            });
        };
        return PatternService;
    }());
    GameOfLifeJs.PatternService = PatternService;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var RuleService = (function () {
        function RuleService(options) {
            this.url = options.baseurl + "/rule";
        }
        RuleService.prototype.getRule = function () {
            return $.ajax({
                type: "GET",
                url: this.url,
                contentType: "application/json; charset=utf-8",
            });
        };
        return RuleService;
    }());
    GameOfLifeJs.RuleService = RuleService;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var BackBoneEvents = BackBoneEvents || {};
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var GameOfLife = (function () {
        function GameOfLife(elGameBoard, elControlPanel, dataManager) {
            this.dataManager = dataManager;
            _.extend(BackBoneEvents, Backbone.Events);
            var gvOptions = {
                cellCollection: {},
                width: 70,
                height: 70,
                dataManager: this.dataManager,
                componentType: 'gameboard',
                container: elGameBoard
            };
            var cpOptions = {
                dataManager: this.dataManager,
                patterns: null,
                componentType: 'controlpanel',
                container: elControlPanel
            };
            GameOfLifeJs.ComponentFactory.createComponent(gvOptions);
            GameOfLifeJs.ComponentFactory.createComponent(cpOptions);
        }
        GameOfLife.prototype.getRandomLife = function () {
            this.randomData = [];
            for (var i = 0; i < 70; i++) {
                this.randomData[i] = [];
                for (var j = 0; j < 70; j++) {
                    this.randomData[i][j] = ((Math.floor((Math.random() * 700) + 1) % 5) === 0) ? true : false;
                }
            }
            return this.randomData;
        };
        return GameOfLife;
    }());
    GameOfLifeJs.GameOfLife = GameOfLife;
})(GameOfLifeJs || (GameOfLifeJs = {}));
window.onload = function () {
    var elGameBoard = document.getElementById('content');
    var elControlPanel = document.getElementById('controls');
    var dataManager = new GameOfLifeJs.DataManager({
        baseurl: 'http://localhost/GameOfLifeService/api'
    });
    var gameOfLifeApp = new GameOfLifeJs.GameOfLife(elGameBoard, elControlPanel, dataManager);
};
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Collection;
    (function (Collection) {
        var CellCollection = (function (_super) {
            __extends(CellCollection, _super);
            function CellCollection() {
                _super.apply(this, arguments);
            }
            CellCollection.prototype.neighbourCells = function () {
                return [
                    [-1, -1], [0, -1], [1, -1],
                    [-1, 0], [1, 0],
                    [-1, 1], [0, 1], [1, 1]
                ];
            };
            CellCollection.prototype.initialize = function () {
            };
            CellCollection.prototype.getLiveNeighbours = function (cell, boardWidth, boardHeight) {
                var column = cell.get("column");
                var row = cell.get("row");
                var livingNeighbours = _.filter(this.neighbourCells(), function (neighboursRelativeCoordinates) {
                    var neighbourColumn = neighboursRelativeCoordinates[0] + column;
                    var neighbourRow = neighboursRelativeCoordinates[1] + row;
                    if (neighbourColumn < 0 || neighbourRow < 0 || neighbourColumn > this.width - 1 || neighbourRow > this.height - 1) {
                        return false;
                    }
                    var neighbour = this.at(neighbourColumn + neighbourRow * boardWidth);
                    return neighbour ? neighbour.get("alive") : false;
                }, this);
                return livingNeighbours.length;
            };
            CellCollection.prototype.clear = function () {
                this.each(function (cell) {
                    cell.set("alive", false);
                }, this);
            };
            CellCollection.prototype.randomize = function () {
                this.each(function (model) {
                    model.set("alive", !!Math.round(Math.random() * 1));
                });
            };
            CellCollection.prototype.setParren = function (pattern, width, height) {
                var dataX = JSON.parse(pattern.get('data'));
                for (var i = 0; i < dataX.length; i++) {
                    for (var j = 0; j < dataX[0].length; j++) {
                        var cell = this.findCellByDimention(i, j);
                        cell.setAlive(dataX[i][j]);
                    }
                }
            };
            CellCollection.prototype.findCellByDimention = function (col, row) {
                var selectedCell;
                this.each(function (cell, inex) {
                    if (cell.column === col && cell.row === row) {
                        selectedCell = cell;
                    }
                });
                return selectedCell;
            };
            return CellCollection;
        }(Backbone.Collection));
        Collection.CellCollection = CellCollection;
    })(Collection = GameOfLifeJs.Collection || (GameOfLifeJs.Collection = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Collection;
    (function (Collection) {
        var PatternCollection = (function (_super) {
            __extends(PatternCollection, _super);
            function PatternCollection(options) {
                _super.call(this, options);
            }
            PatternCollection.prototype.initialize = function (options) {
                var _this = this;
                _.each(options, function (model) {
                    _this.add(new GameOfLifeJs.Model.Pattern(model));
                });
            };
            PatternCollection.prototype.getPattern = function (id) {
                return this.get(id);
            };
            return PatternCollection;
        }(Backbone.Collection));
        Collection.PatternCollection = PatternCollection;
    })(Collection = GameOfLifeJs.Collection || (GameOfLifeJs.Collection = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Component = (function () {
        function Component() {
        }
        Component.prototype.initialize = function (options) {
        };
        return Component;
    }());
    GameOfLifeJs.Component = Component;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var ComponentFactory = (function () {
        function ComponentFactory() {
        }
        ComponentFactory.createComponent = function (options) {
            switch (options.componentType) {
                case "gameboard":
                    var gb = new GameOfLifeJs.GameBoard();
                    gb.initialize(options);
                    break;
                case "controlpanel":
                    var cp = new GameOfLifeJs.ControlPanel();
                    cp.initialize(options);
                    break;
            }
        };
        return ComponentFactory;
    }());
    GameOfLifeJs.ComponentFactory = ComponentFactory;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var ControlPanel = (function () {
        function ControlPanel() {
        }
        ControlPanel.prototype.initialize = function (options) {
            var controlPanel = new GameOfLifeJs.View.ControlPanelView(options);
            $(options.container).append(controlPanel.render().el);
        };
        return ControlPanel;
    }());
    GameOfLifeJs.ControlPanel = ControlPanel;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var GameBoard = (function () {
        function GameBoard() {
        }
        GameBoard.prototype.initialize = function (options) {
            var gameOfLife = new GameOfLifeJs.View.GameGridView(options);
            $(options.container).append(gameOfLife.render().el);
        };
        return GameBoard;
    }());
    GameOfLifeJs.GameBoard = GameBoard;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Model;
    (function (Model) {
        var Pattern = (function (_super) {
            __extends(Pattern, _super);
            function Pattern(options) {
                _super.call(this, options);
            }
            Pattern.prototype.defaults = function () {
                return {
                    id: '',
                    name: '',
                    data: []
                };
            };
            Pattern.prototype.initialize = function () {
                if (!this.get('id')) {
                    this.set({ 'id': this.defaults().id });
                }
                if (!this.get('name')) {
                    this.set({ 'name': this.defaults().name });
                }
                if (!this.get('data')) {
                    this.set({ 'data': this.defaults().data });
                }
            };
            return Pattern;
        }(Backbone.Model));
        Model.Pattern = Pattern;
    })(Model = GameOfLifeJs.Model || (GameOfLifeJs.Model = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Model;
    (function (Model) {
        var Rule = (function (_super) {
            __extends(Rule, _super);
            function Rule(options) {
                _super.call(this);
                this.survival = options.survival;
                this.birth = options.birth;
            }
            Rule.prototype.defaults = function () {
                return {
                    survival: [],
                    birth: []
                };
            };
            Rule.prototype.initialize = function () {
                if (!this.get('survival')) {
                    this.set({ 'survival': this.defaults().survival });
                }
                if (!this.get('birth')) {
                    this.set({ 'birth': this.defaults().birth });
                }
            };
            return Rule;
        }(Backbone.Model));
        Model.Rule = Rule;
    })(Model = GameOfLifeJs.Model || (GameOfLifeJs.Model = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Model;
    (function (Model) {
        var Cell = (function (_super) {
            __extends(Cell, _super);
            function Cell(options) {
                _super.call(this, options);
                this.column = options.column;
                this.row = options.row;
            }
            Cell.prototype.defaults = function () {
                return {
                    alive: false,
                    nextState: false,
                    column: 0,
                    row: 0
                };
            };
            Cell.prototype.initialize = function () {
                if (!this.get('alive')) {
                    this.set({ 'alive': this.defaults().alive });
                }
                if (!this.get('column')) {
                    this.set({ 'column': this.defaults().column });
                }
                if (!this.get('row')) {
                    this.set({ 'row': this.defaults().row });
                }
                if (!this.get('nextState')) {
                    this.set({ 'nextState': this.defaults().nextState });
                }
                BackBoneEvents.on("GameGridView:redraw", this.regenerate, this);
            };
            Cell.prototype.applyRule = function (rule, neighbours) {
                if (this.get("alive")) {
                    this.set("nextState", this.checkSurvivalStatus(rule, neighbours));
                }
                else {
                    this.set("nextState", this.checkBirthStatus(rule, neighbours));
                }
            };
            Cell.prototype.clear = function () {
                this.alive = false;
            };
            Cell.prototype.setAlive = function (isAlive) {
                this.set("alive", isAlive);
            };
            Cell.prototype.regenerate = function () {
                this.set("alive", this.get("nextState"));
                this.set("nextState", false);
            };
            Cell.prototype.checkSurvivalStatus = function (rule, neighbours) {
                var status = [];
                _.each(rule.survival, function (ruleCount) {
                    if (neighbours === ruleCount) {
                        status.push(true);
                    }
                });
                return status.length > 0;
            };
            Cell.prototype.checkBirthStatus = function (rule, neighbours) {
                var status = [];
                _.each(rule.birth, function (ruleCount) {
                    if (neighbours === ruleCount) {
                        status.push(true);
                    }
                });
                return status.length > 0;
            };
            return Cell;
        }(Backbone.Model));
        Model.Cell = Cell;
    })(Model = GameOfLifeJs.Model || (GameOfLifeJs.Model = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var Timer = (function () {
        function Timer() {
        }
        Timer.prototype.defaults = function () {
        };
        Timer.prototype.initialize = function () {
            this.tick = 2000;
        };
        Timer.prototype.start = function () {
            if (!this.timer) {
                this.timer = window.setInterval(this.onTick, this.tick);
            }
        };
        Timer.prototype.stop = function () {
            if (this.timer) {
                this.timer = clearInterval(this.timer);
            }
        };
        Timer.prototype.changeSpeed = function (newSpeed) {
            this.tick = newSpeed;
            if (this.timer) {
                this.stop();
                this.start();
            }
        };
        Timer.prototype.onTick = function () {
            BackBoneEvents.trigger("Timer:tick");
        };
        return Timer;
    }());
    GameOfLifeJs.Timer = Timer;
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var View;
    (function (View) {
        var CellsRowView = (function (_super) {
            __extends(CellsRowView, _super);
            function CellsRowView() {
                _super.call(this, { tagName: 'div' });
            }
            CellsRowView.prototype.initialize = function () {
            };
            CellsRowView.prototype.render = function () {
                this.$el.addClass("RowX");
                return this;
            };
            return CellsRowView;
        }(Backbone.View));
        View.CellsRowView = CellsRowView;
    })(View = GameOfLifeJs.View || (GameOfLifeJs.View = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var View;
    (function (View) {
        var CellView = (function (_super) {
            __extends(CellView, _super);
            function CellView(options) {
                _super.call(this, options);
            }
            CellView.prototype.initialize = function () {
                this.model.on("change:alive", this.render, this);
            };
            CellView.prototype.render = function () {
                (this.model.get("alive")) ? this.$el.addClass("alive") : this.$el.removeClass("alive");
                return this;
            };
            return CellView;
        }(Backbone.View));
        View.CellView = CellView;
    })(View = GameOfLifeJs.View || (GameOfLifeJs.View = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var View;
    (function (View) {
        var ControlPanelView = (function (_super) {
            __extends(ControlPanelView, _super);
            function ControlPanelView(options) {
                if (!options)
                    options = {};
                options.tagName = 'div';
                options.role = 'form';
                options.events = {
                    "click #btnStart": "onStart",
                    "click #btnStop": "onStop"
                };
                _super.call(this, options);
            }
            ControlPanelView.prototype.initialize = function (options) {
                this.dm = options.dataManager;
                this.options = options;
                this.template = _.template('<fieldset><div class="form-group"><label>Select Life Pattern</label><div id="selectPattern"></div></div><div class="checkbox"><label><input type="checkbox">Disabled Checkbox</label></div><button type="submit" id="btnStart" class="btn btn-primary">Start</button><button type="submit" id="btnStop" class="btn btn-primary">Stop</button></fieldset>');
                BackBoneEvents.on("PatternItemView:patternSelected", this.onPatternSelected, this);
            };
            ControlPanelView.prototype.render = function () {
                var _this = this;
                if (this.dm) {
                    this.dm.getPatternService().getPatterns().done(function (data) {
                        _this.options.patterns = new GameOfLifeJs.Collection.PatternCollection(data);
                        if (_this.options.patterns && _this.options.patterns.length > 0) {
                            _this.patternSelecion = new View.PatternListView({ models: _this.options.patterns.models });
                            _this.$el.html(_this.template());
                            _this.$("#selectPattern").append(_this.patternSelecion.render().el);
                            BackBoneEvents.trigger("ControlPanel:patternChange", _this.options.patterns.models[0]);
                            return _this;
                        }
                    }).fail(function (error) {
                        console.log("pull rule from server failed");
                    });
                }
                return this;
            };
            ControlPanelView.prototype.onStart = function () {
                BackBoneEvents.trigger("ControlPanel:start");
            };
            ControlPanelView.prototype.onStop = function () {
                BackBoneEvents.trigger("ControlPanel:stop");
            };
            ControlPanelView.prototype.onPatternSelected = function (pattern) {
                BackBoneEvents.trigger("ControlPanel:patternChange", pattern);
            };
            ControlPanelView.prototype.clear = function () {
                BackBoneEvents.trigger("ControlPanel:clear");
            };
            ControlPanelView.prototype.randomize = function () {
                BackBoneEvents.trigger("ControlPanel:randomize");
            };
            return ControlPanelView;
        }(Backbone.View));
        View.ControlPanelView = ControlPanelView;
    })(View = GameOfLifeJs.View || (GameOfLifeJs.View = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var View;
    (function (View) {
        var GameGridView = (function (_super) {
            __extends(GameGridView, _super);
            function GameGridView(options) {
                if (!options)
                    options = {};
                options.tagName = 'div';
                options.className = 'gridView';
                _super.call(this, options);
                this.dm = options.dataManager;
                //this.rule = new Model.Rule({ survival: [2, 3], birth: [3] });
            }
            GameGridView.prototype.initialize = function (options) {
                if (options) {
                    this.width = options.width;
                    this.height = options.height;
                }
                this.collection = this.generateCollection();
                this.timer = new GameOfLifeJs.Timer();
                BackBoneEvents.on("Timer:tick", this.redrawGridView, this);
                BackBoneEvents.on("ControlPanel:start", this.start, this);
                BackBoneEvents.on("ControlPanel:stop", this.stop, this);
                BackBoneEvents.on('ControlPanel:patternChange', this.applyPattern, this);
            };
            GameGridView.prototype.render = function () {
                var _this = this;
                if (this.dm) {
                    this.dm.getRuleService().getRule().done(function (data) {
                        _this.rule = new GameOfLifeJs.Model.Rule(data);
                        var count = 1;
                        var rowViewEl = new View.CellsRowView().render().el;
                        _this.$el.append(rowViewEl);
                        _this.collection.each(function (cell) {
                            var cellView = new View.CellView({ model: cell, className: 'cell' });
                            $(rowViewEl).append(cellView.render().el);
                            if (count % this.width === 0) {
                                rowViewEl = new View.CellsRowView().render().el;
                                this.$el.append(rowViewEl);
                            }
                            count++;
                        }, _this);
                        return _this;
                    }).fail(function (error) {
                        console.log("pull rule from server failed");
                    });
                }
                return this;
            };
            GameGridView.prototype.applyPattern = function (pattern) {
                this.collection.setParren(pattern, this.width, this.height);
                BackBoneEvents.trigger("GameGridView:patternChange");
            };
            GameGridView.prototype.redrawGridView = function () {
                if (this.rule && this.collection.length > 0) {
                    this.collection.each(function (cell) {
                        cell.applyRule(this.rule, this.collection.getLiveNeighbours(cell, this.width, this.height));
                    }, this);
                    BackBoneEvents.trigger("GameGridView:redraw");
                }
            };
            GameGridView.prototype.clear = function () {
                this.collection.clear();
            };
            GameGridView.prototype.randomize = function () {
                this.collection.randomize();
            };
            GameGridView.prototype.generateCollection = function () {
                var strValues = '';
                var cellCollection = new GameOfLifeJs.Collection.CellCollection();
                for (var i = 0; i < this.height; i++) {
                    for (var j = 0; j < this.width; j++) {
                        cellCollection.add(new GameOfLifeJs.Model.Cell({
                            column: j,
                            row: i,
                            alive: false,
                            nextState: false
                        }));
                    }
                }
                return cellCollection;
            };
            GameGridView.prototype.start = function () {
                this.timer.start();
            };
            GameGridView.prototype.stop = function () {
                this.timer.stop();
            };
            return GameGridView;
        }(Backbone.View));
        View.GameGridView = GameGridView;
    })(View = GameOfLifeJs.View || (GameOfLifeJs.View = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
var GameOfLifeJs;
(function (GameOfLifeJs) {
    var View;
    (function (View) {
        var PatternItemView = (function (_super) {
            __extends(PatternItemView, _super);
            function PatternItemView(options) {
                options.tagName = 'option';
                options.events = {
                    'click': "itemClicked"
                };
                _super.call(this, options);
                this.options = options;
            }
            PatternItemView.prototype.render = function () {
                this.$el.attr('value', this.options.model.get('name'));
                this.$el.append(this.model.get('name'));
                return this;
            };
            PatternItemView.prototype.itemClicked = function () {
                BackBoneEvents.trigger('PatternItemView:patternSelected', this.model);
            };
            return PatternItemView;
        }(Backbone.View));
        View.PatternItemView = PatternItemView;
        var PatternListView = (function (_super) {
            __extends(PatternListView, _super);
            function PatternListView(options) {
                options.tagName = 'select';
                options.id = 'patternDropDown';
                options.className = 'form-control';
                _super.call(this, options);
            }
            PatternListView.prototype.initialize = function (options) {
                this.collection = new GameOfLifeJs.Collection.PatternCollection(options.models);
            };
            PatternListView.prototype.render = function () {
                _.each(this.collection.models, function (item) {
                    this.$el.append(new PatternItemView({ model: item }).render().el);
                }, this);
                return this;
            };
            return PatternListView;
        }(Backbone.View));
        View.PatternListView = PatternListView;
    })(View = GameOfLifeJs.View || (GameOfLifeJs.View = {}));
})(GameOfLifeJs || (GameOfLifeJs = {}));
//# sourceMappingURL=gameoflife.js.map