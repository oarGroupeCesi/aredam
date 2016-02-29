define(["jquery",
        "backbone",
        "underscore",
        "baseItemView",
        "views/behaviors/validationBehavior",
        "models/project",
        "models/product",
        "hbs!/js/app/templates/projects/projectStep1"],
    function ($, Backbone, _, BaseItemView, ValidationBehavior,
              ProjectModel, ProductModel, ProjectStep1Template) {
        "use strict";

        var ProjectStep1View = BaseItemView.extend({
            name : 'projectStep1',
            template : ProjectStep1Template,
            model : new ProjectModel(),
            data : {
                product : new ProductModel()
            },

            behaviors: {
                ValidationBehavior: {
                    behaviorClass: ValidationBehavior
                }
            },

            events : {
                'submit #form_consultation_step1' : 'saveConsultation',
                'click #cancel' : 'cancelledConsultation',
                'change #without_patient' : 'setStatusesVisibility',
                'click #nextStep' : 'redirectToNextStep'
            },

            initialize: function (options) {
                var that = this;

                BaseItemView.prototype.initialize.apply(this, arguments);

                this.projectId = options.projectId;

                this.data.projectId = this.projectId;
                this.data.editMode = (this.consultationId !== null);

                this.on('modelChanged', this.initProjectToView, this);

                this.on('ProjectsObject:SuccessSave', this.redirectToNextStepAfterSuccessSave);
                this.on('ProjectsObject:ErrorSave', this.showErrorMessage);
            },

            onRender: function () {
                this.initFormValidation();
            },
            
            initProjectToView : function () {   
                var that = this;

                console.log('---------------------');
                console.log('initProjectToView');
                console.log(this);
                console.log('---------------------');

                /*if (this.consultationId) {
                    this.consultation = this.model.get('consultations').get(this.consultationId);
                    this.data.consultationJSON = this.consultation.toJSON();
                    this.data.showNextStepButton = true;
                } else {
                    this.consultation = new ProductModel();
                }

                $.when(this.getPatientVoices()).then(function (patientVoicesCollection) {
                    _.each(patientVoicesCollection.toArray(), function(patientVoice){
                        patientVoice.set('checked', (that.consultation && patientVoice.id === that.consultation.get('patient_voice_id')));
                    });

                    that.data.patientVoices = patientVoicesCollection.toJSON();

                    that.render();
                });*/
            },

            initFormValidation : function () {
                var options = {
                    formId : "#form_consultation_step1",
                    ignoreTitle : true,
                    focusInvalid: true,
                    ignore: '.ignore',
                    rules: {
                        'name': {
                            required: true
                        },
                        'patient_voice_id': {
                            required: {
                                depends: function (element) {
                                    return !$("#without_patient").is(":checked");
                                }
                            }
                        }
                    }
                };

                this.trigger("ValidationBehavior:initFormValidation", options);
            },

            saveConsultation : function (event) {
                $("#message").addClass("hide").find('.alert').empty();
                
                var $form = $(this.$el.find('form')),
                    formData,
                    data,
                    property;
            
                event.preventDefault();

                if ($form.valid()) {
                    
                    formData = $form.serializeArray();
                    data = _.object(_.pluck(formData, 'name'), _.pluck(formData, 'value'));
                    
                    for (property in data) {
                        this.consultation.set(property, data[property]);
                    }

                    if (!data.without_patient) {
                        this.consultation.set('without_patient', 0);
                    }

                    $form
                        .find('input, textarea, button, select')
                        .attr('disabled', 'disabled');
                
                    this.trigger('ProjectStep1View:ConsultationController:saveConsultation', this.consultation.toJSON());
                }
            },

            cancelledConsultation : function (e) {
                e.preventDefault();
                Backbone.history.navigate("home", {trigger:true});
            },

            redirectToNextStepAfterSuccessSave : function (model) {
                $("#message").addClass("hide").find('.alert').empty();
                
                this.consultation = model;
                
                this.redirectToNextStep();
            },
            
            redirectToNextStep : function (e) {
                if (e) {
                    e.preventDefault();
                }
                
                var step = (this.consultation.get('without_patient')) ? 'step3' : 'step2';
                Backbone.history.navigate('/cases/edit/' + this.caseId + '/consultations/edit/' + this.consultation.id + '/' + step, {trigger:true});
            },

            showErrorMessage : function (response) {
                $("#message").removeClass("hide").find('.alert').html(I18n.t("api:"+response.responseJSON.message));

                $(this.$el.find('form'))
                    .find('input, textarea, button, select')
                    .removeAttr('disabled');
            }
        });

        return ProjectStep1View;
    });