define(["backbone",
        "models/customer"],
    function (Backbone, CustomerModel) {
        "use strict";

        var CustomersCollection = Backbone.Collection.extend({
            model: CustomerModel,
            url: function () {
                return "customer";
            }
        });

        return CustomersCollection;
    });
