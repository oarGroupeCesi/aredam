define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "views/projects/createProjectView",
        "hbs!/js/app/templates/projects/home"],
        function (Backbone, Marionette, $, _, BaseItemView, CreateProjectView, HomeTemplate) {

            "use strict";

            var HomeView = BaseItemView.extend({
                template: HomeTemplate,

                events: {
                    'click .blocBtnCas': 'launchCreateClinicalCaseModal'
                },

                initialize: function () {
                    this.createClinicalCaseModal = null;
                },

                launchCreateClinicalCaseModal: function () {
                    if (!this.createClinicalCaseModal) {
                        App.views.createProjectView = new CreateProjectView();
                        var options = {
                            "title": I18n.t("app.clinical_cases.creation_form.modal_title"),
                            "body": App.views.createProjectView,
                            "footer": new SaveClinicalCaseModalFooterView(),
                            "close": true,
                            "closeFooterButton" : false
                        };
                        this.createClinicalCaseModal = new ModalLayoutView(options);
                    }
                    this.createClinicalCaseModal.showModal();
                }
            });

            return HomeView;
        });
