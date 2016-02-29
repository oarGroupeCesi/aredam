define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/projects",
        "models/project"],
    function (Marionette, _, Radio, ProjectsCollection, ProjectModel) {
        "use strict";

        var ProjectObject = Marionette.Object.extend({
            projectId : null,

            initialize : function () {
                this.channel = Radio.channel('Projects');
                
                this.channel.reply('getProjects', this.getProjects);
                this.channel.reply('saveProject', this.saveProject);
            },

            getProjects : function () {
                var projects = new ProjectsCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return projects.fetch();
            },

            saveProject : function (data) {
                var projectModel = new ProjectModel(data);
                
                if (!data) {
                    return;
                }
                
                App.trigger('ajax:setTokenHeaders');
                
                return projectModel.save();
            }
        });

        return ProjectObject;
    });
