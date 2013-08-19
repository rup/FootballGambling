function tabChange(title, content) {
    $(content).not(":first").hide(); //Hide all content
    $(content).eq(0).show(); //Hide all content
    $(title).eq(0).addClass("active").show(); //Activate first tab
    $(title).each(function (i) {
        $(this).click(function (e) {
            $(title).removeClass("active"); //Remove any "curr" class
            $(this).addClass("active"); //Add "curr" class to selected tab
            $(content).hide();
            $(content).eq(i).show();
            // e.preventDefault();
        });
    });
}
function countdown(time, which) {
    time = time.replace(/\-/g, "/");
    var deadline = new Date(time);
    (function cutOne() {
        var nowTime = new Date();
        var msPerDay = 24 * 60 * 60 * 1000;
        var today = nowTime.getTime();
        window.setTimeout(cutOne, 1000);
        today = today + 1000;
        timeold = (deadline.getTime() - today);

        sectimeold = timeold / 1000;
        secondsold = Math.floor(sectimeold);
        e_daysold = timeold / msPerDay;
        daysold = Math.floor(e_daysold);

        e_hrsold = (e_daysold - daysold) * 24;
        hrsold = Math.floor(e_hrsold);
        e_minsold = (e_hrsold - hrsold) * 60;
        minsold = Math.floor((e_hrsold - hrsold) * 60);
        seconds = Math.floor((e_minsold - minsold) * 60);
        if ((hrsold > 12 || daysold > 0) || (daysold == 0 && hrsold == 0 && minsold <=10)) {
            $(".match").eq(which).find("a.btn-bet").addClass("notInTime");                  // 超过12小时不能投
        }
        if (hrsold < 10) { hrsold = "0" + hrsold }
        if (minsold < 10) { minsold = "0" + minsold }
        if (seconds < 10) { seconds = "0" + seconds }

        $(".match").eq(which).find(".title span").html("离投注时间：" + hrsold + " :" + minsold + " :" + seconds);
    })();
}
//countdown("2012/6/8 13:00:00", 0);
//countdown("2012/6/12 00:00:00", 1);
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}



var preNum;
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    var money = $(".left .num span").html();
    var totalMoney = $(".left .totalPrice").html();
    if (parseInt(money) > parseInt(totalMoney)) {
        return false;
    }
    preNum = money;
    if (key == 8 || key == 46
        || key == 37 || key == 39) {
        return true;
    }
    else if (key > 95 && key < 106 && money.length < totalMoney.length && preNum.length < totalMoney.length) {
        return true;
    }
    else if (key < 48 || key > 57 || money.length > totalMoney.length || preNum.length >= totalMoney.length) {
        return false;
    }
    else return true;
}
function validateUp() {
    var money = $(".left .num span").html();
    var totalMoney = $(".left .totalPrice").html();
    if (parseInt(money) > parseInt(totalMoney)) {
        $(".left .num span").html(preNum);
    }
}

function scroller(opt) {
    var self = this;
    var timer, timer2;

    var con_name = opt.id;
    this.cb = opt.callback;
    $("#" + con_name).after("<div></div>");
    this.con = document.getElementById(con_name);
    this.con.style.overflow = "hidden";
    this.con.style.position = "relative";

    this.scroll_size = opt.moveSize;

    this.cntchange(true);

    this.timer2 = window.setInterval(function () {
        self.is_show_scroll && self.is_bottom();
    },
        5);

    this.clearselect = window.getSelection ?
        function () {
            window.getSelection().removeAllRanges();
        } : function () {
            document.selection.empty();
        };
}

