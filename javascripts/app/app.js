/*jslint indent:4*/
/*global $, document */

var main = function () {
    //count variable
    var itemNum = 0;

    var setUpClickHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");

            return false;
        });
    };

    var addTodo = function (desc, categories) {
        $("#All").append("<div class='item " + itemNum + "''>"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='"
            + itemNum
            + "'>Remove</button>"
            + "</div>");
        $(".remove").click(function () {
            var toBeRemoved = $(this).attr("id");
            $("." + toBeRemoved).remove();
        });
        itemNum++;
    };

    var JSONLoader = function (callback) {
        $.getJSON("all.json", function (todos) {
            todos.forEach(function (todo) {
                var categoriesString = "";
                todo.categories.forEach(function (category) {
                    categoriesString = categoriesString + " " + category;
                });
                addTodo(todo.description, categoriesString);
            });
        });
    };

    var renderCategorized = function () {

    };

    var initialize = function () {
        JSONLoader();
        setUpClickHandler($(".tabs .tab"));
    };

    initialize();

};

$(document).ready(main);