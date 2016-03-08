define(["marionette",
        "underscore",
        "baseItemView",
        "hbs/handlebars",
        "hbs!/js/app/templates/modules/renderModuleFormAfterSelectModuleType"],
    function (Marionette, _, BaseItemView, Handlebars, RenderModuleFormTemplate) {
        "use strict";

        var RenderFormView = BaseItemView.extend({
            
            template: RenderModuleFormTemplate,
            
            initialize: function (params) {
                
                BaseItemView.prototype.initialize.apply(this, arguments);
                
                if (!params || !params.options) {
                    return;
                }
                
                this.data.options = params.options.toJSON();
                this.data.uniqueId = params.uniqueId;
                
                this.render();
            }
        });

        return RenderFormView;
    });