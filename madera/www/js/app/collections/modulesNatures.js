define(["backbone",
        "models/moduleNature"],
    function (Backbone, ModuleNatureModel) {
        "use strict";

        var ModuleNaturesCollection = Backbone.Collection.extend({
            model: ModuleNatureModel,
            url: function () {
                return "modulenature";
            }
        });

        return ModuleNaturesCollection;
    });
