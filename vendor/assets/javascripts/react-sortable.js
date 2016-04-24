/*! react-sortablejs v1.0.0 | (c) 2016 Cheton Wu <cheton@gmail.com> | MIT | https://github.com/cheton/react-sortable */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("sortablejs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "sortablejs"], factory);
	else if(typeof exports === 'object')
		exports["ReactSortable"] = factory(require("react"), require("react-dom"), require("sortablejs"));
	else
		root["ReactSortable"] = factory(root["React"], root["ReactDOM"], root["Sortable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp2;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _sortablejs = __webpack_require__(3);

	var _sortablejs2 = _interopRequireDefault(_sortablejs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var store = {
	    nextSibling: null,
	    activeComponent: null
	};

	var extend = function extend(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }

	    target = target || {};
	    for (var index = 0; index < sources.length; index++) {
	        var obj = sources[index];
	        if (!obj) {
	            continue;
	        }
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                target[key] = obj[key];
	            }
	        }
	    }
	    return target;
	};

	module.exports = (_temp2 = _class = function (_React$Component) {
	    _inherits(_class, _React$Component);

	    function _class() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, _class);

	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.sortable = null, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(_class, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var options = extend({}, this.props.options);

	            ['onStart', 'onEnd', 'onAdd', 'onSort', 'onUpdate', 'onRemove', 'onFilter', 'onMove'].forEach(function (name) {
	                var eventHandler = options[name];

	                options[name] = function (evt) {
	                    if (name === 'onStart') {
	                        store.nextSibling = evt.item.nextElementSibling;
	                        store.activeComponent = _this2;
	                    } else if ((name === 'onAdd' || name === 'onUpdate') && _this2.props.onChange) {
	                        var items = _this2.sortable.toArray();
	                        var remote = store.activeComponent;
	                        var remoteItems = remote.sortable.toArray();

	                        evt.from.insertBefore(evt.item, store.nextSibling);

	                        if (remote !== _this2) {
	                            var remoteOptions = remote.props.options || {};

	                            if (_typeof(remoteOptions.group) === 'object' && remoteOptions.group.pull === 'clone') {
	                                // Remove the node with the same data-reactid
	                                evt.item.parentNode.removeChild(evt.item);
	                            }

	                            remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable);
	                        }

	                        _this2.props.onChange && _this2.props.onChange(items, _this2.sortable);
	                    }

	                    setTimeout(function () {
	                        eventHandler && eventHandler(evt);
	                    }, 0);
	                };
	            });

	            this.sortable = _sortablejs2.default.create(_reactDom2.default.findDOMNode(this), options);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var children = _props.children;
	            var className = _props.className;
	            var tag = _props.tag;

	            return _react2.default.DOM[tag]({ className: className }, children);
	        }
	    }]);

	    return _class;
	}(_react2.default.Component), _class.propTypes = {
	    options: _react2.default.PropTypes.object,
	    onChange: _react2.default.PropTypes.func,
	    tag: _react2.default.PropTypes.string
	}, _class.defaultProps = {
	    options: {},
	    tag: 'div'
	}, _temp2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;