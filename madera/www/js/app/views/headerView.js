define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "hbs!/js/app/templates/header"],
    function (Backbone, Marionette, $, _, BaseItemView, HeaderTemplate) {
        
        "use strict";
        
        var HeaderView = BaseItemView.extend({
            template: HeaderTemplate
            
        });

        return HeaderView;
    });
