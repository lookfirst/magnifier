'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globalOffset = require('global-offset');

var _globalOffset2 = _interopRequireDefault(_globalOffset);

var _insertAfter = require('insert-after');

var _insertAfter2 = _interopRequireDefault(_insertAfter);

var _isPointerInside = require('is-pointer-inside');

var _isPointerInside2 = _interopRequireDefault(_isPointerInside);

var Magnifier = (function () {
  function Magnifier(el) {
    _classCallCheck(this, Magnifier);

    if (typeof el === 'string') el = document.querySelector(el);
    this.el = el;
    this.lens = document.createElement('div');
    this.lens.style.position = 'absolute';
    this.lens.style.border = '2px solid #eee';
    this.lens.style.borderRadius = '75px';
    this.lens.style.height = '150px';
    this.lens.style.width = '150px';
    this.lens.style.backgroundColor = '#fff';
    this.lens.style.backgroundRepeat = 'no-repeat';
    this.lens.style.overflow = 'hidden';
    this.lens.style.visibility = 'hidden';
    this.lens.className = 'magnifier';
    (0, _insertAfter2['default'])(this.lens, this.el);
    this.show();
    this.calcImageSize();
    if (this.onmove && this.onmove.bind) {
      this.onmove = this.onmove.bind(this);
      this.onend = this.hide.bind(this);
      this.bind();
    }
    return this;
  }

  _createClass(Magnifier, [{
    key: 'height',
    value: function height(h) {
      this.lens.style.height = h;
      return this;
    }
  }, {
    key: 'width',
    value: function width(w) {
      this.lens.style.width = w;
      return this;
    }
  }, {
    key: 'borderRadius',
    value: function borderRadius(r) {
      this.lens.style.borderRadius = r;
      return this;
    }
  }, {
    key: 'className',
    value: function className(name) {
      this.lens.className = name;
      return this;
    }
  }, {
    key: 'calcImageSize',
    value: function calcImageSize() {
      var _this = this;

      var orig = document.createElement('img');
      orig.style.position = 'absolute';
      orig.style.width = 'auto';
      orig.style.visibility = 'hidden';
      orig.src = this.el.src;

      orig.onload = function () {
        _this.imageWidth = orig.offsetWidth;
        _this.imageHeight = orig.offsetHeight;
        orig.parentNode.removeChild(orig);
        _this.hide();
        _this.lens.style.visibility = 'visible';
        _this.lens.style.backgroundImage = 'url(' + _this.el.src + ')';
      };

      this.lens.appendChild(orig);
    }
  }, {
    key: 'onmove',
    value: function onmove(event) {
      event.preventDefault();
      event = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event;
      if (!(0, _isPointerInside2['default'])(this.el, event)) return this.hide();
      this.show();
      var _event = event;
      var pageX = _event.pageX;
      var pageY = _event.pageY;

      var _offset = (0, _globalOffset2['default'])(this.el);

      var left = _offset.left;
      var top = _offset.top;
      var _el = this.el;
      var offsetLeft = _el.offsetLeft;
      var offsetTop = _el.offsetTop;
      var offsetWidth = _el.offsetWidth;
      var offsetHeight = _el.offsetHeight;
      var _lens = this.lens;
      var lensWidth = _lens.offsetWidth;
      var lensHeight = _lens.offsetHeight;

      var ratioX = this.imageWidth / offsetWidth;
      var ratioY = this.imageHeight / offsetHeight;
      var imageX = (left - pageX) * ratioX + lensWidth / 2 - 2;
      var imageY = (top - pageY) * ratioY + lensHeight / 2 - 2;
      var x = pageX - lensWidth / 2 - (left !== offsetLeft ? left - offsetLeft : 0);
      var y = pageY - lensHeight / 2 - (top !== offsetTop ? top - offsetTop : 0);
      this.lens.style.left = x + 'px';
      this.lens.style.top = y + 'px';
      this.lens.style.backgroundPosition = imageX + 'px ' + imageY + 'px';
    }
  }, {
    key: 'bind',
    value: function bind() {
      this.el.addEventListener('mousemove', this.onmove, false);
      this.el.addEventListener('mouseleave', this.onend, false);
      this.el.addEventListener('touchstart', this.onmove, false);
      this.el.addEventListener('touchmove', this.onmove, false);
      this.el.addEventListener('touchend', this.onend, false);
      this.lens.addEventListener('mousemove', this.onmove, false);
      this.lens.addEventListener('mouseleave', this.onend, false);
      this.lens.addEventListener('touchmove', this.onmove, false);
      this.lens.addEventListener('touchend', this.onend, false);
      return this;
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.el.removeEventListener('mousemove', this.onmove, false);
      this.el.removeEventListener('mouseleave', this.onend, false);
      this.el.removeEventListener('touchstart', this.onmove, false);
      this.el.removeEventListener('touchmove', this.onmove, false);
      this.el.removeEventListener('touchend', this.onend, false);
      this.lens.removeEventListener('mousemove', this.onmove, false);
      this.lens.removeEventListener('mouseleave', this.onend, false);
      this.lens.removeEventListener('touchmove', this.onmove, false);
      this.lens.removeEventListener('touchend', this.onend, false);
      this.lens.parentNode.removeChild(this.lens);
      return this;
    }
  }, {
    key: 'show',
    value: function show() {
      this.lens.style.display = 'block';
      return this;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.lens.style.display = 'none';
      return this;
    }
  }]);

  return Magnifier;
})();

exports['default'] = Magnifier;
module.exports = exports['default'];

