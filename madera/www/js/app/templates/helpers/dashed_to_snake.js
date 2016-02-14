/*global define*/
define(["hbs/handlebars",
        "helpers"],
    function (Handlebars, Helpers) {
        "use strict";

        function dashed_to_snake(expression) {
            return Helpers.dashed_to_snake(expression);
        }
        Handlebars.registerHelper("dashed_to_snake", dashed_to_snake);

    });