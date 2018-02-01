/*
 * Copyright 2018 of original authors and authors.
 *
 * We use MIT license for this project, checkout LICENSE file in the root of source tree.
 */

const antlr4 = require('antlr4');
const SmithLexer = require('./grammar/javascript/out/SmithLexer');
const SmithParser = require('./grammar/javascript/out/SmithParser');
const SmithListener = require('./grammar/javascript/out/SmithListener');

let GlobalVariables = {};
let ActorVariables = {};

/**
 * Directly interpret AST.
 * Need to figure out suitable byte code interpretation.
 */
class GrammarWalker extends SmithListener.SmithListener {
  enterInt_assignment(ctx) {
    let id = ctx.lvalue().getText();
    let value = ctx.int_result().getText();
    GlobalVariables[id] = value;
  }
  enterFunction_call(ctx) {
    let callName = ctx.function_name().getText();
    let backStack = [];
    if (callName == 'put') {
      let newCtx = ctx.function_call_param_list().function_call_params();
      while(newCtx && newCtx.function_call_params) {
        let param = newCtx.function_param().getText();
        backStack.push(param);
        newCtx = newCtx.function_call_params();
      }
      let len = backStack.length;
      for (let i = 0; i < len; i++) {
        let index = backStack.pop();
        if (GlobalVariables[index]) {
          console.log(GlobalVariables[index]);
        } else {
          console.log(index);
        }
      }
    }
  }
  enterActor_definition(ctx) {
    let actorName = ctx.getChild(0).getChild(1).getText();
    if (ActorVariables[actorName]) { 
      throw new Error(`Double creation on Actor : ${actorName}`); 
    } else {
      ActorVariables[actorName] = {};
    }
  }

  enterBehavior_definition(ctx) {
    let parent = ctx.parentCtx;
    if (parent.constructor.name !== 'Actor_expressionContext') {
      throw new Error('The behavior definition should be enclosed in actor');
    } else {
      // Bind behavior
      // Get actor name
      let current = parent;
      let bindActor = '';
      while(true) {
        if (current.constructor.name === 'Actor_definitionContext') {
          bindActor = current.getChild(0).getChild(1).getText();
          break;
        }
        current = current.parentCtx;
      }
      if (!bindActor) {
        throw new Error('Error ocurred binding from behavior to actor');
      }
      let signature = ctx.getChild(0).getChild(1).getText();
      console.log(`Actor ${bindActor}'s behavior signature ${signature}`);
    }
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