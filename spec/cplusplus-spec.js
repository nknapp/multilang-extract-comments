'use strict'

/* global describe */
/* global it */
/* global expect */

/* deps:mocha */
require('should')
var path = require('path')
var extract = require('..')
var fs = require('fs')

function read (fp) {
  return fs.readFileSync(
    path.join(__dirname, '/fixtures/samples/', fp),
    'utf8'
  )
}

describe('extract comments from C++', function () {
  var str = read('cplusplus.cc')
  var comments = extract(str, {
    filename: 'cplusplus.cc'
  })

  it('should handle single line comments:', function () {
    expect(comments['4']).toEqual({
      begin: 4,
      end: 4,
      codeStart: 5,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: 'int main()'
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['7']).toEqual({
      begin: 7,
      end: 9,
      codeStart: 10,
      content: 'TODO: A multiline-comment\n   with multiple lines\n   ',
      info: { type: 'multiline' },
      code: '    cout << "Hello World";'
    })
  })
})
