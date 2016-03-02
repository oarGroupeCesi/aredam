/*global define*/
define(["hbs/handlebars",
        "helpers"],
    function (Handlebars, Helpers) {
        "use strict";

        function formated_date (expression) {
            return Helpers.formated_date(expression);
        }
        Handlebars.registerHelper("formated_date", formated_date);

    });