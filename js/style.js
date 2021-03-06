(function ($) {

    // Estilização pronta. Pego na internet. Com muitas modificações.
    "use strict";

    /*==================================================================
    [ Focus input ]*/
    /*$('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    });*/

    $(document).on("blur", '.input100', function () {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        } else {
            $(this).removeClass('has-val');
        }
    });


    $(document).on("mouseenter",".bolao-list-adm", function () {
        //console.log("maoe");
        $(this).find("img").css("filter", "invert(100%)");
    });
    
    $(document).on("mouseleave",".bolao-list-adm", function () {
        //console.log("maoe");
        $(this).find("img").css("filter", "");
    });
    
    $(document).on("mouseenter",".invite", function () {
        //console.log("maoe");
        $(this).find("button").css("background", "white");
        $(this).find("button").css("color", "black");
        
    });
    
    $(document).on("mouseleave",".invite", function () {
        $(this).find("button").css("background", "black");
        $(this).find("button").css("color", "white");
    });

    /*==================================================================
    [ Show password ]*/
    var showPass = 0;
    $(document).on('click', '.btn-show-pass', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);
