define(["backbone"],
    function (Backbone) {
        "use strict";

        var Customer = Backbone.Model.extend({
            defaults : {
                "firstname" : null,
                "lastname" : null,
                "email" : null,
                "adr_street" : null,
                "adr_zipcode" : null,
                "adr_city" : null
            },
            urlRoot: "customer"
        });

        return Customer;
    });