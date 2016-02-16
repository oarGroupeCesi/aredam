/*global define*/
define(["./x", 
    "hbs/handlebars"],
    function (X, Handlebars) {
        "use strict";

        function xif (expression, options) {
            return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
        }

        Handlebars.registerHelper("xif", xif);

        return xif;
    });