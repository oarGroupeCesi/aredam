define(["marionette",
        "jquery",
        "jquery.validate"],
        function (Marionette, $, JqueryValidate) {
            "use strict";

            var ValidationBehavior = Marionette.Behavior.extend({
                initialize: function () {
                    require(["jquery", "jquery.validate", "../vendor/jquery/plugins/validate/localization/messages_fr"]);

                    this.view.on("ValidationBehavior:initFormValidation", this.initFormValidation, this);
                },
                initFormValidation: function (params) {
                    this.setDefaults();
                    this.validateForm(params.formId, params);
                },
                validateForm: function (formId, options) {
                    $(formId).validate(options);
                },
                setDefaults : function () {
                    $.validator.setDefaults({
                        highlight: function (element) {
                            return $(element).closest('.input-group').addClass('has-error');
                        },
                        unhighlight: function (element) {
                            return $(element).closest('.input-group').removeClass('has-error').find('.help-block-hidden').removeClass('help-block-hidden').addClass('help-block');
                        },
                        errorElement: 'div',
                        errorClass: 'jquery-validate-error text-danger',
                        errorPlacement: function (error, element) {
                            var $p, 
                                has_e, 
                                is_c, 
                                has_custom_placement,
                                $customFormErrors = element.parents('.row.form-group').find('.form-errors');
                            
                            has_custom_placement = $customFormErrors.length;
                            is_c = element.is('input[type="checkbox"]') || element.is('input[type="radio"]');
                            has_e = element.closest('.input-group').find('.jquery-validate-error').length;
                            
                            if (has_custom_placement) {
                                return $customFormErrors.append(error);
                            } else if (!is_c || !has_e) {
                                if (!has_e) {
                                    element.closest('.input-group').find('.help-block').removeClass('help-block').addClass('help-block-hidden');
                                }
                                error.addClass('help-block');
                                if (is_c) {
                                    var placement = element.data('error');
                                    if (placement) {
                                        $(placement).append(error);
                                    } else {
                                        return element.closest('[class*="col-"]').append(error);
                                    }
                                } else {
                                    $p = element.parent();
                                    if ($p.is('.form-group')) {
                                        return $p.parent().append(error);
                                    } else {
                                        return $p.after(error);
                                    }
                                }
                            }
                        }
                    });
                }
                
            });

            return ValidationBehavior;
        });
