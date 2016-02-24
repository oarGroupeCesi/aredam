define(["marionette",
        "underscore"],
        function (Marionette, _) {

            "use strict";

            var BaseItemView = Marionette.ItemView.extend({
                initialize: function () {
                    this.data = {};
                    App.trigger('ajax:setTokenHeaders');
                },

                show: function () {
                    this.$el.show();
                },

                hide: function () {
                    this.$el.hide();
                },

                serializeData: function () {
                    var viewData = {data: this.data};
                    return _.extend(viewData, Marionette.ItemView.prototype.serializeData.apply(this, arguments));
                }
            });

            return BaseItemView;
        });
