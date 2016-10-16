## 移动端Zepto弹窗插件-Dialog

想预览效果可以点[这里](http://115.28.219.57/imooc/dialog/)

最简单的调用方法

```javascript
 $("#btn").tap(function() {
        $.dialog();
    });
```
点击遮罩层可关闭弹窗的调用方法

```javascript
$("#btn").tap(function() {
        $.dialog({
            maskClose: true,
            type: 'warning',
            delay: 2000,
            message: '2s后自动关闭'
        });
    });
```
稍微复杂点的调用方法
```javascript
 $("#btn").tap(function() {
        var d = $.dialog({
            maskClose: true,
            type: 'warning',
            message: '弹出一个确认和删除的框，点击确认弹出加载框2秒自动关闭，点击删除按钮把上一次框关闭',
            buttons: [{text: '确认', callback: function() {
                $.dialog({
                    maskClose: true,
                    type: 'loading',
                    delay: 2000
                });
            }},{text: '删除', type: 'red', callback: function() {
                $.dialog({
                    maskClose: true,
                    type: 'warning',
                    message: '删除之前的弹窗',
                    buttons: [{text: '删除之前的弹窗', type: 'red', callback: function() {
                        d.close();
                        return false;
                    }}]
                });
                return false;
            }}]
        });
    });
```
想学习弹窗源码的小伙伴儿欢迎fork哟!
