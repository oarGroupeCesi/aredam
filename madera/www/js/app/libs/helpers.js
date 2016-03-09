define(["moment"],
    function (Moment) {

        "use strict";

        var Helpers = {
            dashed_to_snake : function (expression) {
                return expression.replace(/(\-([a-z]))/gi, function(){return "_"+arguments[2].toLowerCase();});
            },
            formated_date : function (expression) {
                return Moment(expression).format("DD/MM/YYYY");
            }
        };

        return Helpers;
    });

        