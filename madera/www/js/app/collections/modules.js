define(["backbone",
        "models/module"],
    function (Backbone, ModuleModel) {
        "use strict";

        var ModulesCollection = Backbone.Collection.extend({
            model: ModuleModel,
            url: function () {
                return "module";
            }
        });

        return ModulesCollection;
    });
