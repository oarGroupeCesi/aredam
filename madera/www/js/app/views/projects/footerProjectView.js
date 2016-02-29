define(["marionette",
        "underscore",
        "baseItemView",
        "models/project",
        "hbs!/js/app/templates/projects/footerProject"],
    function (Marionette, _, BaseItemView, ProjectModel, FooterProjectTemplate) {
        "use strict";

        var FooterProjectView = BaseItemView.extend({
            name : "footerProject",
            template : FooterProjectTemplate,
            model : new ProjectModel(),

            initialize: function (options) {
                
                BaseItemView.prototype.initialize.apply(this, arguments);

                this.content = (options.content) ? options.content : null;
                
                if (!this.content) {
                    return false;
                }

                this.data = {
                    content : this.content
                };

                this.on('modelChanged', this.initProjectToView, this);
                this.initProjectToView();
            },

            initProjectToView : function () {
                var that = this;
                
                this.render();
            }
        });

        return FooterProjectView;
    });