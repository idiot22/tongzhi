var b=0
$(function () {
    var kcData = [
        {
            "color": 1,
            "name": "高数",
            "row": 2,
            "col": 1,
            "sum": 2,
        },
        {
            "color": 2,
            "name": "绘画",
            "row": 5,
            "col": 1,
            "sum": 3,
        },
        {
            "color": 3,
            "name": "英语",
            "row": 3,
            "col": 2,
            "sum": 2,
        },
        {
            "color": 4,
            "name": "语文",
            "row": 8,
            "col": 2,
            "sum": 2,
        },
        {
            "color": 1,
            "name": "高数",
            "row": 2,
            "col": 4,
            "sum": 4,
        },
    ]
    var colors = [
        "#ff9e9e",
        "#ffdf62",
        "#61e7f0",
        "#fdc081",
        "#c2b4f6"]
    //头部下拉
    var flag = 1;
    $("#head-mid").on('click', function () {
        // $("#xiugai").slideToggle(200)
        // $("#gai-week").slideToggle(200)
        // $("xiugai").css()
        var xiugai = document.getElementById("xiugai")
        var headMid = document.getElementById("head-mid")
        var gaiWeek = document.getElementById("gai-week")
        var kechenBody = document.getElementById("kechen-body")
        var fujia = document.getElementById("fujia")
        xiugai.style.overflow = "hidden"
        gaiWeek.style.overflow = "hidden"
        var xiugaiheight = (flag == 1) ? 3.5 : 0;
        var kcBodyTop = (flag == 1) ? 6.2 : 2.7
        var xiugaiheight2 = 0;
        var kcBodyTop2 = 2.7
        var speed = 0.1
        var speed2 = 0.1
        var cleartime = setInterval(function () {
            if (flag == 1) {
                kcBodyTop -= xiugaiheight - Math.floor(xiugaiheight - speed)
                xiugaiheight = Math.floor(xiugaiheight - speed)
                gaiWeek.style.height = xiugaiheight + "em"
                xiugai.style.height = xiugaiheight + "em"
                kechenBody.style.marginTop = kcBodyTop + "em"
                speed += 0.15
                if (xiugaiheight == 0) {
                    clearInterval(cleartime);
                    console.log("结束")
                    flag = 2
                }
            }
            else {
                kcBodyTop = kcBodyTop + speed2
                xiugaiheight = xiugaiheight + speed2
                gaiWeek.style.height = xiugaiheight + "em"
                xiugai.style.height = xiugaiheight + "em"
                kechenBody.style.marginTop = kcBodyTop + "em"
                speed2 += 0.25
                if (xiugaiheight >= 3.5) {
                    xiugai.style.height = 3.5 + "em"
                    gaiWeek.style.height = 3.5 + "em"
                    kechenBody.style.marginTop = 6.2 + "em"
                    xiugai.style.overflow = "scroll"
                    clearInterval(cleartime);
                    console.log("结束")
                    flag = 1
                }
            }
        }, 120)
    })


    //课程块的构造函数
    function KCDiv(row, col, color, KCname, sum) {
        this.x = (col - 1) * 13.5 + 8;
        this.y = (row - 1) * 2.85 + 2.5 + 3.2 + 2.5 + 0.3;
        this.color = color;
        this.KCname = KCname;
        this.hieght = sum * 2.8;
        this.element = $("<div class='kc-sub'></div")
        this.longClick = 0;
        this.color = color;
    }
    KCDiv.prototype.init = function () {
        this.element
            .text(this.KCname)
            .css({
                "height": `${this.hieght}em`,
                "top": `${this.y}em`,
                "left": `${this.x}%`,
                "width": '12%',
                "backgroundColor": this.color
            })
            .appendTo("#KC-sum")
        this.press()

    }


    //长按删除
    KCDiv.prototype.press = function (e) {

        //长按效果实现就是touchstart的延迟
        longClick = 0;//设置初始为0
        this.element.on({
            "touchstart": function (e) {
                $("<div class='kc-sub animated bounceOut'></div").appendTo(this.element)
                timeOutEvent = setTimeout(function () {
                    var ele = e.target;
                    $(ele).css("z-index", 100)
                    //此显示遮罩层及删除按钮,触发事件，点击按钮，删除
                    $("<div class='del-btn animated fadeInUp'></div")
                        .text("删除")
                        .appendTo(e.target)
                        .on("touchstart", function () {
                            ele.remove();
                            $(".mask").remove()
                        })

                    //点击遮罩事件
                    $("<div class='mask animated fadeIn '></div")
                        .width("100%")
                        .height(document.body.clientHeight)
                        .appendTo("body")
                        .on("touchstart", function (e) {
                            e.target.remove()
                            $(".del-btn").remove()
                            $(".kc-sub").css("z-index", 0)
                        })

                    longClick = 1;//假如长按，则设置为1

                }, 500);
            },
            "touchmove": function () {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
                e.preventDefault();
            },
            "touchend": function (e) {
                clearTimeout(timeOutEvent);
                if (timeOutEvent != 0) {//点击
                    //此处为点击事件----在此处添加跳转详情页
                }
                return false;
            }
        })
    }

    //创建课程表

    function createKC() {
        for (index in kcData) {
            var a = kcData[index]
            var kckuai = new KCDiv(a.row, a.col, colors[a.color - 1], a.name, a.sum);
            kckuai.init()
        }
    }
    window.onload=function(){
        createKC()
        var col = getUrlNum('col')
        var row = getUrlNum('row')
        var count = getUrlNum('count')
        var name = getUrlNum('name')
        console.log(name)
        if(name){
        var k = new KCDiv(row,col,"#c2b4f6",name,count)
        k.init()
        }
    }



    //添加课程
    $(".kebiao-table").on("touchstart", "tbody tr td+td", function (e) {
        //获取点击块的位置
        var col = parseInt(e.target.id.substr(0, 1))
        var row = parseInt(e.target.id.length == 3 ? e.target.id.substr(2, 1) : e.target.id.substr(2, 3))
        var left = (col - 1) * 13.2 + 8.5
        var top = (row - 1) * 2.85 + 8.2
        $("#add-sum").html(`<div class="add-class" style='top:${top}em;left:${left}%'>+</div>`)
        // $("#add-sum").on("touchmove",".add-class",function(e){
        //     endX = e.touches[0].clientX;
        //     console.log(endX)
        //     e.preventDefault();
        // })
        var statY = 0
        var flagStart = 0
        var emNum = 0
        var count = 1
        document.getElementsByClassName("add-class")[0].addEventListener('touchmove', function (e) {
            if (e.type == "touchmove") {
                console.log(e)
                var pageY = e.touches[0].pageY
                var ele = $(e.srcElement)
                if (flagStart == 0) {
                    statY = pageY
                    flagStart = 1
                    emNum = ele.height() / 3
                }
                if (ele.height() >= 2.5 * emNum) {
                    if (Math.abs(statY - pageY) >= 50) {
                        if (statY - pageY < 0) {
                            var height = ele.height() + 2.8 * emNum
                            ele.height(height / emNum + "em")
                            ele.css("line-height", height / emNum + "em")
                            statY = pageY
                            count++
                        }
                        if (statY - pageY > 0) {
                            var height = ele.height() - 2.8 * emNum
                            ele.height(height / emNum + "em")
                            ele.css("line-height", height / emNum + "em")
                            statY = pageY
                            count--
                        }
                    }
                    e.preventDefault();
                }
            }

        });
        document.getElementsByClassName("add-class")[0].addEventListener('touchend', function (e) {
            window.location.href = `kcxq.html?col=${col}row=${row}count=${count}`
        });
    })





    //课程详情js
    function getUrlNum(name) {
        var reg = new RegExp(name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (name == 'col') {
            if (r != null) {
                return unescape(r[1]).substr(0, 1);               //不解码
            }
            return null;
        }
        if (name == 'count') {
            if (r != null) {
                return unescape(r[1]).substr(0, 1);               //不解码

            }
            return null;
        }
        if (name == 'row') {
            if (r != null) {
                var str = unescape(r[1]);
                if (!isNaN(str.substr(0, 2))) {
                    return unescape(str.substr(0, 2));
                }
                else {
                    return unescape(str.substr(0, 1));
                }
            }
            return null;
        }
        if (name == 'name') {
            if (r != null) {
                return unescape(r[1]);               //不解码

            }
            return null;
        }
    }

    var col = parseInt(getUrlNum('col'))
    var row = parseInt(getUrlNum('row'))
    var count = parseInt(getUrlNum('count'))


    //保存按钮事件
    $("#save-btn").click(
        function () {
            var zhi = document.getElementById("kc").getElementsByTagName("input")[0].value;
            var content = {
                "color": 1,
                "name":zhi,
                "row": row,
                "col": col,
                "sum": count,
            } 
       window.location.href = `kebiao.html?col=${col}row=${row}count=${count}name=${zhi}`
           
        }
        
    )




})