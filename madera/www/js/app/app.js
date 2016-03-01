define([
    'backbone',
    'underscore',
    'marionette',
    'controllers/usersController',
    'controllers/pagesController',
    'controllers/projectsController',
    'views/headerView',
    'views/appLayoutView'
], function (Backbone, _, Marionette,
             UsersController, PagesController, ProjectsController, 
             HeaderView, AppLayoutView) {
    "use strict";

    var initialize = function initialize() {
        window.App = (window.App) || new Marionette.Application();

        App.addRegions({
            "mainRegion": "#main-wrapper"
        });
        
        App.API_URL = "http://madera.api-local.dev:31/api/";

        // Cache Backbone.sync for later use
        var sync = Backbone.sync;
        Backbone.sync = function(method, model, options){
            options.beforeSend = function(){
                this.url = App.API_URL + this.url;
            };
            return sync.call(this, method, model, options);
        };

        App.check_session = false;

        App.controllers = {};
        App.views = {};
        
        App.controllers.usersController = new UsersController();
        App.controllers.pagesController = new PagesController();
        App.controllers.projectsController = new ProjectsController();

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

            App.router.processAppRoutes(App.controllers.projectsController, {
                "projects/create" : "addProject",
                "projects/edit/:projectId/products/add/step1" : "addProductsToProject"
            });

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
            var token = localStorage.getItem('token');
            if (token) {
                $.ajaxSetup({
                    // Enables cross domain requests
                    crossDomain: true,
                    // Helps in setting cookie
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json",
                        "Authorization" : "Bearer " + token
                    }
                });
            }
        });

        App.start();
        
    };

    return {
        initialize: initialize
    };
});