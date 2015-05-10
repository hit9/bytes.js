// Utf8 bytes array from/to string.
// Copyright (c) Chao Wang <hit9@icloud.com>

exports.fromString = function(s) {
  var idx = 0;
  var len = s.length;
  var bytes = [];

  while (idx < len) {
    var c = s.charCodeAt(idx++);
    var buf = [];

    if (c <= 0x7f) {
      // 0XXX XXXX 1 byte
      buf[0] = c;
      buf.length = 1;
    } else if (c <= 0x7ff) {
      // 110X XXXX 2 bytes
      buf[0] = (0xc0 | (c >> 6));
      buf[1] = (0x80 | (c & 0x3f));
      buf.length = 2;
    } else if (c <= 0xffff) {
      // 1110 XXXX 3 bytes
      buf[0] = (0xe0 | (c >> 12));
      buf[1] = (0x80 | ((c >> 6) & 0x3f));
      buf[2] = (0x80 | (c & 0x3f));
      buf.length = 3;
    }
    [].push.apply(bytes, buf);
  }
  return bytes;
};

exports.toString = function(bytes) {
  var buf = [];
  var idx = 0;
  var len = bytes.length;

  while (idx < len) {
    var c = bytes[idx++];

    if ((c & 0x80) == 0) {
      // 0XXX XXXX 1 byte (0x00 ~ 0x7f)
      buf.push(c);
    } else if ((c & 0xe0) == 0xc0) {
      // 110X XXXX 2 bytes (0xc2 ~ 0xdf)
      var d = bytes[idx++];
      buf.push(((c & 0x1f) << 6) | (d & 0x3f));
    } else if ((c & 0xf0) == 0xe0) {
      // 1110 XXXX 3 bytes (0xe0 ~ 0xe1, 0xee ~ 0xef)
      var d = bytes[idx++];
      var e = bytes[idx++];
      buf.push(((c & 0x0f) << 12) | ((d & 0x3f) << 6) | (e & 0x3f));
    } else if ((c & 0xf8) == 0xf0) {
      // 1111 0XXX 4 bytes (0xf0 ~ 0xf4)
      var d = bytes[idx++];
      var e = bytes[idx++];
      var f = bytes[idx++];
      buf.push(((c & 0x0f) << 18) | ((d & 0x3f) << 12) |
               ((e & 0x3f) << 6) | (f & 0x3f));
    }
  }

  return String.fromCharCode.apply(null, buf);
};
