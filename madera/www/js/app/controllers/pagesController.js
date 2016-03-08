define(["backbone",
        "backbone.radio",
        "marionette",
        "jquery",
        "controllers/objects/projectsObject",
        "collections/projects",
        "views/homeView"],
    function (Backbone, Radio, Marionette, $, ProjectsObject, ProjectsCollection, HomeView) {
        "use strict";

        var PagesController = Marionette.Controller.extend({

            initialize : function () {
                this.projectsObject = new ProjectsObject();
                this.projectChannel = Radio.channel('Projects');
            },

            index : function () {
                var that = this;

                this.projectChannel
                    .request('getProjects')
                    .then(function (projectsCollection){
                        that.projectsCollection = new ProjectsCollection(projectsCollection);

                        App.views.appLayoutView.setBodyClass(['home']);
                        App.views.homeView = new HomeView({
                            projects : that.projectsCollection
                        });
                        App.views.appLayoutView.getRegion('content').show(App.views.homeView);
                    });
            }
        });

        return PagesController;
    });
