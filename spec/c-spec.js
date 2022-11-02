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

describe('extract comments from C', function () {
  var str = read('c.c')
  var comments = extract(str, {
    filename: 'c.c'
  })

  console.log('C', { comments })

  it('should handle single line comments:', function () {
    expect(comments['3']).toEqual({
      begin: 3,
      end: 3,
      codeStart: 4,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: 'int main()'
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['6']).toEqual({
      begin: 6,
      end: 8,
      codeStart: 9,
      content: 'TODO: A multiline-comment\n   with multiple lines\n   ',
      info: { type: 'multiline' },
      code: '    printf("Hello World");'
    })
  })
})
