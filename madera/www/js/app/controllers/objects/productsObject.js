define(["marionette",
        "underscore",
        "backbone.radio",
        "collections/products",
        "models/product"],
    function (Marionette, _, Radio, ProductsCollection, ProductModel) {
        "use strict";

        var ProductObject = Marionette.Object.extend({
            productId : null,

            initialize : function () {
                this.channel = Radio.channel('Products');
                
                this.channel.reply('getProducts', this.getProducts);
                this.channel.reply('saveProduct', this.saveProduct);
            },

            getProducts : function () {
                var products = new ProductsCollection();
                
                App.trigger('ajax:setTokenHeaders');

                return products.fetch();
            },

            saveProduct : function (data) {
                var productModel = new ProductModel(data);
                
                if (!data) {
                    return;
                }
                
                App.trigger('ajax:setTokenHeaders');
                
                return productModel.save();
            }
        });

        return ProductObject;
    });
