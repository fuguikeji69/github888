/**
 * 公共扩展属性
 * */
const _data = {
    curLanguage: 'zhCn', //当前语言
    switchMenu: false, //移动端菜单开关
    changeLang: false, //切换语言
    resUrl: '', //资源访问地址
    isActiveHeader: false, //当前头部导航是否为活动
    isM: $(window).width() <= 768 //是否是移动端
}

/**
 * 公共扩展方法
 * */
const _methods = {
    /**
     * vue实例created页面初始化（根据业务需求进行调整扩展）
     * @param {any} 回调方法
     */
    pageInit(callback) {
        //初始化页面语言
        this.initLanguage();

        //初始化回调
        callback && callback();
    },
    /**
     * vue实例完成后，页面加载初始化(可以使用jquery等前端工具)
     * 根据业务需求进行调整扩展
     * @param {any} 回调方法
     */
    nextTickPageInit(callback) {
        var _this = this;
        //移除loading
        $('#page-loading').remove();

        //监听滚动条
        $(window).scroll(function() {
            var st = $(window).scrollTop();
            if (_this.isM) {
                _this.isActiveHeader = st >= 80;
            } else {
                _this.isActiveHeader = st >= 600;
            }
        });

        //初始化回调
        callback && callback();
    },


    /** 初始化页面语言 */
    initLanguage() {
        var curLanguage = _Local.get('curLanguage');
        if (!curLanguage) {
            curLanguage = {
                lang: 'zhCn'
            };
            _Local.set('curLanguage', curLanguage);
        }
        this.curLanguage = curLanguage.lang;
        //document.title = this.$t(`pages.${this.pageName}.title`);
    },
    /** 语言切换 */
    onLanguageChange(lang) {
        _Local.set('curLanguage', {
            lang: lang
        });
        window.location.reload();
    },
    /**
     * 数据请求
     * @param {any} url 请求Url地址
     * @param {any} data 请求数据
     * @param {any} isLoading 显示loading
     * @param {any} isExportFile 当前请求是否为导出文件
     */
    httpRequest(url, data, isLoading = true, isExportFile = false) {
        var _this = this;
        return new Promise((resolve, reject) => {
            let loading = null;
            if (isLoading && _this.$loading) {
                loading = _this.$loading({
                    lock: true,
                    text: 'Loading...',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            }
            let options = {
                url: url,
                type: 'post',
                data: data || {},
                success: (res) => {
                    isLoading && loading.close()
                    resolve(res);
                },
                error: () => {
                    isLoading && loading.close()
                    resolve(null);
                }
            };

            if (isExportFile) {
                options.xhrFields = {
                    responseType: "blob"
                };
            }

            $.ajax(options)
        });
    },
    /**
     * 错误提示
     * @param {any} name 消息内容
     */
    errorMsg(msg) {
        return this.$message({
            type: 'error',
            message: msg
        });
    },
    /**
     *  成功提示
     * @param {any} name 消息内容
     */
    successMsg(msg) {
        return this.$message({
            type: 'success',
            message: msg
        });
    },
    /**
     * 获取地址栏参数值
     * @param {any} name 参数名
     */
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },
    /**
     * 是否为空或null
     * @param {any} obj
     */
    isEmpty(obj) {
        return typeof obj == 'undefined' || obj == undefined || !obj || obj == null || obj == "";
    },
    /**
     * 移动端菜单页面跳转
     * @param {any} url 跳转地址
     * @param {any} target 打开新的选项卡：_blank
     */
    gotoPage(url, target = "") {
        if (target == '_blank') {
            window.open(url);
            return;
        }
        window.location.href = url;
    },
}