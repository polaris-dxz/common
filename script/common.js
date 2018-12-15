/**
 * 
 *  低版本浏览器兼容适配
 * 
 **/ 

/**
 * 
 *  键盘事件 keyCode 兼容性写法
 **/ 
function getKeyCode(e) {
    e = e ? e : (window.event ? window.event : "")
    return e.keyCode ? e.keyCode : e.which
  }

/**
 * 
 * 求窗口大小的兼容写法
 * 
 **/  

// 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
// 1600 * 525
var client_w = document.documentElement.clientWidth || document.body.clientWidth;
var client_h = document.documentElement.clientHeight || document.body.clientHeight;

// 网页内容实际宽高（包括工具栏和滚动条等边线）
// 1600 * 8
var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
// 1600 * 8
var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

// 滚动的高度
var scroll_Top = document.documentElement.scrollTop||document.body.scrollTop;

/**
 * 
 * DOM 事件处理程序的兼容写法（能力检测）
 * 
 * 
 * */ 

var eventshiv = {
    // event兼容
    getEvent: function(event) {
        return event ? event : window.event;
    },

    // type兼容
    getType: function(event) {
        return event.type;
    },

    // target兼容
    getTarget: function(event) {
        return event.target ? event.target : event.srcelem;
    },

    // 添加事件句柄
    addHandler: function(elem, type, listener) {
        if (elem.addEventListener) {
            elem.addEventListener(type, listener, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, listener);
        } else {
            // 在这里由于.与'on'字符串不能链接，只能用 []
            elem['on' + type] = listener;
        }
    },

    // 移除事件句柄
    removeHandler: function(elem, type, listener) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, listener, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, listener);
        } else {
            elem['on' + type] = null;
        }
    },

    // 添加事件代理
    addAgent: function (elem, type, agent, listener) {
        elem.addEventListener(type, function (e) {
            if (e.target.matches(agent)) {
                listener.call(e.target, e); // this 指向 e.target
            }
        });
    },

    // 取消默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};


/**
 * 找到下一个兄弟元素
 */
function getNextElement(obj) {

    //以后判断支不支持某个属性，就直接if它就行了，if为true就代表支持，为false代表不支持
    //能力判断
    if (obj.nextElementSibling) {

        return obj.nextElementSibling;

    } else {

        //从节点里面找
        var node = obj.nextSibling;

        if (node == null) {

            return null;


        } else {

            //只要不是标签都满足循环条件继续找下一个
            //只要是标签就不满足循环条件，跳出循环
            while (node.nodeType != 1) {

                node = node.nextSibling;

                if (node == null) {

                    return null;
                }
            }

            return node;
        }
    }

}


/**
 * 获取网页滚出去的距离
 */
function getScroll() {

    return {

        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 获取网页可视区域的大小
 */
function pageClient() {

    return {
        clientWidth: window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
        || 0,

        clientHeight: window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
        || 0
    }
}


/**
 * 获取元素的样式
 * @param obj 传入要获取样式的元素
 * @param attr 要获取什么样式
 */
function getStyle(obj, attr) {

    if (window.getComputedStyle) {

        return window.getComputedStyle(obj, null)[attr];

    } else {

        //肯定是IE8
        return obj.currentStyle[attr];
    }
}


/**
 * 获取事件对象相对于页面左上角的坐标
 * @param e 事件对象
 */
function getPagePoint(e) {

    e = e || window.event;

    return {
        pageX: e.clientX + getScroll().scrollLeft,
        pageY: e.clientY + getScroll().scrollTop
    }
}