"use strict";

$(document).ready(function() {
   $(".select_choice_article").select2({
       placeholder: "Choissisez une catégorie d'article",
       theme: "bootstrap"
   });

    $(".select_size_article").select2({
        placeholder: "Choissisez une taille d'article",
        theme: "bootstrap"

    });
    /*$('#sliderDouble').noUiSlider({
        start: [20, 60],
        connect: true,
        tooltips: true,
        range: {
            min: 0,
            max: 100
        }
    */
});