define(["backbone",
        "marionette",
        "jquery",
        "/js/app/views/loginView.js"],
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
                    url: App.API_URL + "login",
                    dataType: 'json',
                    method: "POST",
                    data: data
                }).done(function (response) {
                    var token = JSON.stringify(response.token).replace(/"/g, '');
                    localStorage.setItem("token", token);
                    App.views.loginView.trigger("usersController:validLogin");
                }).fail(function (response) {
                    App.views.loginView.trigger("usersController:errorLogin", response.responseJSON.message);
                });
            },
            checkLogin: function () {
                var token = localStorage.getItem('token');
                if(token) {
                    Backbone.history.navigate("home", {trigger: true});
                } else {
                    Backbone.history.navigate("", {trigger: true});
                }
                /*if (Backbone.history.fragment !== "") {
                    if (token) {
                        $.ajax('/api/users/check_session').error(function (data) {
                            localStorage.removeItem('token');
                            Backbone.history.navigate("", {trigger: true});
                        });
                    } else {
                        Backbone.history.navigate("", {trigger: true});
                    }
                } else if (token) {
                    $.ajax('/api/users/check_session').success(function (data) {
                        Backbone.history.navigate("home", {trigger: true});
                    }).error(function(data){
                        localStorage.removeItem('token');
                    });
                }*/
            }
        });

        return UsersController;
    });
