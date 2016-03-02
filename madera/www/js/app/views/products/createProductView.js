define(["backbone",
        "backbone.radio",
        "marionette",
        "jquery",
        "underscore",
        "baseLayoutView",
        "views/behaviors/validationBehavior",
        "views/elements_html/list-group-collapse/collapseView",
        "models/project",
        "models/product",
        "hbs!/js/app/templates/products/createProductForm"],
        function (Backbone, Radio, Marionette, $, _,  
                  BaseLayoutView, 
                  ValidationBehavior, CollapseView, 
                  ProjectModel, ProductModel, 
                  CreateProductFormTemplate) {
            "use strict";

            var CreateProductView = BaseLayoutView.extend({
                template: CreateProductFormTemplate,
                model : new ProjectModel(),
                
                behaviors: {
                    ValidationBehavior: {
                        behaviorClass: ValidationBehavior
                    }
                },

                regions : {
                    'activeCase' : '#rangePanel'
                },
                
                events : {
                    'change #templateRanges' : 'showCollapsableTab',
                    'submit form'            : 'handleProductSave'
                },
                
                initialize: function (options) {
                    var that = this;
                    
                    if(!options.templateRanges) {
                        return false;
                    }

                    BaseLayoutView.prototype.initialize.apply(this, arguments);

                    this.channel = Radio.channel('Projects');
                    this.productChannel = Radio.channel('Products');
                    
                    this.templateRanges = options.templateRanges;

                    this.render();
                },
                
                onBeforeRender : function () {
                    this.data.templateRanges = this.templateRanges.toJSON();
                },

                onShow : function () {
                    this.initFormValidation();
                },

                initFormValidation : function () {
                    this.trigger("ValidationBehavior:initFormValidation", {
                        formId : "#CreateProductForm",
                        ignoreTitle : true,
                        focusInvalid: true,
                        ignore: '.ignore',
                        rules: {

                        }
                    });
                },

                handleProductSave : function (e) {
                    $("#message").find('.alert').addClass("hide").empty();
                    
                    e.preventDefault();
                    
                },

                showCollapsableTab : function (e) {
                    e.preventDefault();

                    var rangeId = $(e.currentTarget).val(),
                        selectedRange;

                    selectedRange = this.templateRanges.findWhere({id:parseInt(rangeId)});

                    App.views.collapseView = new CollapseView({
                        options : selectedRange,
                        collapseId : "listGroupRangeCollapse"
                    });

                    this.getRegion("activeCase").show(App.views.collapseView);
                }
            });

            return CreateProductView;
        });
