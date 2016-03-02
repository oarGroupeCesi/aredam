/*global define*/
define(["backbone",
        "models/range"],
    function (Backbone, RangeModel) {
        "use strict";

        var RangesCollection = Backbone.Collection.extend({
            model: RangeModel,
            url: function () {
                return "range";
            },

            getTemplateRanges : function() {
                var ranges = this.filter(function(range) {
                    return (range.get('template') == 1);
                });

                return (ranges.length) ? new Backbone.Collection(ranges) : false;
            }
        });

        return RangesCollection;
    });
