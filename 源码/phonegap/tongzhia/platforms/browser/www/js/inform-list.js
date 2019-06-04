
$(function () {
    var PN = parseInt(location.search.substr(4))
    var warn = '';
    var text = "";
    console.log(PN)
    diaoqu(PN)
    function diaoqu(PN) {
        if (PN == 1) {
            warn = 'jinji-warning'
            $('header').html(`<a href=inform.html>
            <div class="back">
                <img src="img/fan.png" alt="">
            </div>
        </a>紧急`)
        text = "紧急"
        }
        if (PN == 2) {
            warn = 'zuixin-warning'
            $('header').html(`<a href=inform.html>
            <div class="back">
                <img src="img/fan.png" alt="">
            </div>
        </a>最新`)
        text = "最新"
        }
        if (PN == 3) {
            warn = 'yuan-warning'
            $('header').html(`<a href=inform.html>
            <div class="back">
                <img src="img/fan.png" alt="">
            </div>
        </a>学院`)
        text = "学院"
        }
        if (PN == 4) {
            warn = 'yidu-warning'
            $('header').html(`<a href=inform.html>
            <div class="back">
                <img src="img/fan.png" alt="">
            </div>
        </a>已读`)
        text = "已读"
        }
        this.PN = PN
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
                console.log("数据是：" + data)
                json = $.parseJSON(data);
                $(".media-list").html('');
                $.each(json, function (index, item) {
                    var name = json[index].SPID;
                    var idnumber = json[index].SPMC;
                    var SPJG = json[index].SPJG;
                    var SPKC = json[index].SPKC;
                    var img = json[index].SPPIC;
                    // $("#list").html($("#list").html() + "<br>" + name + " - " + idnumber + " - " + BirthDate + "<br/>");
                    $(".media-list").html($(".media-list").html() + `
                    <a href="tzxq.html">
                    <li class="media">
                    <div class="media-left">
                            <img class="media-object" src="img/1.jpg" alt="...">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${name}${idnumber.substr(0, 4)}</h4>
                        <p >
                            <span class="xinxi">发布者：${SPJG}</span>&nbsp;&nbsp;
                            <span class="xinxi">时间：${SPKC}</span>
                            <span class="${warn} biao" >${text}</span>
                        </p>
                       
                        <p class=" xq">
                            同学们在在这周末将所需评优资料打包,包括证件照片，比赛的得奖奖状
                        </p>
                    </div>
                </li>
                </a>`
                    )
                })
            }
        })
    }
})