scroller.prototype = {
    cntchange: function (flag) {
        var con = flag ? this.con : this.scroll_shower;
        var cds = con.childNodes;
        this.cdsHeight = 0;
        for (var i = 0; i < cds.length; i++) {
            if (cds[i].nodeType == 3) continue;
            this.cdsHeight += cds[i].offsetHeight;
        }

        if (this.scroll_scroller && !this.scroll_scroller.offsetHeight == this.cdsHeight) {
            return;
        } else {
            var conW = this.con.offsetWidth;
            var conH = this.con.offsetHeight;

            var is_show_scroll;
            is_show_scroll = !(this.cdsHeight <= conH);
            this.is_show_scroll = is_show_scroll;

            var wheelH = is_show_scroll && Math.ceil(conH / this.cdsHeight * (conH - 40));

            var top = !flag ? parseInt(this.scroll_shower.style.top) : 0;

            var html = con.innerHTML;
            this.con.innerHTML = "";
            this.con.innerHTML =
                '<div style="width:' + conW + 'px; height:' + conH + 'px; position:relative;">' +
                    '<div style="width:' + (is_show_scroll ? (conW - 20) : conW) + 'px; height:' + conH + 'px;overflow:hidden; position:absolute; left:0; top:0; word-wrap:break-word;" class="aa" id="scroll_container">' +

                    '<div style="position:absolute;top:0;" id="scroll_shower">' +
                    html +
                    '</div>' +
                    '</div>' +
                    (is_show_scroll ? ('<div style="position:absolute; left:' + (conW - 20) + 'px; top:0; width:17px; height:' + conH + 'px; -moz-user-focus:ignore;-moz-user-input:disabled;-moz-user-select:none;" id="scroll_scroller">' +
                        '<div style="position:absolute; background:#999999; width:17px; height:17px; left:0; top:0;" id="scroll_up">' +
                        '</div>' +
                        '<div style="position:absolute; width:17px; height:' + wheelH + 'px; background:#000000; left:0; top:17px;" id="scroll_bar">' +
                        '</div>' +
                        '<div style="position:absolute; background:#999999; width:17px; height:17px; left:0; bottom:0;" id="scroll_down">' +
                        '</div>' +
                        '</div>') : "") +
                    '</div>';

            if (is_show_scroll) {
                if (this.con.nextSibling) {
                    this.scroll_container = document.getElementById("scroll_container"); // 容器
                    this.scroll_shower = document.getElementById("scroll_shower"); // 显示的内容
                    this.scroll_scroller = document.getElementById("scroll_scroller"); // 滚动条容器
                    this.scroll_up = document.getElementById("scroll_up"); // 上翻按钮
                    this.scroll_down = document.getElementById("scroll_down"); // 下翻按钮
                    this.scroll_bar = document.getElementById("scroll_bar"); // 滑动块
                    //this.scroll_top = document.getElementById("scroll_top"); // 滑动块
                    //this.scroll_bottom = document.getElementById("scroll_bottom"); // 滑动块
                }

                this.scroll_bar.ondrag && (this.scroll_bar.ondrag = function () {
                    return false;
                });
                this.scroll_bar.oncontextmenu && (this.scroll_bar.oncontextmenu = function () {
                    return false;
                });
                this.scroll_bar.onselectstart && (this.scroll_bar.onselectstart = function () {
                    return false;
                });

                if (window.addEventListener) {
                    //this.scroll_top.addEventListener("mouseover", this.bind(this.upper,this), true);
                    //this.scroll_bottom.addEventListener("mouseover", this.bind(this.downer,this), true);
                    //this.scroll_top.addEventListener("mouseout", this.bind(this.clear,this), true);
                    //this.scroll_bottom.addEventListener("mouseout", this.bind(this.clear,this), true);

                    this.scroll_up.addEventListener("mousedown", this.bind(this.upper, this), true);
                    this.scroll_down.addEventListener("mousedown", this.bind(this.downer, this), true);
                    this.scroll_bar.addEventListener("mousedown", this.bind(this.barmove, this), true);
                    this.scroll_scroller.addEventListener("mousedown", this.bind(this.outbar, this), true);
                    this.scroll_shower.addEventListener("DOMMouseScroll", this.bind(this.wheel, this), true);
                    this.scroll_scroller.addEventListener("DOMMouseScroll", this.bind(this.wheel, this), true);
                    this.scroll_shower.addEventListener("mousewheel", this.bind(this.wheel, this), true);
                    this.scroll_scroller.addEventListener("mousewheel", this.bind(this.wheel, this), true);
                    document.addEventListener("mouseup", this.bind(this.clear, this), true);

                } else {
                    //this.scroll_top.attachEvent("onmouseover", this.bind(this.upper,this));
                    //this.scroll_bottom.attachEvent("onmouseover", this.bind(this.downer,this));
                    //this.scroll_top.attachEvent("onmouseout", this.bind(this.clear,this));
                    //this.scroll_bottom.attachEvent("onmouseout", this.bind(this.clear,this));

                    this.scroll_up.attachEvent("onmousedown", this.bind(this.upper, this));
                    this.scroll_down.attachEvent("onmousedown", this.bind(this.downer, this));
                    this.scroll_bar.attachEvent("onmousedown", this.bind(this.barmove, this));
                    this.scroll_scroller.attachEvent("onmousedown", this.bind(this.outbar, this));
                    this.scroll_shower.attachEvent("onmousewheel", this.bind(this.wheel, this));
                    this.scroll_scroller.attachEvent("onmousewheel", this.bind(this.wheel, this));
                    document.attachEvent("onmouseup", this.bind(this.clear, this));
                }

                this.moveTo && this.moveTo(-top);
            }

        }
    },
    bind: function (fun, obj) {
        return function () {
            fun.apply(obj, arguments);
        }
    },
    append: function (html) {
        if (this.scroll_shower) {
            this.scroll_shower.innerHTML += html;
            this.cntchange();
        } else {
            this.con.innerHTML += html;
            this.cntchange(true);
        }

    },
    moveTo: function (top) {
        if (top <= 0) {
            this.scroll_shower.style.top = "0px";
        } else if (top >= this.scroll_shower.offsetHeight - this.scroll_container.offsetHeight) {
            this.scroll_shower.style.top = this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight + "px";
        } else {
            this.scroll_shower.style.top = -top + "px";
        }
        this.resetright();
    },
    is_bottom: function () { // 检测是不是位于底部了
        if (this.scroll_shower.offsetTop <= this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight) {
            this.cb && (this.cb.call(this), this.cntchange());
            return true;
        }
        return false;
    },
    resetright: function () {
        var a = this.scroll_shower.offsetTop / (this.scroll_shower.offsetHeight - this.scroll_container.offsetHeight);
        var b = this.scroll_scroller.offsetHeight - this.scroll_down.offsetHeight - this.scroll_bar.offsetHeight - this.scroll_up.offsetHeight;
        var c = this.scroll_up.offsetHeight + (0 - b * a);
        this.scroll_bar.style.top = c + "px";
    },
    resetleft: function () {
        var a = (this.scroll_bar.offsetTop - this.scroll_up.offsetHeight) / (this.scroll_scroller.offsetHeight - this.scroll_up.offsetHeight - this.scroll_down.offsetHeight - this.scroll_bar.offsetHeight);
        var b = this.scroll_shower.offsetHeight - this.scroll_container.offsetHeight;
        var c = 0 - (b * a);
        this.scroll_shower.style.top = c + "px";
    },
    move: function (a) {
        if (this.scroll_shower.offsetTop + a <= 0 && this.scroll_shower.offsetTop + a >= this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight) {
            this.scroll_shower.style.top = (this.scroll_shower.offsetTop + a) + "px";
        } else if (this.scroll_shower.offsetTop + a > 0) {
            this.scroll_shower.style.top = 0 + "px";
        } else if (this.scroll_shower.offsetTop + a < this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight) {
            this.scroll_shower.style.top = this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight + "px";
        }
        this.resetright();
    },
    upper: function () {
        this.clear();
        var self = this;
        this.timer = window.setInterval(function () {
            self.move(self.scroll_size);
        },
            5);
    },
    downer: function () {
        this.clear();
        var self = this;
        this.timer = window.setInterval(function () {
            self.move(-self.scroll_size);
        },
            5);
    },
    clear: function () {
        window.clearInterval(this.timer);
    },
    scroll_wheel: function () {
        if (this.scroll_container.offsetHeight < this.scroll_shower.offsetHeight) {
            this.scroll_scroller.style.display = "block";
        } else {
            this.scroll_scroller.style.display = "none";
        }
    },
    gotobottom: function () {
        var a = (this.scroll_shower.offsetHeight > this.scroll_container.offsetHeight) ? this.scroll_container.offsetHeight - this.scroll_shower.offsetHeight : 0;
        this.scroll_shower.style.top = a + "px";
        this.scroll_wheel();
        this.resetright();
    },
    wheel: function () {
        var e = arguments[0] || window.event;
        var act = e.wheelDelta ? e.wheelDelta / 120 : (0 - e.detail / 3);
        this.clear();
        this.move(80 * act);
        try {
            e.preventDefault();
        } catch (e) { }
        return false;
    },
    barmove: function () { // 记录当时鼠标的位置与
        this.clearselect;
        var mover = this;
        this.can_move_top = this.scroll_bar.offsetTop - this.scroll_up.offsetHeight; // 这个滚动条上方的可移动距离
        this.can_move_bottom = this.scroll_scroller.offsetHeight - this.scroll_bar.offsetTop - this.scroll_down.offsetHeight - this.scroll_bar.offsetHeight; // 这个滚动条下方的可移动距离
        this.e = arguments[0] || window.event;
        this.starts = this.e.clientY;
        this.starttop = this.scroll_bar.offsetTop;
        var self = this;
        this.drag = function () {
            this.e = arguments[0] || window.event;
            this.ends = this.e.clientY;
            this.dis = this.ends - mover.starts;
            if (this.dis < (0 - mover.can_move_top)) this.dis = 0 - mover.can_move_top;
            if (this.dis > mover.can_move_bottom) this.dis = mover.can_move_bottom;
            self.scroll_bar.style.top = (mover.starttop + this.dis) + "px";
            self.resetleft();
            self.clearselect;
        }
        this.cleardrag = function () {
            if (window.removeEventListener) {
                document.removeEventListener("mousemove", mover.drag, true);
            } else {
                document.detachEvent("onmousemove", mover.drag);
            }
            this.clearselect;
        }
        this.add_listener = function () {
            if (window.addEventListener) {
                document.addEventListener("mousemove", mover.drag, true);
                document.addEventListener("mouseup", mover.cleardrag, true);
            } else {
                document.attachEvent("onmousemove", mover.drag);
                document.attachEvent("onmouseup", mover.cleardrag);
            }
        }
        this.add_listener();
    },
    outbar: function () {
        var e = arguments[0] || window.event;
        var obj = e.srcElement ? e.srcElement : e.target;
        if (obj.id == this.scroll_scroller.id) {
            var y = e.offsetY || e.layerY;
            var new_top = y - 0.5 * this.scroll_bar.offsetHeight;
            if (y - this.scroll_up.offsetHeight < 0.5 * this.scroll_bar.offsetHeight) new_top = this.scroll_up.offsetHeight;
            if (this.scroll_scroller.offsetHeight - y - this.scroll_down.offsetHeight < 0.5 * this.scroll_bar.offsetHeight) new_top = this.scroll_scroller.offsetHeight - this.scroll_down.offsetHeight - this.scroll_bar.offsetHeight;
            this.scroll_bar.style.top = new_top + "px";
            this.resetleft();
        }
    }

}

