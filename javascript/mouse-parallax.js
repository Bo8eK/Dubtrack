var dubtrackMouseParallax = {
    enabled: false,
    _target: $('#main-room')
};
dubtrackMouseParallax.state = function(enable) {
    dubtrackMouseParallax.enabled = enable;
    if(!enable) {
        dubtrackMouseParallax._target.css('top', 0);
        dubtrackMouseParallax._target.css('left', 0);
        $('#parallax-video_fix').remove();
    } else $('<style id="parallax-video_fix">#room-main-player-container::after { content: ""; width: 100%; height: 100%; position: absolute; background: rgba(0,0,0,.001); z-index: 5; }</style>').appendTo('head');
};
dubtrackMouseParallax.init = function() {
    dubtrackMouseParallax._target.parent().css('overflow', 'hidden');
    var parallaxEvent;
    $(document).keydown(function(e) {
        if(e.target === $('#chat-txt-message')[0]) return;
        if(e.keyCode || e.which === 80)
            dubtrackMouseParallax.state(true);
    });
    $(document).keyup(function(e) { if(e.keyCode || e.which === 80) dubtrackMouseParallax.state(false); });
    $(document).mousemove(parallaxEvent = function(e) {
        if(!dubtrackMouseParallax.enabled) return;
        this.lastMousePos = { top: e.pageY, left: e.pageX };
        this.parallax = {
            top: (window.innerHeight / 2 - this.lastMousePos.top) / 5,
            left: (window.innerWidth / 2 - this.lastMousePos.left) / 5
        };
        dubtrackMouseParallax._target.css('top', this.parallax.top + 'px');
        dubtrackMouseParallax._target.css('left', this.parallax.left + 'px');
    });
    parallaxEvent.lastMousePos = { top: window.innerHeight / 2, left: window.innerWidth / 2 };
};
if(/ready|complete/.test(document.readyState)) dubtrackMouseParallax.init();
else $(function() { dubtrackMouseParallax.init(); });