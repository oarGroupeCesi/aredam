define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/ranges",
        "models/range"],
    function (Marionette, _, Radio, RangesCollection, RangeModel) {
        "use strict";

        var RangeObject = Marionette.Object.extend({
            productId : null,

            initialize : function () {
                this.channel = Radio.channel('Ranges');
                
                this.channel.reply('getRanges', this.getRanges);
                this.channel.reply('getRange', this.getRange);
                this.channel.reply('saveRange', this.saveRange);
            },

            getRanges : function () {
                var ranges = new RangesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return ranges.fetch();
            },

            getRange : function (rangeId) {
                var ranges = new RangesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return ranges.fetch({
                    'id' : rangeId
                });
            },

            saveRange : function (data) {
                var rangeModel = new RangeModel(data);
                
                if (!data) {
                    return;
                }
                
                App.trigger('ajax:setTokenHeaders');
                
                return rangeModel.save();
            }
        });

        return RangeObject;
    });
