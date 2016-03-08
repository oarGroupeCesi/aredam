define(["backbone",
        "backbone.radio",
        "marionette",
        "jquery",
        "underscore",
        "baseLayoutView",
        "views/behaviors/validationBehavior",
        "models/module",
        "views/modules/renderModuleFormAfterSelectModuleTypeView",
        "hbs!/js/app/templates/modules/createModuleForm"],
        function (Backbone, Radio, Marionette, $, _, 
                  BaseLayoutView, 
                  ValidationBehavior, 
                  ModuleModel, RenderModuleFormView, CreateModuleFormTemplate) {
            "use strict";

            var CreateModuleView = BaseLayoutView.extend({
                template: CreateModuleFormTemplate,
                model : new ModuleModel(),
                
                behaviors: {
                    ValidationBehavior: {
                        behaviorClass: ValidationBehavior
                    }
                },
                
                events : {
                    'change .moduleNature'      : 'showModuleForm',
                    'submit form'               : 'handleModuleSave',
                    'mouseover .theTooltip'     : 'showTooltip',
                    'click #addAnotherModule'   : 'addAnotherModule',
                    'click .deleteModule'       : 'deleteModule'
                },
                
                initialize: function (options) {
                    var that = this;
                    
                    if(!options.modulesNatures || !options.projectId) {
                        return false;
                    }

                    BaseLayoutView.prototype.initialize.apply(this, arguments);

                    this.channel = Radio.channel('Modules');
                    
                    this.modulesNatures = options.modulesNatures;
                    this.projectId = options.projectId;

                    this.render();
                },
                
                onBeforeRender : function () {
                    this.data.modulesNatures = this.modulesNatures.toJSON();
                },

                onShow : function () {
                    this.initFormValidation();
                },

                initFormValidation : function () {
                    this.trigger("ValidationBehavior:initFormValidation", {
                        formId : "#CreateModuleForm",
                        ignoreTitle : true,
                        focusInvalid: true,
                        ignore: '.ignore',
                        rules: {
                            'modulenature_id': {
                                required: true,
                                digits: true
                            },
                            'height': {
                                required: true,
                                digits: true
                            },
                            'weight': {
                                required: true,
                                digits: true
                            },
                            'quantity': {
                                required: true,
                                digits: true
                            }
                        }
                    });
                },

                handleModuleSave : function (e) {
                    $("#message").find('.alert').addClass("hide").empty();
                    
                    e.preventDefault();

                    var that = this,
                        $form = $(e.currentTarget),
                        dataModule = {};

                    $('#modules .module-contain').each(function(index, divModule) {

                        dataModule[index] = {
                            'name' : $(divModule).find("input[name='name']").val(),
                            'height' : $(divModule).find("input[name='height']").val() || '',
                            'width' : $(divModule).find("input[name='width']").val(),
                            'quantity' : $(divModule).find("input[name='quantity']").val(),
                            'modulenature_id' : parseInt($(divModule).find("select[name='modulenature_id']").val()),
                            'project_id' : parseInt(that.projectId)
                        };

                    });
                    
                    $form.find('input, textarea, button, select').attr('disabled', 'disabled');
                    
                    $.each(dataModule, function(i, moduleModel){                        
                        that.channel
                            .request('saveModule', moduleModel)
                            .then(function(module){
                                that.moduleModel = new ModuleModel(module);
                                Backbone.history.navigate("projects/edit/" + that.projectId + "/step3/preview", {trigger:true});
                            },
                            function(response){
                                that.showErrorMessage($form, 'Erreur : ' + response.responseJSON);
                            });
                    });
                    
                },

                addAnotherModule : function (e) {
                    e.preventDefault();

                    if(!$('#modules .module-contain:last-child').find('.input-module-group').length) {
                        return false;
                    }
                    
                    var $modulesContent = $('#modules-hidden').html(),
                        $test = $($modulesContent);

                    $('#modules').append($modulesContent);
                    $('#modules').find('.module-label > .number').last().text($('#modules .module-contain').length);
                    $('.moduleInfos').last().empty();
                    $("body").animate({ scrollTop: $(document).height()}, 1600);
                },

                deleteModule : function (e) {
                    e.preventDefault();

                    $(e.currentTarget).parents('.module-contain').remove();
                },

                showModuleForm : function (e) {
                    e.preventDefault();

                    var moduleTypeId = $(e.currentTarget).val(),
                        selectedModuleType,
                        moduleInputsId = 'module_' + this.uniqueId();

                    selectedModuleType = this.modulesNatures.findWhere({id:parseInt(moduleTypeId)});

                    App.views.renderModuleFormView = new RenderModuleFormView({
                        options : selectedModuleType,
                        uniqueId : this.uniqueId() + '-' + this.uniqueId()
                    });

                    $(e.currentTarget).parents('.module-contain').find('.moduleInfos').attr('id', moduleInputsId);

                    this.addRegions({
                        'modules': $(e.currentTarget).parents('.module-contain').find('#'+moduleInputsId)
                    });

                    this.getRegion("modules").show(App.views.renderModuleFormView);
                },

                showErrorMessage : function ($form, response) {
                    $form.find('.alert').fadeIn(600, function() {
                        $(this).addClass('alert-danger')
                        $(this).removeClass('alert-success hide')
                        $(this).html(response);
                    });
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

            return CreateModuleView;
        });