$(document).ready(function () {

    tabChange(".page-ssjc .ulinks li", ".page-ssjc .group");

    $(".body .match .main").each(function () {
        $(this).hover(
            function () {
                $(this).addClass("curr");
            }, function () {
                $(this).removeClass("curr");
            })
    });

    $("div.dialog .last").click(function(){
       $(this).closest("div.dialog").hide();
        $(".mask").hide();
    });

    if ($(".page-spf").size()) {
        $(".left .team-bet ul li a").each(function (i) {
            $(this).bind("click", function () {
                $(this).closest("ul").find("a").removeClass("check");
                $("#Status").val(i);
                $(this).toggleClass("check");
                var leftTeamId = $(".fn-left img").attr("teamid");
                var rightTeamId = $(".fn-right img").attr("teamid");
                if (i == 0) {
                    $("#TeamID").val(leftTeamId);
                } else if (i == 1) {
                    $("#TeamID").val("");
                } else {
                    $("#TeamID").val(rightTeamId);
                }

            })
        });

        $(".page-spf .btn-b").bind("click", function (e) {
            if ($("#Status").val() != "") {
                $(".mask, .dialog-a").show();
            } else {
            }
            e.preventDefault();
        });
        var prob = parseInt($("#doubleScore").val());
        var probId = $("#AgainstID").val();
        var probText = [" <b>双倍积分</b>大小球", "<b>双倍积分</b>谁先进球"];
        if (prob == 1) {
            $(".team-vs a").attr("href", "GuessFirstGoal.aspx?AgainstID=" + probId + "&meun=4");
            $(".team-vs a").html(probText[1]);
        } else if (prob == 2) {
            $(".team-vs a").attr("href", "GuessGoals.aspx?AgainstID=" + probId + "&meun=4");
            $(".team-vs a").html(probText[0]);
        } else {
            $(".team-vs a").hide();
        }
        $(".dialog-b .first").click(function (e) {
            $(this).closest(".dialog").hide();
            $(".dialog-d").show();
            Bet();
            var url = "http://e.weibo.com/1784571423/app_1755208418";
            var teamName = [$("#team_name_1").text(), $("#team_name_2").text()];

            var text;
            if ($("#Status").val() == 0) {
                text = "“" + teamName[0] + "对阵" + teamName[1] + "，谁将主宰绿茵场，成为这场比赛的英雄？我刚刚投了" + teamName[0] + "一票，支持" + teamName[0] + "！你支持谁呢？快来“投你索好”，为你支持的球队鼓劲加油吧！” " + url;
            } else if ($("#Status").val() == 2) {
                text = "“" + teamName[0] + "对阵" + teamName[1] + "，谁将主宰绿茵场，成为这场比赛的英雄？我刚刚投了" + teamName[1] + "一票，支持" + teamName[1] + "！你支持谁呢？快来“投你索好”，为你支持的球队鼓劲加油吧！” " + url;
            } else {
                text = "平局 " + url;
            }

            $(".dialog-d .main p").text(text);
            $(".dialog-d .main img").attr("src", RondomPic());

            e.preventDefault();
        });

        $(".dialog-b .last").bind("click", function (e) {
            $(this).closest(".dialog").hide();
            e.preventDefault();
        });

        $(".model-a .btn-c").bind("click", function (e) {
            var money = $("b.totalPrice").text();
            if(money < 1000){
                $("#dialog-c-alert,.mask").show();
            }else{
            $(".dialog-c-1").show();
            $(".mask").show();
            }
            e.preventDefault();
        });
        $(".dialog-c-1 .first").bind("click", function (e) {
            var randomNum = Math.random();
            var leftImg = $(".fn-left img");
            var rightImg = $(".fn-right img");
            var teamImg = randomNum <= 0.5 ? leftImg : rightImg;
            $(".dialog-c-2 .title span img").attr({ "teamid": teamImg.attr("teamid"), "src": teamImg.attr("src") });
            $(".dialog-c-2").show();
            $(".dialog-c-1").hide();
            e.preventDefault();
        });
        $(".dialog-c-1 .last").bind("click", function (e) {
            $(".dialog-c-1").hide();
            $(".mask").hide();
            e.preventDefault();
        });
        $(".dialog-c-2 .btn-d").bind("click", function (e) {
            var BetTeamId = $(this).closest(".dialog").find(".title span img").attr("teamid");
            $("#TeamID").val(BetTeamId);
            $("#IsBaoluo").val("1");
            $(".dialog-c-2").hide();
            $(".mask").hide();
            Bet();
            e.preventDefault();
        });
        $(".dialog-licence .btn-d").bind("click", function (e) {
            BindIDCard()
            e.preventDefault();
        });

    }

    /****  page-ssjc  ****/
    if ($(".page-ssjc").size()) {
        $(".left .btn-b").bind("click", function (e) {
            var checkNum = $("#Status").val();
            if (checkNum == "") {
                return false;
            } else {
                var money = $(this).prev(".num").find("span").text();
                $(".dialog .num span").text(money);
                $(".dialog .team-bet ul li a")
                    .removeClass("check")
                    .eq(checkNum)
                    .addClass("check");
                $(".dialog-a, .dialog-daxiao, .mask").show();
                var imgSrc;
                if (checkNum == "0") {
                    imgSrc = $(".fn-left img").attr("src");
                    $(".dialog-b .title span img").attr("src", imgSrc);
                } else if (checkNum == "2") {
                    imgSrc = $(".fn-right img").attr("src");
                    $(".dialog-b .title span img").attr("src", imgSrc);
                } else { }

            }
            e.preventDefault();
        });

        $(".dialog-b .last").click(function () {
            $(".mask").hide();
        });

        $(".left .add .num span").keydown(validateNumber);  //num only
        $(".left .add .num span").keyup(validateUp);  //num only
        var addInterval;
        $(".left .add .num label").each(function (i) {
            $(this).bind("click", function () {
                var money = $(this).siblings("span").text();
                money = parseInt(money);
                var totalMoney = $(".left .totalPrice").html();
                //totalMoney = totalMoney-100;
                if (i == 0) {
                    money -= 100;
                    if (money < 0) { money = 0; }
                } else if (money >= totalMoney) {
                    return false;
                }
                else {
                    money += 100;
                }

                if (money >= 2000) {
                    money = 2000;
                    $(this).siblings("span").text(money);
                    return false;
                }
                $(this).siblings("span").text(money);
            });
            $(this).mousedown(function () {
                var self = $(this);
                addInterval = window.setInterval(function () {
                    self.trigger("click");
                }, 100)
            });
            $(this).bind("mouseup mouseleave", function () {
                window.clearInterval(addInterval);
            });
        });
        $(".dialog-d .btn-e").bind("click", function (e) {
            var text = $(this).closest(".dialog").find(".main p").text();
            var imgSrc = $(this).closest(".dialog").find(".main img").attr("src");
            publish(text, imgSrc);
            e.preventDefault();
        });
        //        $(".dialog-d-2 .btn-d:first").bind("click", function (e) {
        //            e.preventDefault();
        //        });
        $(".dialog-d-2 .btn-d:last").bind("click", function () {
            $(this).closest(".dialog").find(".ui-close").trigger("click");
        });
    }

    if ($(".page-jc-frontpage").size()) {
        $(".dialog-check .btn-d:last").bind("click", function () {
            $(this).closest(".dialog").find(".ui-close").trigger("click");
            $(".mask").hide();
        });
        $("a.notInTime").live("click", function (e) {
            $(".dialog-check,div.mask").show();
            e.preventDefault();
        });
    }


    $(".ui-close").bind("click", function (e) {
        $(this).closest(".dialog").hide();
        $(".mask").hide();
        e.preventDefault();
    });

    $(".dialog .btn-b-s").bind("click", function (e) {
        var gold = $(this).closest(".add").find("span").html();
        $(".dialog-b .main p span").text(gold + "S");
        $(this).closest(".dialog").hide();
        $(".dialog-b").show();
        e.preventDefault();
    });

    //我的更衣室 首页
    if ($(".page-gys").size()) {
        function showdialog() {
            $(".dialog").show();
            $(".mask").show();
        }
        $(".dialog .btn-d").bind("click", function () {
            $(this).closest(".dialog").hide();
            $(".mask").hide();
        });
    }
    //end

    //page-daxiao page-sxjq
    if ($(".page-daxiao").size() || $(".page-sxjq").size()) {
        $(".left .bar li a").each(function (i) {
            $(this).hover(
                function () {
                    $(this).closest(".bar").next(".balls").find("img").eq(i).removeClass("transp");
                }, function () {
                    if (!$(this).is(".check")) {
                        $(this).closest(".bar").next(".balls").find("img").eq(i).addClass("transp");
                    }
                });
            $(this).bind("click", function (e) {
                $("#Status").val(i);
                $(this).parent().parent().find("a").removeClass("check")
                    .closest(".bar").next(".balls").find("img").addClass("transp");

                $(this)
                    .addClass("check")
                    .closest(".bar").next(".balls").find("img").eq(i).removeClass("transp");
                e.preventDefault();
            });
        });

        $(".left .btn-b").bind("click", function (e) {
            var checkNum = $("#Status").val();
            if (checkNum == "0") {
                $(".dialog-daxiao .bar li a").removeClass("check").eq(0).addClass("check");
                $(".dialog-daxiao .balls img").addClass("transp").eq(0).removeClass("transp");
            } else if (checkNum == "1") {
                $(".dialog-daxiao .bar li a").removeClass("check").eq(1).addClass("check");
                $(".dialog-daxiao .balls img").addClass("transp").eq(1).removeClass("transp");
            } else { }
            e.preventDefault();
        });

        $(".dialog-b .first").bind("click", function (e) {
            $(this).closest(".dialog").hide();
            $(".mask").hide();
            Bet();
            e.preventDefault();
        });

        $(".dialog-b .last").bind("click", function (e) {
            $(this).closest(".dialog").hide();
            $(".mask").hide();
            e.preventDefault();
        });
        $(".dialog-daxiao .btn-b-s").bind("click", function (e) {
            $(this).closest(".dialog").hide();
            $(".dialog-b").show();
            e.preventDefault();
        });

    }


    //page-friendscore
    if ($(".page-friendscore").size() > 0) {
        $(".dialog .img li a").each(function () {
            $(this).bind("click", function (e) {
                $(this).find(".tag").toggle();
                e.preventDefault();
            })
        });
        $(".right .banner a").bind("click", function (e) {
            $(".dialog").show();
            $(".mask").show();
            e.preventDefault();
        })
    }
    //page-weibolist
    if ($(".page-weibolist").size()) {

        $('.selectall').click(function () {
            $('.model .left input').attr('checked', this.checked);
        });
    }

    if ($(".page-fontpage").size()) {
        $(".dialog-gold .btn-d").bind("click", function () {
            $(this).closest(".dialog").hide();
            $(".dialog-d").show();
        });
        $(".dialog-fake .btn-d").bind("click", function () {
            $(this).closest(".dialog").hide();
            $(".mask").hide();
            setCookie("info", "gotIt", 30);
        });

        var imgPath = 'static/img/';
        var imgSrc = ['img1.png', 'img2.png'];
        var imgTxt = ['三星Smart TV<br /> 带你享受视觉盛宴', '欧洲杯获胜国旅游<br/>索兰托六个月免费使用权'];
        var timer = 3000;
        var current = 0;
        var len = imgSrc.length;

        setInterval(function () {
            if (current > len - 1) current = 0;

            $(".top_img img").attr('src', imgPath + imgSrc[current]);

            $(".top_text a").html(imgTxt[current]);
            current++;
        }, timer);

    }




});
