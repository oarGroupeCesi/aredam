define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "views/behaviors/validationBehavior",
        "hbs!/js/app/templates/login"],
    function (Backbone, Marionette, $, _, BaseItemView, ValidationBehavior, LoginTemplate) {
        
        "use strict";
        
        var LoginView = BaseItemView.extend({
            template: LoginTemplate,

            events: {
                'submit #login-form' : 'login'
            },
            
            behaviors : {
                ValidationBehavior: {
                    behaviorClass: ValidationBehavior
                }
            },
 
            initialize : function () {
                App.views.appLayoutView.setBodyClass(['login']);
                
                this.on("usersController:errorLogin", this.showErrorMessage);
                this.on("usersController:validLogin", this.handleRedirectToHome);
                
            },
            
            onShow : function() {
                this.initFormValidation();
            },
            
            initFormValidation : function () {
                this.trigger("ValidationBehavior:initFormValidation", {
                    formId : "#login-form",
                    ignoreTitle : true,
                    focusInvalid: true,
                    ignore: '.ignore',
                    rules: {
                        'email': {
                            required: true
                        },
                        'password': {
                            required: true
                        }
                    }
                });
            },
            
            login : function (e) {
                e.preventDefault();
                
                var $form, formData, data, $buttonInputs;

                $form = $(e.target);
                formData = $form.serializeArray();
                data = _.object(_.pluck(formData, 'name'), _.pluck(formData, 'value'));

                $buttonInputs = $("#loginButton, input");
                $buttonInputs.attr("disabled", "disabled");

                this.trigger("loginView:usersController:login", data);
            },
            
            showErrorMessage : function (message) {
                console.log(message);
                $("#message").html(message);
                $("#message").removeClass("hide");
                
                var $buttonInputs = $("#loginButton, input");
                $buttonInputs.removeAttr("disabled");
                $buttonInputs.each(function(){
                    $(this).parents('.input-group').addClass("has-error");
                });
            },
            
            handleRedirectToHome : function () {
                $("#message").html("");
                $("#message").addClass("hide");
                
                var $buttonInputs = $("#loginButton, input");
                $buttonInputs.each(function(){
                    $(this).parents('.input-group').removeClass("has-error");
                });
                
                Backbone.history.navigate('home', {trigger:true});
            }
        });

        return LoginView;
    });
