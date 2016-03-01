define(["marionette",
        "jquery",
        "jquery.navgoco"],
        function (Marionette, $, JqueryNavigate) {
            "use strict";

            var NavigationBehavior = Marionette.Behavior.extend({
                initialize: function () {
                    this.view.on("NavigationBehavior:initNavigation", this.initNavigation, this);
                },

                initNavigation: function (params) {
                    this.setDefaults();
                    $(params.navId).navgoco();
                },

                setDefaults : function () {
                    $.fn.navgoco.defaults = {
                        caret: '<span class="caret"></span>',
                        accordion: false,
                        openClass: 'open',
                        save: true,
                        cookie: {
                        name: 'navgoco',
                        expires: false,
                        path: '/'
                        },
                        slide: {
                            duration: 300,
                            easing: 'swing'
                        }
                    };
                }
                
            });

            return NavigationBehavior;
        });
