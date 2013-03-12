/*jslint indent:4*/
/*global $, document */

var main = function () {

    var setUpClickHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");

            return false;
        });
    };

    setUpClickHandler($(".tabs .tab"));
};

$(document).ready(main);