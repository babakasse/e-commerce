/*! =========================================================
 *
 * Material Kit PRO - V1.0.0
 *
 * =========================================================
 *
 * Copyright 2016 Creative Code Srl
 * Available with purchase of license from http://www.creative-tim.com/product/material-kit-pro
 *
 * ========================================================= */

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if($('.datepicker').length != 0){
        $('.datepicker').datepicker({
            weekStart:1
        });
    }

    //    Activate bootstrap-select
    $(".select").dropdown({ "dropdownClass": "dropdown-menu", "optionClass": "" });

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
        interval: 400000
    });

    //Activate tags
    if($(".tagsinput").length != 0){
        $(".tagsinput").tagsInput();
    }

});