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

    var JSONLoader = function () {
        $.getJSON("all.json", function (todos) {
            todos.forEach(function (todo) {
                var categoriesString = "";
                todo.categories.forEach(function (category) {
                    categoriesString = categoriesString + " " + category;
                });
                $("#All").append("<div class='tab active item' id='All'>"
                    + "<p class='description'>" + todo.description + "</p>"
                    + "<p class='categories'>" + categoriesString + "</p>"
                    + "</div>");
            });
        });
    };

    var initialize = function () {
        setUpClickHandler($(".tabs .tab"));
        JSONLoader();
    };

    initialize();

};

$(document).ready(main);