window.onload = function(){
    var oCnt = document.getElementById('content');
    var aChange = getByClassName( oCnt, 'change');
    var aaLi = oCnt.getElementsByTagName('li');
    var oLine = document.getElementById('line');
    var aSpan = oLine.getElementsByTagName('span');
    var aEm = oLine.getElementsByTagName('em');
    var oCountry = document.getElementById('country');
    var aA = oCountry.getElementsByTagName('a');
    var shake = document.getElementById('shake');
    var shakeImg = shake.getElementsByTagName('img');
    var scroll = document.getElementById('scroll');
    var info = document.getElementById('info');

    info.onfocus = function(){
        if(this.value == 'Search Info...'){
            this.value = '';
        }
    }
    info.onblur = function(){
        if(this.value == '' ){
            this.value = 'Search Info...';
        }
    }

    for(var i=0;i<shakeImg.length;i++){
        shakeImg[i].onmouseover = function(){
            shakeThis(this,'top');
        }
    }


    aSpan[0].onmouseover = function(){
        moveLine1(aEm[0],100);
    }
    aSpan[1].onmouseover = function(){
        moveLine1(aEm[1],70);
    }
    aSpan[0].onmouseout = function(){
        moveLine2(aEm[0],0);
    }
    aSpan[1].onmouseout = function(){
        moveLine2(aEm[1],0);
    }
    
    for( var i=0;i<aA.length;i++ ){
        aA[i].onmouseover= function(){
            opa2(this,100,30);
        };
        aA[i].onmouseout = function(){
            opa3(this,70,100);
        }
    }

    for( var i=0;i<aaLi.length;i++ ){
        aaLi[i].onclick = function(){
            for(var i=0;i<aaLi.length;i++){
                aaLi[i].className = '';
                aaLi[i].getElementsByTagName('a')[0].className = 'change';
            }
            this.className = 'active';
            this.getElementsByTagName('a')[0].className = '';
            this.getElementsByTagName('a')[0].onmouseover = this.getElementsByTagName('a')[0].onmouseout = null;
        }
    }

    for( var i=0;i<aChange.length;i++ ){
        aChange[i].onmouseover = aChange[i].onmouseout = function(){
            opa(this,0,50);
        };
    }
}

function opa(obj,a,speed){
    var iSpeed = 10;
    obj.style.opacity = a;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        a += iSpeed;                 
        obj.style.opacity = a/100;
        if(a == 100 ){
            clearInterval( obj.timer );
        }
    },speed); 
}
function opa2(obj,a,speed){
    var iSpeed = 2;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        a -= iSpeed;
        obj.style.opacity = a/100;
        if(a < 70 ){
            clearInterval( obj.timer );
        }
    },speed); 
}
function opa3(obj,a,speed){
    var iSpeed = 10;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        a += iSpeed;
        obj.style.opacity = a/100;
        if(a > 100 ){
            clearInterval( obj.timer );
        }
    },speed); 
}
function getByClassName( obj,str ){
    var attr = [];
    var all = obj.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){
        if( all[i].className == str ){
            attr.push(all[i]);
        }
    }
    return attr;
};

function moveLine1(obj,n){
    var width = parseInt(getStyle(obj,'width'));
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        if( width < n ){
            width += 10;
            obj.style.width = width + 'px';
        }
    },30);
}
function moveLine2(obj,n){
    var width = parseInt(getStyle(obj,'width'));
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        if( width > n ){
            width -= 10;
            obj.style.width = width + 'px';
        }
    },30);
}

//取得style值，有单位
function getStyle( obj,str ){return obj.currentStyle?obj.currentStyle[str]:getComputedStyle(obj,false)[str]; }

//shake
function shakeThis( obj, attr, endFn ) {
    var pos = parseInt( getStyle(obj, attr) );          // 有隐患的
    var arr = [];           // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;
        
    for ( var i=3; i>0; i-=3 ) {
        arr.push( i, -i );
    }
    arr.push(0);
        
    clearInterval( obj.shake );
    obj.shake = setInterval(function (){
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if ( num === arr.length ) {
            clearInterval( obj.shake );
            endFn && endFn();
        }
    }, 100);
}
