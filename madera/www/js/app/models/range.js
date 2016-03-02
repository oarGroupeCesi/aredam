/*global define*/
define(["backbone"],
    function (Backbone) {
        "use strict";

        var Range = Backbone.Model.extend({
            defaults : {
                "name" : null,
                "exterior_finish" : null,
                "insulating" : null,
                "top" : null,
                "configuration" : null,
                "template" : null
            },
            urlRoot: "range"
        });

        return Range;
    });
