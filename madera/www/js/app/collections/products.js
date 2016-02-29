/*global define*/
define(["backbone",
        "models/product"],
    function (Backbone, ProductModel) {
        "use strict";

        var ProductsCollection = Backbone.Collection.extend({
            model: ProductModel,
            url: function () {
                return "/api/products";
            }
        });

        return ProductsCollection;
    });
