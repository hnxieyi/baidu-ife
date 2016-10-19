$(function(){
    
    var page = 1;
    var v_width = 158;
    var len = $("#pic ul li").length;

    $("#pic ul").width(v_width*len);

    $("#right").click(function(){

        var page_count = Math.ceil(len/1);
        var show = $("#pic ul");

        if(!show.is(":animated")){
            if(page == page_count-5 ){
                show.animate({left:'0px'},"slow");
                page = 1;
            }else{
                show.animate({left:"-="+v_width},"slow");
                page++;
            }
        }
    });
    $("#left").click(function(){
        var page_count = Math.ceil(len/1);
        var show = $("#pic ul");
        if(!show.is(":animated")){
            if(page == 1 ){
                show.animate({left:'-='+v_width*(page_count-6)},"slow");
                page = page_count-5;
            }else{
                show.animate({left:"+="+v_width},"slow");
                page--;
            }
        }
    });
})