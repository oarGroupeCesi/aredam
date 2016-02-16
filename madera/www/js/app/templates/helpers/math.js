/*global define*/
define(["hbs/handlebars"],
    function (Handlebars) {
        "use strict";

        function math(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            var ops = {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            };

            return ops[operator];
        }

        Handlebars.registerHelper("math", math);
        return math;
    });