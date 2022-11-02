'use strict'

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

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

describe('extract comments from python', function () {
  var str = read('python.py')
  var comments = extract(str, {
    filename: 'python.py'
  })

  it('should handle single line comments:', function () {
    expect(comments['1']).toEqual({
      begin: 1,
      end: 1,
      codeStart: 2,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: 'x = "Hello world"'
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['4']).toEqual({
      begin: 4,
      end: 7,
      codeStart: 8,
      content: 'TODO: A multiline-comment\nwith multiple lines\n',
      info: { type: 'multiline' },
      code: 'print(x)'
    })
  })
})
