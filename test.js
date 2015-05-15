// tests for `bytes.js`.
var bytes = require('./bytes');
var ntt = require('ntt');
var assert = require('assert');

var runTest = function(fn, cases) {
  for (var i = 0; i < cases.length; i++) {
    var item = cases[i];
    var got = fn.apply(null, item.args);
    assert.deepEqual(got, item.except);
  }
};

ntt('bytes.js', function(test) {
  var fromStringCases = [
    {args: ['~'], except: [0x7e]},
    {args: ['1234'], except: [0x31, 0x32, 0x33, 0x34]},
    {args: ['abc'], except: [0x61, 0x62, 0x63]},
    {args: ['\u0129'], except: [0xc4, 0xa9]},
    {args: ['\u07ff'], except: [0xdf, 0xbf]},
    {args: ['你好'], except: [0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]},
  ];
  test('fromString', function(done) {
    runTest(bytes.fromString, fromStringCases);
    done();
  });

  var toStringCases = [
    {args: [[0x7e]], except: '~'},
    {args: [[0x31, 0x32, 0x33, 0x34]], except: '1234'},
    {args: [[0x61, 0x62, 0x63]], except: 'abc'},
    {args: [[0xc4, 0xa9]], except: '\u0129'},
    {args: [[0xdf, 0xbf]], except: '\u07ff'},
    {args: [[0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]], except: '你好'}
  ]
  test('toString', function(done) {
    runTest(bytes.toString, toStringCases);
    done();
  });
});
