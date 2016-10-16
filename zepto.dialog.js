/**
 * Created by Downsview on 2016/10/16.
 */

;(function ($) {
  var Dialog = function (config) {
    //默认配置参数
    this.config = {
      //弹出框宽高
      width: "auto",
      height: "auto",
      //弹出框类型
      type: "ok",
      //弹出框中按钮类型及回调
      buttons: null,
      //弹出框延迟多久关闭
      delay: null,
      //弹出框延迟关闭后的回调函数
      delayCallback: null,
      //弹出框提示消息
      message: null,
      //弹出框遮罩透明度
      maskOpacity: null,
      //点击遮罩层是否可以关闭
      maskClose: null,
      //弹出框动画效果
      effect: null
    };

    if (config && $.isPlainObject(config)) {
      $.extend(this.config, config);
    }
    else {
      //没有传递参数
      this.isConfig = true;
    }

    //创建基本的DOM
    this.body = $("body");
    //创建遮罩层
    this.mask = $('<div class="g-dialog-container"></div>');
    //创建弹出框
    this.win = $('<div class="dialog-window"></div>');
    //创建弹出框头部
    this.winHeader = $('<div class="dialog-header"></div>');
    //创建弹出框头部字体图标
    this.icon = $('<i class="iconfont"></i>');
    //创建弹出框中部
    this.winBody = $('<div class="dialog-body"></div>');
    //创建弹出框尾部
    this.winFooter = $('<div class="dialog-footer"></div>');
    //渲染DOM
    this.create();
  };

  Dialog.zIndex = 10000;

  Dialog.prototype = {
    //重设构造函数
    constructor: Dialog,

    animate: function () {
      var self = this;
      this.win.css('-webkit-transform', 'scale(0,0)');
      window.setTimeout(function() {
        self.win.css('-webkit-transform', 'scale(1,1)');
      }, 100);
    },

    create: function () {
      var self = this,
      config = this.config,
      mask = this.mask,
      win = this.win,
      winHeader = this.winHeader,
      icon = this.icon,
      winBody = this.winBody,
      winFooter = this.winFooter,
      body = this.body;

      Dialog.zIndex++;
      this.mask.css('z-index', Dialog.zIndex);

      //没有传递任何参数，就弹出一个等待的图标
      if (this.isConfig) {
        icon.html('&#xe60e;');
        winHeader.append(icon);
        win.append(winHeader);

        mask.append(win);
        body.append(mask);
      }
      else {
        //根据传递的参数来配置
        var html = undefined;
        html = config.type == 'warning' ? '&#xe693;' : config.type == 'ok' ? '&#xe72f;' : '&#xe60e;';
        icon.html(html);
        winHeader.append(icon);
        win.append(winHeader);

        //message
        config.message && winBody.html(config.message);
        win.append(winBody);

        //buttons
        if(config.buttons) {
          this.createButtons(winFooter, config.buttons);
          win.append(winFooter);
        }

        //设置宽度
        if(config.width != 'auto') {
          win.css('width', config.width);
        }

        //设置高度
        if(config.height != 'auto') {
          win.css('height', config.height);
        }

        //设置透明度
        if(config.maskOpacity) {
          mask.css('background-color', 'rgba(0,0,0,' + config.maskOpacity + ')');
        }

        //设置定时器
        if(config.delay && config.delay != 0 ) {
          window.setTimeout(function() {
            self.close();
            self.delayCallback && self.delayCallback();
          }, config.delay);
        }

        //设置动画效果
        if(config.effect) {
          self.animate();
        }

        //设置点击遮罩层关闭弹窗
        if(config.maskClose) {
          mask.tap(function() {
            self.close();
          });
        }

        mask.append(win);
        body.append(mask);
      }
    },

    createButtons: function(footer, buttons) {
      var self = this;
      $(buttons).each(function (index, item) {
        var type = item.type ? ' class=' + item.type : '',
        btnText = item.text || '按钮' + index,
        callback = item.callback || null,
        button = $('<button' + type +'>' + btnText + '</button>');
        footer.append(button);
        if(callback) {
          button.tap(function(e) {
            //返回false则不关闭弹窗
            if(callback() != false) {
              self.close();
            }
            //阻止事件冒泡
            e.stopPropagation();
          });
        }
        else {
          button.tap(function (e) {
            self.close();
            e.stopPropagation();
          });
        }
      });
    },

    close: function () {
      this.mask.remove();
    }

  };


  $.dialog = function (config) {
    return new Dialog(config);
  }
})(Zepto);
