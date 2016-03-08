define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "collections/projects",
        "hbs!/js/app/templates/home"],
        function (Backbone, Marionette, $, _, BaseItemView, ProjectsCollection, HomeTemplate) {

            "use strict";

            var HomeView = BaseItemView.extend({
                template: HomeTemplate,
                
                events: {
                    'click #create_project': 'navigateToCreateProjectView'
                },

                initialize: function (params) {
                    var that = this;

                    BaseItemView.prototype.initialize.apply(this, arguments);

                    this.projects = (params.projects) ? params.projects : {};

                    this.render();
                },

                onBeforeRender : function () {
                    this.data.projects = this.projects.toJSON();
                },

                navigateToCreateProjectView : function (e) {
                    e.preventDefault();                    
                    Backbone.history.navigate('/projects/create', {trigger:true});
                }
            });

            return HomeView;
        });
