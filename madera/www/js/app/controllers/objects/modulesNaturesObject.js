define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/modulesNatures"],
    function (Marionette, _, Radio, ModulesNaturesCollection) {
        "use strict";

        var modulesNaturesObject = Marionette.Object.extend({
            moduleId : null,

            initialize : function () {
                this.channel = Radio.channel('ModulesNatures');
                
                this.channel.reply('getModulesNatures', this.getModulesNatures);
                this.channel.reply('getModuleNature', this.getModuleNature);
            },

            getModuleNature : function (moduleNatureId) {
                var modulesNatures = new ModulesNaturesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return modulesNatures.fetch({
                    id : moduleNatureId
                });
            },

            getModulesNatures : function () {
                var modulesNatures = new ModulesNaturesCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return modulesNatures.fetch();
            }
        });

        return modulesNaturesObject;
    });
