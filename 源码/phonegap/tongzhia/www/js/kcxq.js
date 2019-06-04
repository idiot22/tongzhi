function getUrlNum(name) {
    var reg = new RegExp( name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (name == 'col') {
        if (r != null) {
            return unescape(r[1]).substr(0, 1);               //不解码
        }
        return null;
    }
    if(name == 'count'){
        if (r != null) {
            return unescape(r[1]);               //不解码
            
        }
        return null;
    }
    if(name == 'row'){
        if (r != null) {
            var str = unescape(r[1]);
            if(!isNaN(str.substr(0,2)))            
            {
                return unescape(str.substr(0,2)); 
            }
            else{
                return unescape(str.substr(0,1)); 
            }
        }
        return null;
    }
}

var col = getUrlNum('col')
var row = getUrlNum('row')
var count = getUrlNum('count')


//保存按钮事件
function save(){
  var zhi = document.getElementById("kc").getElementsByTagName("input")[0].value;
  
}