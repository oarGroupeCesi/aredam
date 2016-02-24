define(["backbone",
        "marionette",
        "jquery",
        "underscore",
        "baseItemView",
        "hbs!/js/app/templates/home"],
        function (Backbone, Marionette, $, _, BaseItemView, HomeTemplate) {

            "use strict";

            var HomeView = BaseItemView.extend({
                template: HomeTemplate,
                
                events: {
                    'click #create_project': 'navigateToCreateProjectView'
                },

                initialize: function () {
                    var that = this;

                    BaseItemView.prototype.initialize.apply(this, arguments);

                    this.render();
                },

                navigateToCreateProjectView : function (e) {
                    e.preventDefault();                    
                    Backbone.history.navigate('/projects/create/step1', {trigger:true});
                }
            });

            return HomeView;
        });
