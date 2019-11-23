$(() => {
    $(".numberOfQuestions").hide();
    $(".sessionLabel").mouseover((event) => {
        if ($(event.currentTarget).next().is(":hidden")) {
            $(event.currentTarget).next().slideDown();
        }
    })
    $(".sessionLabel").mouseleave((event) => {
        $(event.currentTarget).next().slideUp();
    })
})
