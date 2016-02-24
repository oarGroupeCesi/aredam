define(["backbone",
        "marionette",
        "jquery",
        "views/loginView"],
    function (Backbone, Marionette, $, LoginView) {
        "use strict";

        var UsersController = Marionette.Controller.extend({
            initialize: function () {
                this.on('App:usersController:checkLogin', this.checkLogin);
            },

            index: function () {
                App.views.loginView = new LoginView();
                App.views.loginView.on("loginView:usersController:login", this.login, this);

                App.views.appLayoutView.getRegion('content').show(App.views.loginView);
            },

            login: function (data) {
                var that = this;

                $.ajax({
                    url: App.API_URL + "auth/login",
                    dataType: 'json',
                    method: "POST",
                    data: data
                }).done(function (response) {
                    var token = JSON.stringify(response.token).replace(/"/g, '');
                    localStorage.setItem("token", token);
                    App.check_session = true;
                    App.views.loginView.trigger("usersController:validLogin");
                }).fail(function (response) {
                    App.views.loginView.trigger("usersController:errorLogin", response.responseJSON.message);
                });
            },

            checkLogin: function () {
                var token = localStorage.getItem('token');
                
                if (Backbone.history.fragment !== "") {
                    if (token) {
                        if(!App.check_session) {
                            localStorage.removeItem('token');
                            Backbone.history.navigate("", {trigger: true});
                        }
                    } else {
                        Backbone.history.navigate("", {trigger: true});
                    }
                } else if (token) {
                    if(App.check_session) {
                        Backbone.history.navigate("home", {trigger: true});
                    } else {
                        localStorage.removeItem('token');
                    }
                }
            }
        });

        return UsersController;
    });
