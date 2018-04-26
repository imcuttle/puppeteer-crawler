'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */
var express = require('express');
var Crawler = require('../index');
var app = express();
var PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
  console.log('Run on http://localhost:%s/', PORT);
});

app.use(function (req, res, next) {
  res.succ = function (data) {
    res.json({ code: 200, data: data });
  };
  res.fail = function (msg) {
    res.json({ code: 500, data: msg });
  };
  if (req.method === 'POST') {
    req.entity = req.body;
  } else {
    req.entity = req.query;
  }
  next();
});

app.all('/:type', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var _req$entity, goto, opt, crawler;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$entity = req.entity, goto = _req$entity.goto, opt = (0, _objectWithoutProperties3.default)(_req$entity, ['goto']);

            if (goto) {
              _context.next = 5;
              break;
            }

            res.fail('requires `goto`');
            _context.next = 19;
            break;

          case 5:
            crawler = new Crawler();
            _context.next = 8;
            return crawler.goto(goto);

          case 8:
            _context.prev = 8;
            _context.t0 = res;
            _context.next = 12;
            return crawler.execute(req.params.type, opt);

          case 12:
            _context.t1 = _context.sent;

            _context.t0.succ.call(_context.t0, _context.t1);

            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t2 = _context['catch'](8);

            res.fail(_context.t2.toString());

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

function error(err, req, res, next) {
  console.error(err);
  res.status(500).type('html').send('<html>\n<head>\n<title>Error: ' + err.message + '</title>\n</head>\n<body>\n<div>\n<h2>' + err.toString() + '</h2>\n<pre>\n<code>' + err.stack + '</code>\n</pre>\n</div>\n</body>\n</html>');
}
app.use(error);