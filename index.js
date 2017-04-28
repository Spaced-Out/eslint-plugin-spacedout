
"use strict";

const linesBeforeNode = (sourceCode, node) => {
  // for a node, emit the number of lines of whitespace between where
  // it begins and the node immediately before it ends.
  const firstToken = sourceCode.getTokenBefore(node);
  let secondToken = sourceCode.getFirstToken(node);

  const comments = sourceCode.getComments(node);
  if (comments.leading && comments.leading.length > 0) {
    secondToken = comments.leading[0]
  }

  const firstLine = firstToken.loc.start.line;
  const secondLine = secondToken.loc.start.line;

  // the number of lines (one more than number of blank lines)
  const lines = secondLine - firstLine;

  // the whitespace range between both tokens
  const range = [firstToken.range[1], secondToken.range[0]];

  return {
    lines,
    range,
    locs: [
      firstToken.loc, // the location of node's preceding token
      secondToken.loc, // the location of node's token
    ],
  };
}

const importWhitespaceRule = {
  meta: {
    docs: {
      description: "ensure whitespace",
      category: "Style Nits",
      recommended: true
    },
    fixable: "whitespace",
    schema: [
      {
        "type": "object",
        "properties": {
          "lines": {
            "type": "number"
          }
        }
      }
    ],
  },
  create: function(context) {
    return {
      "ImportDeclaration + :not(ImportDeclaration)": function(node, culpritToken) {
        const source = context.getSourceCode();

        const {lines, range, locs} = linesBeforeNode(source, node);

        const opts = context.options[0] || {lines: 2};
        const {lines: blankLines = 2} = opts;

        // add one b/c 1 \n === adjacent lines, 2 === one line whitespace...
        if (lines < (blankLines + 1) || lines > (blankLines + 1)) {
          context.report({
            node: node,
            loc: locs[1],
            message: `${blankLines} blank lines needed after last import`,

            fix: function(fixer) {
              return fixer.replaceTextRange(range, '\n'.repeat(blankLines+1));
            }
          })
        }
      }
    };
  }
};

module.exports = {
  rules: {
    "whitespace-after-imports": importWhitespaceRule,
  }
};
