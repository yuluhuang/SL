//印象墙效果代码
$.fn.yinxiangqiang = function (div_id, list, w, h) {
    var ads = list;
    var config = {
        "n": "ugmbbc_cpr",
        "rsi1": h, "rsi0": w, //container高，宽
        "rss0": "#e8e8e8",
        "rss1": "#e8e8e8",
        "conOP": 1,
        "rss2": "#0000FF",
        "rss6": "#e10900",
        "rsi5": 4,
        "at": "103",
        "cad": 1,
        "lunum": 6,
        "titFS": 14,
        "titFF": "%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91",
        "titTA": "left",
        "conBW": 0,
        "hn": 4, "wn": 5,
        "iteBCA": //看起来是可选颜色
		"#ad68d7,#71cdc9,#49c081,#4792ff,#f67abe,#6cc3df,#d381e2,#ffbb39,#a4de9e,#cf8ef6,#79bebb,#5feda2,#76a8f0,#f490c7,#7cd7f4,#e9a1f6,#fbd010,#c2f5bc"
    };
    var thisPage = {
        cWidth: config.rsi0, //宽
        cHeight: config.rsi1, //高
        minBlockHeight: 25, //最小高
        minBlockWidth: 80, //最小宽
        blockBorderWidth: 2, //边框高
        block1Scale: 10,
        block2Scale: 10,
        flag: false,
        initialize: function () {
            var a = this.calCellSize();
            this.rowNum = a.rowNum; //行数
            this.colNum = a.colNum; //列数
            this.blockHeight = Math.floor(this.cHeight / this.rowNum) - this.blockBorderWidth; //块的真正高度
            this.blockWidth = Math.floor(this.cWidth / this.colNum) - this.blockBorderWidth;
            this.blockArr = new Array();
            this.blockObj = {
                block1: {
                    initNum: Math.round(this.rowNum * this.colNum / this.block1Scale),
                    readerNum: 0
                },
                block2: {
                    initNum: Math.ceil(this.rowNum * this.colNum / this.block2Scale),
                    readerNum: 0
                }
            };
            if (this.rowNum * this.colNum < 20) {
                this.blockBorderWidth = 1
            }
            if (this.colNum < 2) {
                this.blockObj.block1.initNum = 0
            }
            if (this.rowNum < 2) {
                this.blockObj.block1.initNum = this.blockObj.block2.initNum = 0
            }
            this.iteBCA = config.iteBCA.split(",");
            this.adContainer = document.getElementById(div_id);
            this.adContainer.style.width = config.rsi0 + "px";
            this.adContainer.style.height = config.rsi1 + "px"
        },
        calCellSize: function () {
            var i = {};
            var c = Math.floor(this.cHeight / this.minBlockHeight);
            var d = Math.floor(this.cWidth / this.minBlockWidth);
            var f = c * d;
            var b = Math.round(f / this.block1Scale);
            var h = Math.ceil(f / this.block2Scale);
            var g = (2 * 2 - 1) / this.block1Scale + (2 * 1 - 1) / this.block2Scale;
            var a = ads.length / (1 - g);
            if (a < f) {
                var e = Math.sqrt(a / f);
                c = Math.floor(this.cHeight * e / this.minBlockHeight);
                d = Math.floor(this.cWidth * e / this.minBlockWidth)
            }
            i.rowNum = c;
            i.colNum = d;
            return i
        },
        render: function () {
            this.initialize();
            for (k = 0, l = ads.length; k < l; k++) {
                this.flag = false;
                var a = document.createElement("a");
                var wenben = ads[k].title;
                a.innerHTML = wenben;
                a.title = ads[k].desc;
                a.setAttribute('onclick', 'yinxiang(\"' + wenben + '\")');
                if (this.blockObj.block1.readerNum != this.blockObj.block1.initNum) {
                    this.blockObj.block1.readerNum++;
                    this.reanderAd(this.renderBlock1, 1, 1, a)
                } else {
                    if (this.blockObj.block2.readerNum != this.blockObj.block2.initNum) {
                        this.blockObj.block2.readerNum++;
                        this.reanderAd(this.renderBlock2, 1, 0, a)
                    } else {
                        this.reanderAd(this.renderBlock3, 0, 0, a)
                    }
                }
            }
        },
        reanderAd: function (f, b, e, d) {
            for (var c = 0; c < 300; c++) {
                var a = Math.floor(Math.random() * (this.rowNum - b));
                var g = Math.floor(Math.random() * (this.colNum - e));
                if (f(a, g, d)) {
                    break
                }
            }
            if (c == 300) {
                for (var a = 0; a < this.rowNum - this.blockNeedRowNum; a++) {
                    for (var g = 0; g < this.colNum - this.blockNeedColNum; g++) {
                        if (f(a, g, d)) {
                            a = this.rowNum;
                            break
                        }
                    }
                }
            }
            if (!this.flag) {
                for (var a = 0; a < this.rowNum; a++) {
                    for (var g = 0; g < this.colNum; g++) {
                        if (this.renderBlock3(a, g, d)) {
                            a = this.rowNum;
                            break
                        }
                    }
                }
            }
        },
        renderBlock1: function (a, d, b) {
            thisPage.blockArr[a] = thisPage.blockArr[a] || [];
            thisPage.blockArr[a + 1] = thisPage.blockArr[a + 1] || [];
            thisPage.blockArr[a + 2] = thisPage.blockArr[a + 2] || [];
            thisPage.blockArr[a + 3] = thisPage.blockArr[a + 3] || [];
            thisPage.blockArr[a - 1] = thisPage.blockArr[a - 1] || [];
            thisPage.blockArr[a - 2] = thisPage.blockArr[a - 2] || [];
            if ((thisPage.blockArr[a - 1][d] == "block1" && thisPage.blockArr[a - 1][d + 1] == "block1" && thisPage.blockArr[a - 2][d] == "block1" && thisPage.blockArr[a - 2][d + 1] == "block1") || (thisPage.blockArr[a + 2][d] == "block1" && thisPage.blockArr[a + 2][d + 1] == "block1" && thisPage.blockArr[a + 3][d] == "block1" && thisPage.blockArr[a + 3][d + 1] == "block1") || (thisPage.blockArr[a][d + 2] == "block1" && thisPage.blockArr[a][d + 3] == "block1" && thisPage.blockArr[a + 1][d + 2] == "block1" && thisPage.blockArr[a + 1][d + 3] == "block1") || (thisPage.blockArr[a][d - 1] == "block1" && thisPage.blockArr[a][d - 2] == "block1" && thisPage.blockArr[a + 1][d - 1] == "block1" && thisPage.blockArr[a + 1][d - 2] == "block1")) {
                return false
            }
            if (!thisPage.blockArr[a][d] && !thisPage.blockArr[a][d + 1]) {
                if (!thisPage.blockArr[a + 1][d] && !thisPage.blockArr[a + 1][d + 1]) {
                    thisPage.blockArr[a][d] = thisPage.blockArr[a][d + 1] = thisPage.blockArr[a + 1][d] = thisPage.blockArr[a + 1][d + 1] = "block1";
                    b.className = "block1";
                    var c = Math.floor(Math.random() * 1);
                    thisPage.addAdStyle(a, d, 2, 2, b, c);
                    thisPage.flag = true;
                    return true
                }
            }
            return false
        },
        renderBlock2: function (a, e, c) {
            thisPage.blockArr[a] = thisPage.blockArr[a] || [];
            thisPage.blockArr[a + 1] = thisPage.blockArr[a + 1] || [];
            thisPage.blockArr[a + 2] = thisPage.blockArr[a + 2] || [];
            thisPage.blockArr[a + 3] = thisPage.blockArr[a + 3] || [];
            thisPage.blockArr[a - 1] = thisPage.blockArr[a - 1] || [];
            thisPage.blockArr[a - 2] = thisPage.blockArr[a - 2] || [];
            if ((thisPage.blockArr[a - 1][e] == "block2" && thisPage.blockArr[a - 2][e] == "block2") || (thisPage.blockArr[a + 2][e] == "block2" && thisPage.blockArr[a + 3][e] == "block2") || (thisPage.blockArr[a][e - 1] == "block2" && thisPage.blockArr[a + 1][e - 1] == "block2") || (thisPage.blockArr[a][e + 1] == "block2" && thisPage.blockArr[a + 1][e + 1] == "block2")) {
                return false
            }
            if (!thisPage.blockArr[a][e] && !thisPage.blockArr[a + 1][e]) {
                thisPage.blockArr[a][e] = thisPage.blockArr[a + 1][e] = "block2";
                var b = Math.ceil(c.innerHTML.replace(/[^\x00-\xff]/g, "ci").length / 2);
                c.className = "block2 block2_" + b;
                var d = Math.floor(Math.random() * 2) + 1;
                thisPage.addAdStyle(a, e, 2, 1, c, d);
                thisPage.flag = true;
                return true
            }
            return false
        },
        renderBlock3: function (a, d, b) {
            thisPage.blockArr[a] = thisPage.blockArr[a] || [];
            if (!thisPage.blockArr[a][d]) {
                thisPage.blockArr[a][d] = 1;
                b.className = "block3";
                var c = Math.floor(Math.random() * (thisPage.iteBCA.length / 2 - 3)) + 3;
                thisPage.addAdStyle(a, d, 1, 1, b, c);
                thisPage.flag = true;
                return true
            }
            return false
        },
        addAdStyle: function (a, g, e, c, d, f) {
            d.style.top = (thisPage.blockHeight + thisPage.blockBorderWidth) * a + "px";
            d.style.left = (thisPage.blockWidth + thisPage.blockBorderWidth) * g + "px";
            d.style.height = d.style.lineHeight = thisPage.blockHeight * e + thisPage.blockBorderWidth * (e - 1) + "px";
            d.style.width = thisPage.blockWidth * c + thisPage.blockBorderWidth * (c - 1) + "px";
            var b = thisPage.iteBCA[f];
            d.style.backgroundColor = b;
            thisPage.adContainer.appendChild(d);
            if (a + (e - 1) == (thisPage.rowNum - 1)) {
                d.style.height = d.style.lineHeight = thisPage.cHeight - (thisPage.blockHeight + thisPage.blockBorderWidth) * a + "px"
            }
            if (g + (c - 1) == (thisPage.colNum - 1)) {
                d.style.width = thisPage.cWidth - (thisPage.blockWidth + thisPage.blockBorderWidth) * g + "px"
            }
            d.onmouseover = function () {
                d.style.backgroundColor = thisPage.iteBCA[f + thisPage.iteBCA.length / 2]
            };
            d.onmouseout = function () {
                d.style.backgroundColor = b
            }
        }
    };
    thisPage.render();
};

