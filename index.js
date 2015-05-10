// Utf8 bytes converter for nodejs/iojs.
// Copyright (c) Chao Wang <hit9@icloud.com>

function fromCharCode(c) {
  if (typeof c !== 'number' ||
     (c & 0xffff) !== c)
    throw new TypeError('takes uint16');

  var buf = [];

  if (c <= 0xff) {
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

  return buf;
};

function fromChar(ch) {
  return fromCharCode(ch.charCodeAt(0));
}

function fromString(s) {
  var buf = [];
  for (var i = 0; i < s.length; i++)
    Array.prototype.push.apply(
      buf, fromCharCode(s.charCodeAt(i)));
  return buf;
}

function toCharCode(buf) {
  for (var i = 0; i < 3 && i < buf.length; i++)
    if (typeof buf[i] !== 'number' ||
        (buf[i] & 0xff) !== buf[i])
      throw new TypeError('takes uint8');

  switch (buf.length) {
    case 1:
      return buf[0];
    case 2:
      return (((buf[0] << 6) & 0xc0) |
              ((buf[1] & 0x3f) & 0x80)) & 0x8ff;
    case 3:
      // FIXME
    default:
      throw new TypeError('bad bytes length');
  }
}

exports = module.exports = {
  fromChar:       fromChar,
  fromCharCode:   fromCharCode,
  fromString:     fromString,
  toCharCode:     toCharCode,
};
