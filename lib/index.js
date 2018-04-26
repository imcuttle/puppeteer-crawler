'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */
var puppeteer = require('puppeteer');

var _require = require('path'),
    join = _require.join,
    extname = _require.extname;

var fs = require('fs');

var browser = void 0;
var page = void 0;

process.on('exit', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = browser;

          if (!_context.t0) {
            _context.next = 4;
            break;
          }

          _context.next = 4;
          return browser.close();

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

// Read actions
var actionPath = join(__dirname, 'actions');
var actionNames = fs.readdirSync(actionPath);
var actionMapper = {};
actionNames.forEach(function (name) {
  var ext = extname(name);
  if (/\.jsx?$/i.test(ext)) {
    actionMapper[name.replace(/\..*?$/, '')] = require(join(actionPath, name));
  }
});

module.exports = (_temp = _class = function () {
  function Crawler() {
    (0, _classCallCheck3.default)(this, Crawler);
  }

  Crawler.prototype.getBrowser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (browser) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return puppeteer.launch(Crawler.launchOptions);

            case 3:
              browser = _context2.sent;

            case 4:
              return _context2.abrupt('return', browser);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getBrowser() {
      return _ref2.apply(this, arguments);
    }

    return getBrowser;
  }();

  Crawler.prototype.getPage = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var _browser;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (page) {
                _context3.next = 7;
                break;
              }

              _context3.next = 3;
              return this.getBrowser();

            case 3:
              _browser = _context3.sent;
              _context3.next = 6;
              return _browser.newPage();

            case 6:
              page = _context3.sent;

            case 7:
              return _context3.abrupt('return', page);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getPage() {
      return _ref3.apply(this, arguments);
    }

    return getPage;
  }();

  Crawler.prototype.goto = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var page;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getPage();

            case 2:
              page = _context4.sent;
              _context4.next = 5;
              return page.goto(target, (0, _extends3.default)({
                waitUntil: 'networkidle2',
                timeout: 100000
              }, options));

            case 5:
              return _context4.abrupt('return', this);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function goto(_x2) {
      return _ref4.apply(this, arguments);
    }

    return goto;
  }();

  Crawler.prototype.execute = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(type, options) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (actionMapper[type]) {
                _context5.next = 2;
                break;
              }

              throw new Error('type: ' + type + ' is not existed. allow list: ' + Object.keys(actionMapper));

            case 2:
              _context5.t0 = actionMapper;
              _context5.t1 = type;
              _context5.next = 6;
              return this.getPage();

            case 6:
              _context5.t2 = _context5.sent;
              _context5.t3 = options || {};
              _context5.next = 10;
              return _context5.t0[_context5.t1].call(_context5.t0, _context5.t2, _context5.t3);

            case 10:
              return _context5.abrupt('return', _context5.sent);

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function execute(_x3, _x4) {
      return _ref5.apply(this, arguments);
    }

    return execute;
  }();

  Crawler.prototype.close = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      var innerBrowser;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.getBrowser();

            case 2:
              innerBrowser = _context6.sent;

              innerBrowser.close();
              browser = null;
              page = null;

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function close() {
      return _ref6.apply(this, arguments);
    }

    return close;
  }();

  return Crawler;
}(), _class.launchOptions = { timeout: 100000, args: ['--no-sandbox', '--disable-setuid-sandbox'] }, _temp);