define(["marionette",
        "jquery",
        "controllers/objects/projectsObject",
        "controllers/objects/customersObject",
        "views/projects/projectWrapperLayoutView",
        "views/projects/createProjectView",
        "views/projects/headerProjectView",
        "views/projects/footerProjectView",
        "views/projects/homeView"],
    function (Marionette, $, ProjectsObject, CustomersObject, 
            ProjectWrapperLayoutView, CreateProjectView, HeaderProjectView, FooterProjectView, HomeView) {
        "use strict";

        var ProjectsController = Marionette.Controller.extend({
            projectId: null,
            
            addProject : function () {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'creationProjet']);
            
                this.initProject({
                    step : "step1",
                    showAddButton : true
                });
            },

            addProductsToProject : function () {
                
            },

            initLayoutAndInitObject : function(showAddButton) {
                App.views.projectWrapperLayoutView = new ProjectWrapperLayoutView();
                App.views.appLayoutView.getRegion('content').show(App.views.projectWrapperLayoutView);

                this.projectsObject = new ProjectsObject();
                this.customersObject = new CustomersObject();
            },

            initProject : function (options) {
                this.initLayoutAndInitObject(options.showAddButton);
                
                if (options.step) {
                    switch(options.step) {
                        case 'step1' : {

                            App.views.headerProjectView = new HeaderProjectView({
                                'title' : 'Etape 1 : Identification du projet'
                            });
                            App.views.projectWrapperLayoutView.getRegion('projectHeader').show(App.views.headerProjectView);

                            App.views.stepView = new CreateProjectView();
                            App.views.stepView.on('CreateProjectView:ProjectsController:saveProject', this.saveProject);
                            
                            App.views.projectWrapperLayoutView.getRegion('projectContent').show(App.views.stepView);

                            App.views.footerProjectView = new FooterProjectView({
                                'content' : 'Footer du projet'
                            });
                            App.views.projectWrapperLayoutView.getRegion('projectFooter').show(App.views.footerProjectView);
                            
                            break;
                        }
                        
                        default:
                            break;
                    }
                }
                
            },

            saveProject : function (data) {
                console.log('saveProject');
                console.log(data);

                var projectsObject = new ProjectsObject();
                projectsObject.saveProject(data);
            }
        });

        return ProjectsController;
    });
