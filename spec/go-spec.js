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

describe('extract comments from Go', function () {
  var str = read('go.go')
  var comments = extract(str, {
    filename: 'go.go'
  })

  it('should handle single line comments:', function () {
    expect(comments['4']).toEqual({
      begin: 4,
      end: 4,
      codeStart: 5,
      content: 'TODO: A single line comment\n',
      info: { type: 'singleline' },
      code: 'func main() {'
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['7']).toEqual({
      begin: 7,
      end: 9,
      codeStart: 10,
      content: 'TODO: A multiline-comment\n\twith multiple lines\n\t',
      info: { type: 'multiline' },
      code: '    fmt.Println("hello world")'
    })
  })
})
