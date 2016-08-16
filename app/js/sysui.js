;~function () {

    var app = function (title , text , callback , type) {
        this.$container;
        this.title = title;
        this.text = text;
        this.callback  = typeof callback == 'function' ? callback : function () {};
        this.type = type;
        this.init();
    };
    app.prototype.init = function () {
        var self = this;
        self.ceater();
        self.event();
    };
    app.prototype.html = function () {
        var self = this,
            html = '';
        html += '<div class="ui-alert show"><div class="ui-alert-wrap"></div><div class="ui-alert-toast"><div class="ui-alert-title"><div class="ui-alert-title-in">';
        html += self.title ||　'';
        html += '</div></div><div class="ui-alert-context"><div class="ui-alert-context-in">';
        html += self.text || '';
        html += '</div></div><div class="ui-alert-btn-group">';
        if(self.type == 'alert'){
            html += '<div class="ui-alert-btn" data-type="1">确认</div>';
        }else{
            html += '<div class="ui-alert-btn" data-type="0">取消</div><div class="ui-alert-btn" data-type="1">确认</div>';
        }
        html += '</div></div></div>';
        return html;
    };
    app.prototype.ceater = function () {
        var self = this;
        self.$container = document.createElement('div');
        self.$container.className = 'ui-container';
        self.$container.innerHTML = self.html();
        document.body.appendChild( self.$container );
    };
    app.prototype.event = function () {
        var self = this;
        var node = self.$container.querySelectorAll('.ui-alert-btn');

        for( var i = 0 ; i < node.length ; i++ ){
            node[i].addEventListener('click' , function(){
                var $this = this;
                self.hide(!!parseInt($this.getAttribute('data-type')));
            } , false );
        };

    };
    app.prototype.hide = function (flag) {
        var self = this;
        self.callback( flag );
        self.$container.parentNode.removeChild(self.$container);
    };
    window.alert = function (title , text , callback) {
        return new app(title , text , callback , 'alert');
    };
    window.confirm = function (title , text , callback) {
        return new app(title , text , callback , 'confirm');
    };
}();