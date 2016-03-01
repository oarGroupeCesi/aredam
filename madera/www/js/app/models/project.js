define(["backbone",
        "collections/products"],
    function (Backbone, ProductsCollection) {
        "use strict";

        var Project = Backbone.Model.extend({
            defaults : {
                "name" : "",
                "status" : "draft",
                "quotation_price" : null,
                "quotation_date" : null,
                "customer_id" : null,
                "user_id" : null,
                "products" : new ProductsCollection()
            },
            urlRoot: "project"
        });

        return Project;
    });