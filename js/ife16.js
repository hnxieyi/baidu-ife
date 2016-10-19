window.onload = function(){

    init();


}
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {    
    var addCity = document.getElementById('aqi-city-input');
    var addValue = document.getElementById('aqi-value-input');

    if(addCity.value!=''){
        aqiData[addCity.value] = addValue.value;
    }   

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';    
    var oTable = document.getElementById('aqi-table');

    for(var attr in aqiData){
        str += '<tr><td>'+ attr +'</td><td>'+ aqiData[attr] +'</td><td><button type="button" onclick="delBtnHandle(\'' + attr + '\')">删除</button></td></tr>';
    }/*<button type="button" onclick="delBtnHandle(\'' + data + '\')">删除</button>*/
    oTable.innerHTML = str;
    

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(attr) {
  // do sth.
  delete aqiData[attr];

  renderAqiList();
}

function init() {

    var oBtn = document.getElementById('add-btn');
    var oTable = document.getElementById('aqi-table');
    oBtn.onclick = function(){
        var aBtn  = oTable.getElementsByTagName('button');
        addBtnHandle();
    }
    
    
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

