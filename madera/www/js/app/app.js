define([
    'backbone',
    'underscore',
    'marionette',
    'controllers/usersController',
    'controllers/pagesController',
    'views/headerView',
    'views/appLayoutView'
], function (Backbone, _, Marionette,
             UsersController, PagesController,
             HeaderView, AppLayoutView) {
    "use strict";

    var initialize = function initialize() {
        window.App = (window.App) || new Marionette.Application();

        App.addRegions({
            "mainRegion": "#main-wrapper"
        });
        
        App.API_URL = "http://madera.api-local.dev:31/api/";
        App.check_session = false;

        App.controllers = {};
        App.views = {};
        
        App.controllers.usersController = new UsersController();
        App.controllers.pagesController = new PagesController();

        App.views.appLayoutView = new AppLayoutView();
        App.mainRegion.show(App.views.appLayoutView);
        
        App.router = new Marionette.AppRouter();
        

        App.on("start", function() {
            App.views.appLayoutView.getRegion('header').show(new HeaderView());
            
            this.initialized = false;
            
            App.router.processAppRoutes(App.controllers.usersController, {
                "": "index"
            });

            App.router.processAppRoutes(App.controllers.pagesController, {
                "home": "index"
            });

            App.router.onRoute = function (name, path, args) {
                if (App.initialized) {
                    App.controllers.usersController.trigger('App:usersController:checkLogin');
                }
            };

            if (Backbone.history) {
                Backbone.history.start();
                App.trigger("backbone:history:start");
                
                App.trigger('ajax:setTokenHeaders');
                
                var token = localStorage.getItem('token');
                
                if (token) {
                    App.check_session = true;
                    if(App.check_session) {
                        if (Backbone.history.fragment === "") {
                            Backbone.history.navigate("home", {trigger: true});
                        }
                    } else {
                        localStorage.removeItem('token');
                        Backbone.history.navigate("", {trigger: true});
                    }
                } else {
                    Backbone.history.navigate("", {trigger: true});
                }

                this.initialized = true;
            }
        });

        App.on('ajax:setTokenHeaders', function() {
            $.ajaxSetup({
                beforeSend: function (xhr)
                {
                    var token = localStorage.getItem('token');
                    if (token) {
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader("Authorization", "Bearer " + token);
                    }
                }
            });
        });

        App.start();
        
    };

    return {
        initialize: initialize
    };
});