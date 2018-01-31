// Grammar for as lang

grammar Smith;

program : expressionList;

expressionList
    :   expression terminator
    |   expressionList expression terminator
    |   terminator
    ;

expression
    :   letDefinition
    |   assignment
    |   actorDefinition
    |   Identifier
    ;

letDefinition
    :   Let Identifier op=Assign expression
    ;

assignment
    :   Identifier op=Assign expression
    ;

actorDefinition
    :   Actor Identifier
    ;

Identifier
    :   IdentifierNonDigit ( IdentifierNonDigit | Digit )*
    ;

IdentifierNonDigit
    :   ([a-zA-Z_])
    ;

Digit
    :   [0-9]
    ;

terminator
    :   terminator Semincolon
    |   terminator Crlf
    |   Semincolon
    |   Crlf
    ;

// Key words
Actor : 'actor';
Be : 'be';
Fun : 'fun';
Trait : 'trait';
Break : 'break';
Continue : 'continue';
If : 'if';
Else : 'else';
Export : 'export';
Import : 'import';
Match : 'match';
For : 'for';
Return : 'return';
Let : 'let';
Var : 'var';

// Boolean
True : 'true';
False : 'false';

// Arithmetics
Assign : '=';
Plus : '+';
Minus : '-';
Mul : '*';
Div : '/';
Mod : '%';

Crlf : '\n';
Semincolon : ';';
LeftBracket : '(';
RightBracket : ')';
LeftArrayBracket : '[';
RightArrayBracket : ']';

// Skip
Whitespace : [ \t]+ -> skip;
BlockComment : '/*' .*? '*/' -> skip;
LineComment : '//' ~[\r\n]* -> skip;
