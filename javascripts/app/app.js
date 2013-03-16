/*jslint indent:4*/
/*global $, document, console */

var main = function () {
    "use strict";
    //count variable
    var itemNum = 0,
        totalTodos = 0;

    var renderCategorized = function () {
        //clear previous content
        $("#Categorized").children().remove();
        //generate new content
        var i, j;
        for (i = 0; i < totalTodos; i++) {
            var description = $(".description:eq(" + i + ")").html();
            var categoriesStr = $(".categories:eq(" + i + ")").html();
            var categories = categoriesStr.split(" ");
            for (j = 0; j < categories.length; j++) {
                if (categories[j] === undefined || categories[j] === '') {
                    console.log("Invalid category");
                } else {
                    if ($("#Categorized > .item > .span10").is("." + categories[j])) {
                        $("." + categories[j]).append("<div class='description'>"
                            + " &#187; " + description
                            + "</div>");
                    } else {
                        $("#Categorized").append("<div class='item row'>"
                            + "<div class='span10 "
                            + categories[j]
                            + "'><div class='categoryTitle'>"
                            + categories[j]
                            + "</div><div class='description'>"
                            + " &#187; " + description
                            + "</div></div></div>");
                    }
                }
            }
        }

    };

    var setUpTabHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");

            if (target === "Categorized") {
                renderCategorized();
            }

            return false;
        });
    };

    var addTodo = function (desc, categories) {
        $("#All").append("<div class='item row-fluid " + itemNum + "'>"
            + "<div class='span1'>"
            + "<button type='button' class='remove btn btn-link' id='"
            + itemNum
            + "'>X</button>"
            + "</div>"
            + "<div class='span10'>"
            + "<div class='description'>" + desc + "</div>"
            + "<div class='categories'>" + categories + "</div>"
            + "</div>"
            + "</div>");
        $("#" + itemNum).click(function () {
            var toBeRemoved = $(this).attr("id");
            $("." + toBeRemoved).remove();
            totalTodos--;
        });
        itemNum++;
        totalTodos++;
    };

    var setUpAddToDoHandler = function () {
        $("#addToDo").click(function () {
            var desc = $("#desc").val();
            var categories = $("#categ").val();

            addTodo(desc, categories);

            $("#desc").val("");
            $("#categ").val("");
        });
    };

    var jsonLoader = function () {
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

    var initialize = function () {
        jsonLoader();
        setUpTabHandler($(".tabs .tab"));
        setUpAddToDoHandler();
    };

    initialize();

};

$(document).ready(main);