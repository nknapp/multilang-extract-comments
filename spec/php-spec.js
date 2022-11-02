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

describe('extract comments from PHP', function () {
  var str = read('php.php')
  var comments = extract(str, {
    filename: 'php.php'
  })

  it('should handle single line comments:', function () {
    expect(comments['11']).toEqual({
      begin: 11,
      end: 11,
      codeStart: 12,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: "                $x = 'Hello, World!';"
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['14']).toEqual({
      begin: 14,
      end: 17,
      codeStart: 18,
      content:
        '               TODO: A multiline-comment\n' +
        '               with multiple lines\n' +
        '               ',
      info: { type: 'multiline' },
      code: '                echo $x;'
    })
  })
})
