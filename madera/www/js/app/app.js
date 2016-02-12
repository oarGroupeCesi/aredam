/*global requirejs, require, window, App*/
/*jslint unparam: true*/
define([
    'backbone',
    'underscore',
    'marionette',
    'views/headerView',
    'views/appLayoutView'
], function (Backbone, _, Marionette,
             HeaderView, AppLayoutView) {
    "use strict";

    var initialize = function initialize() {
        window.App = (window.App) || new Marionette.Application();

        App.addRegions({
            "mainRegion": "#main-wrapper"
        });
        
        App.controllers = {};
        App.views = {};
        
        App.views.appLayoutView = new AppLayoutView();
        App.mainRegion.show(App.views.appLayoutView);
        
        App.router = new Marionette.AppRouter();
        

        App.on("start", function() {
            App.views.appLayoutView.getRegion('header').show(new HeaderView());
            
            this.initialized = false;
            
            if (Backbone.history) {
                Backbone.history.start();
                App.trigger("backbone:history:start");
                
                this.initialized = true;
            }
        });

        App.start();
        
    };

    return {
        initialize: initialize
    };
});