/*jslint indent:4*/
/*global $, document */

var main = function () {
    //count variable
    var itemNum = 0;
    var totalTodos = 0;

    var renderCategorized = function () {
        //clear previous content
        $("#Categorized").children().remove();
        //generate new content
        var i, j;
        for (i = 0; i < totalTodos; i++) {
            var description = $(".description:eq(" + i + ")").html();
            var categoriesStr = $(".categories:eq(" + i + ")").html();
            var categories = categoriesStr.split(" ");
            for (j = 1; j < categories.length; j++) {
                if ($("#Categorized > .item").is("." + categories[j])) {
                    $("." + categories[j]).append("<p>"
                        + description
                        + "</p>");
                } else {
                    $("#Categorized").append("<div class='item "
                        + categories[j]
                        + "'><h4 class='categoryTitle'>"
                        + categories[j]
                        + "</h4><p>"
                        + description
                        + "</p></div>");
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
        $("#All").append("<div class='item " + itemNum + "''>"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='"
            + itemNum
            + "'>Remove</button>"
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