define(["backbone",
        "backbone.radio",
        "marionette",
        "jquery",
        "underscore",
        "tooltip",
        "baseLayoutView",
        "views/behaviors/validationBehavior",
        "views/elements_html/list-group-collapse/collapseView",
        "models/project",
        "models/product",
        "models/range",
        "hbs!/js/app/templates/products/createProductForm"],
        function (Backbone, Radio, Marionette, $, _, tooltip, 
                  BaseLayoutView, 
                  ValidationBehavior, CollapseView, 
                  ProjectModel, ProductModel, RangeModel, 
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
                
                events : {
                    'change .templateRanges'    : 'showCollapsableTab',
                    'submit form'               : 'handleProductSave',
                    'click .toggleArrow'        : 'rotateArrow',
                    'mouseover .theTooltip'     : 'showTooltip',
                    'click #addAnotherProduct'  : 'addAnotherProduct',
                    'click .deleteProduct'      : 'deleteProduct'
                },
                
                initialize: function (options) {
                    var that = this;
                    
                    if(!options.templateRanges || !options.projectId) {
                        return false;
                    }

                    BaseLayoutView.prototype.initialize.apply(this, arguments);

                    this.channel = Radio.channel('Products');
                    this.rangeChannel = Radio.channel('Ranges');
                    
                    this.templateRanges = options.templateRanges;
                    this.projectId = options.projectId;

                    this.render();
                },
                
                onBeforeRender : function () {
                    this.data.templateRanges = this.templateRanges.toJSON();
                },

                onShow : function () {
                    this.initFormValidation();
                },

                showTooltip : function (e) {
                    $(e.currentTarget).tooltip();
                },

                initFormValidation : function () {
                    this.trigger("ValidationBehavior:initFormValidation", {
                        formId : "#CreateProductForm",
                        ignoreTitle : true,
                        focusInvalid: true,
                        ignore: '.ignore',
                        rules: {
                            'product_name': {
                                required: true
                            }
                        }
                    });
                },

                handleProductSave : function (e) {
                    $("#message").find('.alert').addClass("hide").empty();
                    
                    e.preventDefault();


                    var that = this,
                        $form = $(e.currentTarget),
                        datas = {
                            'dataProduct' : [],
                            'dataRange' : []
                        };

                    if ($form.valid()) {

                        $('#products .product-contain').each(function(index, divProduct) {

                            datas.dataProduct[index] = {
                                'name' : $(divProduct).find("input[name='product_name']").val(),
                                'project_id' : parseInt(that.projectId)
                            };

                            datas.dataRange[index] = {
                                'name' : $(divProduct).find("input[name='product_name']").val(),
                                'exterior_finish' : $(divProduct).find("select[name='exterior_finish']").val(),
                                'insulating' : $(divProduct).find("select[name='insulating']").val(),
                                'top' : $(divProduct).find("select[name='top']").val(),
                                'configuration' : $(divProduct).find("select[name='configuration']").val(),
                                'template' : 0
                            };

                        });
                        
                        $form.find('input, textarea, button, select').attr('disabled', 'disabled');
                        
                        $.each(datas.dataRange, function(i, dataRange){                        
                            that.rangeChannel
                                .request('saveRange', dataRange)
                                .then(function(rangeModel){
                                    that.rangeModel = new RangeModel(rangeModel);
                                    datas.dataProduct[i].range_id = parseInt(that.rangeModel.get('id'));

                                    that.channel
                                        .request('saveProduct', datas.dataProduct[i])
                                        .then(function(productModel){
                                            that.productModel = new ProductModel(productModel);
                                            Backbone.history.navigate("projects/edit/" + that.model.id + "/step2/modules/add", {trigger:true});
                                        },
                                        function(response){
                                            that.showErrorMessage($form, 'Erreur : ' + response.responseJSON);
                                        });
                                },
                                function(response){
                                    that.showErrorMessage($form, 'Erreur : ' + response.responseJSON);
                                });
                        });
                    }
                },

                addAnotherProduct : function (e) {
                    e.preventDefault();

                    if(!$('#products .product-contain:last-child').find('.panel-group').length) {
                        return false;
                    }
                    
                    var $productsContent = $('#products-hidden').html(),
                        $test = $($productsContent);

                    $('#products').append($productsContent);
                    $('#products').find('.product-label > .number').last().text($('#products .product-contain').length);
                    $('.rangePanel').last().empty();
                    $("body").animate({ scrollTop: $(document).height()}, 1600);
                },

                showCollapsableTab : function (e) {
                    e.preventDefault();

                    var rangeId = $(e.currentTarget).val(),
                        selectedRange,
                        rangePanelId = 'range_' + this.uniqueId();

                    selectedRange = this.templateRanges.findWhere({id:parseInt(rangeId)});

                    App.views.collapseView = new CollapseView({
                        options : selectedRange,
                        collapseId : "listGroupRangeCollapse",
                        uniqueId : this.uniqueId() + '-' + this.uniqueId()
                    });

                    $(e.currentTarget).parents('.product-contain').find('.rangePanel').attr('id', rangePanelId);

                    this.addRegions({
                        'listProduct': $(e.currentTarget).parents('.product-contain').find('#'+rangePanelId)
                    });

                    this.getRegion("listProduct").show(App.views.collapseView);
                },

                deleteProduct : function (e) {
                    e.preventDefault();

                    $(e.currentTarget).parents('.product-contain').remove();
                },

                rotateArrow : function (e) {
                    e.preventDefault();
                    $(e.currentTarget).children('i').toggleClass("toggle");
                },

                showSuccessMessage : function($form, successMessage) {
                    this.enableForm($form);
                    
                    $('html, body').animate({scrollTop : 0}, 500);

                    $form.find('.alert').fadeIn(600, function() {
                        $(this).addClass('alert-success')
                        $(this).removeClass('alert-danger hide')
                        $(this).html(successMessage);
                    });
                },

                showErrorMessage : function ($form, response) {
                    $form.find('.alert').fadeIn(600, function() {
                        $(this).addClass('alert-danger')
                        $(this).removeClass('alert-success hide')
                        $(this).html(response);
                    });

                    this.enableForm($form);
                },

                hideMessage : function(e) {
                    $(e.currentTarget).parents('form').find('.alert').fadeOut(600, function() {
                        $(this).addClass('hide');
                    });
                },

                enableForm : function($form) {  
                    $form.find('input:not([readonly]), textarea, button, select:not(".readonly")').removeAttr('disabled');
                },

                uniqueId : function () {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
            });

            return CreateProductView;
        });
