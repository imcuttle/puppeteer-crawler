'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file get
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(page) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = (0, _extends3.default)({
              selector: 'html', outputAttr: 'outerHTML'
            }, options);

            _context.next = 3;
            return page.evaluate(function (options) {
              var dom = document.querySelector(options.selector);
              return dom ? dom[options.outputAttr] : '';
            }, options);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function action_get(_x2) {
    return _ref.apply(this, arguments);
  }

  return action_get;
}();