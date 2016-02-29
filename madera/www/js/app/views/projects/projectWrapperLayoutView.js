define(["marionette",
        "hbs!/js/app/templates/projects/projectWrapper"],
    function (Marionette, ProjectWrapperTemplate) {
        "use strict";

        var ProjectWrapperLayout = Marionette.LayoutView.extend({
            name : 'projectWrapperLayout',
            
            template : ProjectWrapperTemplate,

            regions: {
                'projectHeader': "#projectHeaderRegion",
                'projectContent': "#projectContentRegion",
                'projectFooter': "#projectFooterRegion"
            }
        });

        return ProjectWrapperLayout;
    });
