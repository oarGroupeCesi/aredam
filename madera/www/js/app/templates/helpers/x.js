/*global define*/
define(["hbs/handlebars"],
        function (Handlebars) {
            "use strict";

            function x(expression, options) {
                var fn = function () {}, result;
                try {
                    fn = Function.apply(this, ["window", "return " + expression + " ;"]);
                } catch (e) {
                    console.warn("{{x " + expression + "}} has invalid javascript", e);
                }

                try {
                    result = fn.call(this, window);
                } catch (e) {
                    console.warn("{{x " + expression + "}} hit a runtime error", e);
                }
                return result;
            }
            Handlebars.registerHelper("x", x);

        });