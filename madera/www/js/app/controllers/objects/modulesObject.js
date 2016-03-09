define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/modules",
        "models/module"],
    function (Marionette, _, Radio, ModulesCollection, ModuleModel) {
        "use strict";

        var moduleObject = Marionette.Object.extend({
            moduleId : null,

            initialize : function () {
                this.channel = Radio.channel('Modules');
                
                this.channel.reply('getModules', this.getModules);
                this.channel.reply('getModule', this.getModule);
                this.channel.reply('saveModule', this.saveModule);
            },

            getModules : function () {
                var modules = new ModulesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return modules.fetch();
            },

            getModule : function (projectId) {
                var modules = new ModulesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return modules.fetch({
                    'project_id' : projectId
                });
            },

            saveModule : function (data) {
                var moduleModel = new ModuleModel(data);
                
                if (!data) {
                    return;
                }
                
                App.trigger('ajax:setTokenHeaders');
                
                return moduleModel.save();
            }
        });

        return moduleObject;
    });