//各类文档用PDF显示效果

var swfVersionStr = "10.0.0";
var xiSwfUrlStr = "playerProductInstall.swf";
var x_flashvars = {
    SwfFile: "",
    Scale: 0.6, //比例 
    ZoomTransition: "easeOut", //变焦过度可以设置的参数：easenone, easeout, linear, easeoutquad
    ZoomTime: 0.5, //缩放时间
    ZoomInterval: 0.1, //缩放滑竿缩放比例
    FitPageOnLoad: false, //
    FitWidthOnLoad: true, //
    PrintEnabled: true, //能否打印
    FullScreenAsMaxWindow: false, //设置为true后，单击最大化将新打开一个flexpaper窗口，而不是真正的最大化
    ProgressiveLoading: true, //加载进度

    PrintToolsVisible: true, //打印工具可见性
    ViewModeToolsVisible: true, //视图模式工具可见性
    ZoomToolsVisible: true, //缩放工具可见性
    FullScreenVisible: true, //全屏按钮可见性
    NavToolsVisible: true, //页面导航可见性
    CursorToolsVisible: true, //光标工具可见性
    SearchToolsVisible: true, //搜索工具可见性

    localeChain: "zh_CN"//语言设置，en_US(英语)
};

var x_params = {

}
x_params.wmode= "opaque";
x_params.quality = "high";
x_params.bgcolor = "#ffffff";
x_params.allowscriptaccess = "sameDomain";
x_params.allowfullscreen = "true";
var x_attributes = {};
x_attributes.id = "FlexPaperViewer";
x_attributes.name = "FlexPaperViewer";

//视频插件改用jwplayer

//视频播放效果
// Collect query parameters in an object that we can
// forward to SWFObject:

//var pqs = new ParsedQueryString();//ParsedQueryString.js
//var parameterNames = pqs.params(false);
//var parameters = { id: "1"
//    			, configuration: "assets/configuration.xml"
//    			, url: ""
//    			, backgroundColor: "0x000000"
//    			, autoHideControlBar: "false"
//    			, autoSwitchQuality: "true"
//    			, autoPlay: "true"
//};

