define(["marionette",
        "jquery",
        "/js/app/views/homeView.js"],
    function (Marionette, $, HomeView) {
        "use strict";

        var PagesController = Marionette.Controller.extend({
            index : function () {
                App.views.appLayoutView.setBodyClass(['home']);
                App.views.homeView = new HomeView();
                App.views.appLayoutView.getRegion('content').show(App.views.homeView);
            }
        });

        return PagesController;
    });
