/*global define, sessionStorage, window, App*/
define(["marionette",
        "underscore",
        "baseItemView",
        "hbs/handlebars",
        "hbs!/js/app/templates/elements_html/list-group-collapse/collapse"],
    function (Marionette, _, BaseItemView, Handlebars, CollapseTemplate) {
        "use strict";

        var SelectItemView = BaseItemView.extend({
            
            template: CollapseTemplate,
            
            initialize: function (params) {
                
                BaseItemView.prototype.initialize.apply(this, arguments);
                
                if (!params || !params.options) {
                    return;
                }
                
                this.data.options = params.options.toJSON();
                this.data.id = params.collapseId || false;
                this.data.uniqueId = params.uniqueId;
                
                this.render();
            }
        });

        return SelectItemView;
    });