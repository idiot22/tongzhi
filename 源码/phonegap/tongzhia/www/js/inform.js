// 轮播图触摸
var OFFSET = 50;
$('.carousel').each(function (i, item) {
  var startX, endX;
  item.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    e.preventDefault();
  });
  item.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
    e.preventDefault();
  });
  item.addEventListener('touchend', function (e) {
    var offsetX = endX - startX;
    if (offsetX > OFFSET) {
      // 上一张
      $(this).carousel('prev');
    } else if (offsetX < -OFFSET) {
      // 上一张
      $(this).carousel('next');
    }
    e.preventDefault();
  });
});




$(function (PN) {
 
  diaoqu(1)
  diaoqu(2)
  diaoqu(3)
  diaoqu(4)
  function diaoqu(PN) {
    var warn = ''
    this.PN = PN
    var text =""
   console.log("取数据啦")
    $.ajax({
      type: 'get',
      url: `http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_list?PN=${PN}`,
      dataType: 'text',
      jsonp: 'callback',
      jsonpCallback: "successCallback",

      error: function (XMLHttpRequest, textStatus, errorThrown) {
        // alert(XMLHttpRequest.status);
        // alert(XMLHttpRequest.readyState);
        // alert(textStatus);
      },
      beforeSend: function () {
        $(".listbox").html('loading...');
      },
      success: function (data) {
        console.log("数据是："+data)
        if(PN==1){
          $ele = $(".jinji-li")
          warn = 'jinji-warning'
          text ="紧急"
        }
        if(PN==2){
          warn = 'zuixin-warning'
          $ele = $(".zuixin-li")
          text = "最新"
        }
        if(PN==3){
          warn = 'yuan-warning'
          $ele = $(".xueyuan-li")
          text = "学院"
        }
        if(PN==4){
          warn = 'yidu-warning'
          $ele = $(".yidu-li")
          text = "已读"
        }
       
        json = $.parseJSON(data);
        $ele.html('');
        for (index = 0; index < 3; index++) {
          var name = json[index].SPID;
          var idnumber = json[index].SPMC;
          var SPJG = json[index].SPJG;
          var SPKC = json[index].SPKC;
          var img = json[index].SPPIC;
          // $("#list").html($("#list").html() + "<br>" + name + " - " + idnumber + " - " + BirthDate + "<br/>");
          $ele.html($ele.html() + `
          <a href="tzxq.html">
                <li class="media">
                <div class="media-left">
                        <img class="media-object" src="img/1.jpg" alt="...">
                </div>
                <div class="media-body">
                    <h4 class="media-heading">${name}${idnumber}</h4>
                    <p style="display:block;position:relative">
                        <span class="xinxi">发布者：${SPJG}</span>&nbsp;&nbsp;
                        <span class="xinxi ">时间：${SPKC}</span>
                        <span class="${warn} biao" >${text}</span>
                    </p>
                   
                    <p class=" xq" style="width:80%">
                        同学们在在这周末将所需评优资料打包,包括证件照片，比赛的得奖奖状
                    </p>
                </div>
            </li>
            </a>
            `
          )
        }

        
      }
    })


  }
})
