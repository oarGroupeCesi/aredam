define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "views/behaviors/navigationBehavior",
        "baseItemView",
        "hbs!/js/app/templates/header"],
    function (Backbone, Marionette, $, _, NavigationBehavior, BaseItemView, HeaderTemplate) {
        
        "use strict";
        
        var HeaderView = BaseItemView.extend({
            name: 'maderaHeader',
            template: HeaderTemplate,

            behaviors: {
                NavigationBehavior: {
                    behaviorClass: NavigationBehavior
                }
            },

            events : {
                'click #nav-expander' : 'expandedNavbar',
                'click #nav-close'    : 'closedNavbar'
            },

            initialize : function() {                                           
                var that = this;

                BaseItemView.prototype.initialize.apply(this, arguments);

                this.render();
            },

            onRender: function () {
                this.initNavigation();
            },

            initNavigation : function() {
                var options = {
                    navId : "#main-menu-navigate"
                };

                this.trigger("NavigationBehavior:initNavigation", options);
            },

            expandedNavbar : function(e) {
                e.preventDefault();
                $('body').toggleClass('nav-expanded');
            },

            closedNavbar : function(e) {
                e.preventDefault();
                $('body').removeClass('nav-expanded');
            }
            
        });

        return HeaderView;
    });