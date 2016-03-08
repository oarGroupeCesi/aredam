define(["backbone",
        "backbone.radio",
        "marionette",
        "jquery",
        "collections/ranges",
        "collections/modulesNatures",
        "controllers/objects/projectsObject",
        "controllers/objects/customersObject",
        "controllers/objects/productsObject",
        "controllers/objects/rangesObject",
        "controllers/objects/modulesObject",
        "controllers/objects/modulesNaturesObject",
        "views/projects/projectWrapperLayoutView",
        "views/projects/createProjectView",
        "views/projects/headerProjectView",
        "views/projects/footerProjectView",
        "views/products/createProductView",
        "views/modules/createModuleView"],
    function (Backbone, Radio, Marionette, $, RangesCollection, ModulesNaturesCollection, 
            ProjectsObject, CustomersObject, ProductsObject, RangesObject, ModulesObject, ModulesNaturesObject, 
            ProjectWrapperLayoutView, CreateProjectView, HeaderProjectView, FooterProjectView, CreateProductView, CreateModuleView) {
        "use strict";

        var ProjectsController = Marionette.Controller.extend({
            
            addProject : function () {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'creationProjet']);
            
                this.initProject({
                    step : "step1"
                });
            },

            viewProject : function (projectId) {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'vueProjet']);
            
                this.projectId = projectId;

                App.views.viewProjectView = new ViewProjectView();
                App.views.appLayoutView.getRegion('content').show(App.views.viewProjectView);
            },


            addProductsToProject : function (projectId) {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'creationProduits']);
            
                this.projectId = projectId;

                this.initProject({
                    step : "step2"
                });
            },

            addModulesToProject : function (projectId) {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'creationModules']);
            
                this.projectId = projectId;

                this.initProject({
                    step : "step3"
                });
            },

            previewCustomerProject : function(projectId) {
                App.views.appLayoutView.setBodyClass(['headerEdition', 'apercuProjetFini']);
            
                this.projectId = projectId;

                this.initProject({
                    step : "step4"
                });
            },

            initLayoutAndInitObject : function() {
                App.views.projectWrapperLayoutView = new ProjectWrapperLayoutView();
                App.views.appLayoutView.getRegion('content').show(App.views.projectWrapperLayoutView);

                this.projectsObject = new ProjectsObject();
                this.customersObject = new CustomersObject();
                this.productsObject = new ProductsObject();
                this.rangesObject = new RangesObject();
                this.modulesObject = new ModulesObject();
                this.modulesNaturesObject = new ModulesNaturesObject();
            },

            initProject : function (options) {
                this.initLayoutAndInitObject();

                if (options.step) {
                    switch(options.step) {
                        case 'step1' : {

                            App.views.headerProjectView = new HeaderProjectView({
                                'title' : 'Etape 1 : Identification du projet'
                            });
                            App.views.projectWrapperLayoutView.getRegion('projectHeader').show(App.views.headerProjectView);
                            App.views.stepView = new CreateProjectView();                            
                            App.views.projectWrapperLayoutView.getRegion('projectContent').show(App.views.stepView);
                            App.views.footerProjectView = new FooterProjectView({
                                'content' : 'Footer du projet : projet'
                            });
                            App.views.projectWrapperLayoutView.getRegion('projectFooter').show(App.views.footerProjectView);
                            
                            break;
                        }
                        
                        case 'step2' : {
                            var that = this;

                            this.rangeChannel = Radio.channel('Ranges');
                            this.rangeChannel
                                .request('getRanges')
                                .then(function (rangesCollection){
                                    that.rangesCollection = new RangesCollection(rangesCollection);
                                    
                                    App.views.headerProjectView = new HeaderProjectView({
                                        'title' : 'Etape 2 : Conception de produit(s)'
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectHeader').show(App.views.headerProjectView);
                                    App.views.stepView = new CreateProductView({
                                        'projectId' : that.projectId,
                                        'templateRanges' : that.rangesCollection.getTemplateRanges()
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectContent').show(App.views.stepView);
                                    App.views.footerProjectView = new FooterProjectView({
                                        'content' : 'Footer du projet : produits'
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectFooter').show(App.views.footerProjectView);

                                });

                            break;
                        }

                        case 'step3' : {
                            var that = this;

                            this.modulesNaturesChannel = Radio.channel('ModulesNatures');
                            this.modulesNaturesChannel
                                .request('getModulesNatures')
                                .then(function (modulesNatures){
                                    that.modulesNaturesCollection = new ModulesNaturesCollection(modulesNatures);
                                    
                                    App.views.headerProjectView = new HeaderProjectView({
                                        'title' : 'Etape 3 : Conception de module(s)'
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectHeader').show(App.views.headerProjectView);
                                    App.views.stepView = new CreateModuleView({
                                        'projectId' : that.projectId,
                                        'modulesNatures' : that.modulesNaturesCollection
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectContent').show(App.views.stepView);
                                    App.views.footerProjectView = new FooterProjectView({
                                        'content' : 'Footer du projet : modules'
                                    });
                                    App.views.projectWrapperLayoutView.getRegion('projectFooter').show(App.views.footerProjectView);

                                });

                            break;
                        }

                        case 'step4' : {
                            var that = this;


                            break;
                        }

                        default:
                            break;
                    }
                }
                
            }
        });

        return ProjectsController;
    });
