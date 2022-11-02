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

describe('extract comments from typescript', function () {
  var str = read('typescript.ts')
  var comments = extract(str, { filename: 'typescript.ts' })

  it('should handle single line comments:', function () {
    expect(comments['7']).toEqual({
      begin: 7,
      end: 7,
      codeStart: 8,
      content: 'TODO: A single line comment\n',
      code: 'console.log(message);',
      info: { type: 'singleline' }
    })
  })

  it('should handle multiline comments:', function () {
    expect(comments['1']).toEqual({
      begin: 1,
      end: 4,
      codeStart: 5,
      info: { type: 'multiline', apidoc: true },
      content: 'TODO: A multiline-comment\nwith multiple lines\n',
      code: 'let message: string = "Hello, World!";'
    })
  })
})
