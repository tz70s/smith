#!/bin/bash

rm -rf antlr
mkdir -p antlr
java -jar /usr/local/lib/antlr-4.7.1-complete.jar -Dlanguage=JavaScript -o antlr Smith.g4
