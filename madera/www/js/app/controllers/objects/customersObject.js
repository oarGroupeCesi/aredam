define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/customers",
        "models/customer"],
    function (Marionette, _, Radio, CustomersCollection, CustomerModel) {
        "use strict";

        var CustomerObject = Marionette.Object.extend({

            initialize : function () {
                this.channel = Radio.channel('Customers');
                
                this.channel.reply('getCustomers', this.getCustomers);
                this.channel.reply('saveCustomer', this.saveCustomer);
            },

            getCustomers : function () {
                var customers = new CustomersCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return customers.fetch();
            },

            saveCustomer : function (data) {
                var customerModel = new CustomerModel(data);
                
                if (!data) {
                    return;
                }
                
                App.trigger('ajax:setTokenHeaders');
                
                return customerModel.save();
            }
        });

        return CustomerObject;
    });
