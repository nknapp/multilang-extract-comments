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

describe('extract comments from Java', function () {
  var str = read('java.java')
  var comments = extract(str, {
    filename: 'java.java'
  })

  it('should handle single line comments:', function () {
    expect(comments['1']).toEqual({
      begin: 1,
      end: 1,
      codeStart: 2,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: 'class Simple{  '
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['4']).toEqual({
      begin: 4,
      end: 6,
      codeStart: 7,
      content: 'TODO: A multiline-comment\n   with multiple lines\n   ',
      info: { type: 'multiline' },
      code: '    public static void main(String args[]){  '
    })
  })
})
