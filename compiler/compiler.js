/*
 * Copyright 2018 of original authors and authors.
 *
 * We use MIT license for this project, checkout LICENSE file in the root of source tree.
 */

const antlr4 = require('antlr4');
const SmithLexer = require('./grammar/antlr/SmithLexer');
const SmithParser = require('./grammar/antlr/SmithParser');
const SmithListener = require('./grammar/antlr/SmithListener');

class GrammarWalker extends SmithListener.SmithListener {
  enterAssignment(ctx) {
    console.log(ctx);
  }
}

function compile(text) {
  let chars = new antlr4.InputStream(text);
  let lexer = new SmithLexer.SmithLexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new SmithParser.SmithParser(tokens);
  parser.buildParseTrees = true;
  let tree = parser.program();
  let walker = new GrammarWalker();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(walker, tree)
  return parser;
}

module.exports = compile;