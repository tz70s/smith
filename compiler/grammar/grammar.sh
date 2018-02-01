#!/bin/bash

rm -rf javascript/out
mkdir -p javascript/out
java -jar /usr/local/lib/antlr-4.7.1-complete.jar -Dlanguage=JavaScript -o  javascript/out Smith.g4

rm -rf java/out
mkdir -p java/out
java -jar /usr/local/lib/antlr-4.7.1-complete.jar -o  java/out Smith.g4
javac java/out/Smith*.java
