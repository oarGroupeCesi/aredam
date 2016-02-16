define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "hbs!/js/app/templates/home"],
        function (Backbone, Marionette, $, _, BaseItemView, HomeTemplate) {

            "use strict";

            var HomeView = BaseItemView.extend({
                template: HomeTemplate,
                events: {
                    'click .blocBtnCas': 'launchCreateClinicalCaseModal'
                },
                initialize: function () {
                    this.createClinicalCaseModal = null;
                }
            });

            return HomeView;
        });
