define(["marionette",
        "underscore",
        "baseItemView",
        "models/project",
        "hbs!/js/app/templates/projects/headerProject"],
    function (Marionette, _, BaseItemView, ProjectModel, HeaderProjectTemplate) {
        "use strict";

        var HeaderProjectView = BaseItemView.extend({
            name : "headerProject",
            template : HeaderProjectTemplate,
            model : new ProjectModel(),

            initialize: function (options) {
                
                BaseItemView.prototype.initialize.apply(this, arguments);

                this.caseId = (options.caseId) ? parseInt(options.caseId) : null;
                this.consultationId = (options.consultationId) ? parseInt(options.consultationId) : null;
                this.title = (options.title) ? options.title : null;
                
                if (!this.title) {
                    return false;
                }

                this.data = {
                    title : this.title
                };

                this.on('modelChanged', this.initProjectToView, this);
                this.initProjectToView();
            },

            initProjectToView : function () {
                var that = this;
                
                this.render();
            }
        });

        return HeaderProjectView;
    });