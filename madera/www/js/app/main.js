require.config({
    baseUrl: 'js/app',
    paths: {
        "jquery": "/js/vendor/jquery/jquery-2.1.4.min",
        "underscore": "/js/vendor/underscore/underscore-min",
        "backbone": "/js/vendor/backbone/backbone-min",
        "backbone.radio": "/js/vendor/backbone.radio/backbone.radio",
        "marionette" : "/js/vendor/marionette/backbone.marionette",
        "hbs": "/js/vendor/require/plugins/require-handlebars-plugin/hbs",
        "text": "/js/vendor/require/plugins/text/text",
        "baseLayoutView" : "/js/app/views/baseLayoutView",
        "baseItemView" : "/js/app/views/baseItemView",
        "bootstrap" : "/js/vendor/bootstrap/bootstrap.min",
        "helpers" : "/js/app/libs/helpers",
        "jquery.validate" : "/js/vendor/jquery/plugins/validate/jquery.validate",
        "jquery.navgoco" : "/js/vendor/jquery/plugins/nav/jquery.navgoco",
        "moment" : "/js/vendor/momentjs/moment",
        "tooltip" : "/js/vendor/bootstrap/tooltip/tooltip"
    },
    hbs: {
        "templateExtension": "hbs",
        "hbs/underscore": "underscore"
    },
    shim: {
        "backbone": {
            "deps": ["underscore", "jquery"],
            "exports": "Backbone"
        },
        "marionette" : {
            "deps": ["backbone"],
            "exports":"Marionette"
        }
    }
});

require([ 'app' ], function(App) {
  App.initialize();
});