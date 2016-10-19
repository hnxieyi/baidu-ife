$(function(){
    
    var page = 1;
    var oLi = $('#pic li');
    var v_width = parseInt(getStyle(oLi[0],'width'));
    var len = $("#pic ul li").length;

    $("#right").click(function(){

        var page_count = Math.ceil(len/1);
        var show = $("#pic ul");

        if(!show.is(":animated")){
            if(page == page_count ){
                show.animate({left:'0px'},"slow");
                page = 1;
            }else{
                show.animate({left:"-="+v_width},"slow");
                page++;
            }
            $('#pic p em').eq(page-1).addClass('yellow').siblings().removeClass('yellow');
        }
    });
    $("#left").click(function(){
        var page_count = Math.ceil(len/1);
        var show = $("#pic ul");
        if(!show.is(":animated")){
            if(page == 1 ){
                show.animate({left:'-='+v_width*(page_count-1)},"slow");
                page = page_count;
            }else{
                show.animate({left:"+="+v_width},"slow");
                page--;
            }
            $('#pic p em').eq(page-1).addClass('yellow').siblings().removeClass('yellow');
        }
    });
})