;~function () {

    var app = function () {

    };
    app.prototype.init = function () {
        
    };
    /**
     * 删除订单按钮
     */
    app.prototype.deleteOrder = function ($id) {
        confirm('确定删除此订单？','注意：删除后无法恢复', function ($f) {
            $('[data-id="'+ $id +'"]').remove();
            $.api.toast('删除成功');
        });
    };
    /**
     * 查看物流按钮
     */
    app.prototype.traceOrder = function ($id) {
        api.openWin({
            name: 'chase-win',
            url: 'widget://html/coinShop/chase-win.html',
            bgColor : '#e65c7c',
            reload : 'true',
            pageParam :{
                id : $id
            }
        });
    };
    app.prototype.openChaseLists = function () {
        api.openFrame({
            name: 'orderChaseFrame',
            url: 'widget://html/coinShop/order-chase.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2'
        });
    };
    $.coinOrder = function () {
        return new app();
    };
}();