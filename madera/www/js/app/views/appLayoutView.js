define(["marionette",
        "baseLayoutView",
        "hbs!/js/app/templates/app"],
    function (Marionette, BaseLayoutView, AppTemplate) {
        "use strict";

        var AppLayoutView = BaseLayoutView.extend({
            template: AppTemplate,
            regions: {
                header  : "header.nav",
                content : "#content-wrapper"
            },

            initialize : function () {
            },
            
            setBodyClass : function (classArray) {
                if (classArray) {
                    $('body').removeAttr('class').addClass(classArray.join(' '));
                }
            }

        });

        return AppLayoutView;
    });
