define(["backbone",
    "backbone.radio",
    "marionette",
    "jquery",
    "underscore",
    "baseItemView",
    "views/behaviors/validationBehavior",
    "models/project",
    "models/customer",
    "hbs!/js/app/templates/projects/createProjectForm"],
        function (Backbone, Radio, Marionette, $, _,  
                  BaseItemView, 
                  ValidationBehavior, 
                  ProjectModel, CustomerModel, 
                  CreateProjectFormTemplate) {
            "use strict";

            var CreateProjectView = BaseItemView.extend({
                template: CreateProjectFormTemplate,
                model : new ProjectModel(),
                
                behaviors: {
                    ValidationBehavior: {
                        behaviorClass: ValidationBehavior
                    }
                },
                
                events : {
                    'submit form' : 'handleProjectSave'
                },
                
                initialize: function () {
                    var that = this;
                    
                    BaseItemView.prototype.initialize.apply(this, arguments);

                    this.channel = Radio.channel('Projects');
                    this.customerChannel = Radio.channel('Customers');
                    
                    this.render();
                },
                
                onShow : function () {
                    this.initFormValidation();
                },

                initFormValidation : function () {
                    this.trigger("ValidationBehavior:initFormValidation", {
                        formId : "#CreateProjectForm",
                        ignoreTitle : true,
                        focusInvalid: true,
                        ignore: '.ignore',
                        rules: {
                            'name': {
                                required: true
                            },
                            'firstname': {
                                required: true
                            },
                            'lastname': {
                                required: true
                            },
                            'email': {
                                required: true
                            },
                            'adr_street': {
                                required: true
                            },
                            'adr_zipcode': {
                                required: true
                            },
                            'adr_city': {
                                required: true
                            }
                        }
                    });
                },

                handleProjectSave : function (e) {
                    $("#message").addClass("hide").find('.alert').empty();
                    
                    e.preventDefault();
                    
                    var that = this,
                        $form = $(e.currentTarget),
                        dataCustomer = {},
                        dataProject = {};

                    dataProject = {
                        'name' : $form.find('#name').val()
                    };

                    dataCustomer = {
                        'firstname' : $form.find('#firstname').val(),
                        'lastname' : $form.find('#lastname').val(),
                        'email' : $form.find('#email').val(),
                        'adr_street' : $form.find('#adr_street').val(),
                        'adr_zipcode' : $form.find('#adr_zipcode').val(),
                        'adr_city' : $form.find('#adr_city').val()
                    };

                    $form.find('input, textarea, button, select').attr('disabled', 'disabled');
                    
                    this.customerChannel
                        .request('saveCustomer', dataCustomer)
                        .then(function(customerModel){
                            that.customerModel = new CustomerModel(customerModel);
                            dataProject.customer_id = that.customerModel.get('id');

                            that.channel
                                .request('saveProject', dataProject)
                                .then(function(projectModel){
                                    that.model = new ProjectModel(projectModel);
                                    Backbone.history.navigate("projects/edit/" + that.model.id + "/products/add/step1", {trigger:true});
                                });
                        },
                        function(response){
                            $form.find('.alert').text('error : ' + response).removeClass('hide');
                            $form.find('input, textarea, button, select').attr('disabled', false);
                        });
                }
            });

            return CreateProjectView;
        });
