define(["backbone"],
    function (Backbone) {
        "use strict";

        var Module = Backbone.Model.extend({
            defaults : {
                "name" : null,
                "height" : null,
                "width" : null,
                "quantity" : null,
                "modulenature_id" : null,
                "project_id" : null
            },
            urlRoot: "module",
            toJSON : function () {
                return JSON.parse(JSON.stringify(this.attributes));
            }
        });

        return Module;
    });