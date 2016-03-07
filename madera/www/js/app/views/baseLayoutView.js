define(["marionette",
        "underscore"],
    function (Marionette, _) {
        "use strict";

        var BaseLayoutView = Marionette.LayoutView.extend({
            initialize : function() {
              this.data = {};
            },

            show: function () {
                this.$el.show();
            },

            hide: function () {
                this.$el.hide();
            },

            serializeData: function () {
                var viewData = {data: this.data};
                return _.extend(viewData, Marionette.LayoutView.prototype.serializeData.apply(this, arguments));
            }
        });

        return BaseLayoutView;
    });