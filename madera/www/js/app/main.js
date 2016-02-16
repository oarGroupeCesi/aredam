require.config({
    waitSeconds: 0,
    baseUrl: 'js/app',
    paths: {
        "jquery": "../vendor/jquery/jquery-2.1.4.min",
        "underscore": "../vendor/underscore/underscore-min",
        "backbone": "../vendor/backbone/backbone-min",
        "marionette" : "../vendor/marionette/backbone.marionette",
        "hbs": "../vendor/require/plugins/require-handlebars-plugin/hbs",
        "text": "../vendor/require/plugins/text/text",
        "baseLayoutView" : "/js/app/views/baseLayoutView",
        "baseItemView" : "/js/app/views/baseItemView",
        "bootstrap" : "../vendor/bootstrap/bootstrap.min",
        "helpers" : "/js/app/libs/helpers",
        "jquery.validate" : "../vendor/jquery/plugins/validate/jquery.validate",
        "jquery.navgoco" : "../vendor/jquery/plugins/nav/jquery.navgoco"
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
