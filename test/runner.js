var assert = require('common/assert');

var passCount = 0,
    failCount = 0,
    errorLog = [],
    currentTestFile = '';

function test(description, f) {
    try {
        f();
        passCount++;
    }
    catch(e) {
        errorLog.push(description + (currentTestFile? ' ['+currentTestFile+']':'') + '\n' + (e.message||'') + '\n     - Expected: ' + e.expected + '\n     - Actual:   ' + e.actual);
        failCount++;
    }
}

function testFile(filepath) {
    currentTestFile = filepath;
    include(filepath);
    currentTestFile = '';
}

function report() {
    print('\033[032mPASSED: ' + passCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
    if (failCount) {
        print('\033[031mFAILED: '+ failCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
        for (var i = 0, leni = errorLog.length; i < leni; i++) {
            print(' ' + (i+1) + '. ' + (i+1 < 10? ' ' : '') + (errorLog[i]||'') + '\n');
        }
    }
}

// helpers
var testhelpers = {
    getDocSetFromFile: function(filename) {
        var sourceCode = readFile(BASEDIR + filename),
            testParser,
            doclets;
            
        testParser = new (require('jsdoc/src/parser')).Parser();
        require('jsdoc/src/handlers').attachTo(testParser);
        
        doclets = testParser.parse('javascript:' + sourceCode);
        
        
        return {
            doclets: doclets,
            getByLongname: function(longname) {
                return doclets.filter(function(doclet) {
                    return (doclet.longname || doclet.name) === longname;
                });
            }
        };
    }
};

testFile('test/t/common/util.js');
testFile('test/t/common/dumper.js');
testFile('test/t/common/events.js');
testFile('test/t/common/query.js');

testFile('test/t/jsdoc/opts/parser.js');
testFile('test/t/jsdoc/src/parser.js');
testFile('test/t/jsdoc/src/handlers.js');
testFile('test/t/jsdoc/name.js');

testFile('test/t/cases/file.js');

testFile('test/t/cases/virtual.js');

testFile('test/t/cases/objectlit.js');
testFile('test/t/cases/objectlit2.js');

testFile('test/t/cases/this.js');
testFile('test/t/cases/this2.js');
testFile('test/t/cases/this3.js');

testFile('test/t/cases/this-and-objectlit.js');

testFile('test/t/cases/var.js');

testFile('test/t/cases/inner.js');
testFile('test/t/cases/innerscope.js');
testFile('test/t/cases/innerscope2.js');

testFile('test/t/cases/modules/data/mod-1.js');
testFile('test/t/cases/modules/data/mod-2.js');


testFile('test/t/cases/accesstag.js');
testFile('test/t/cases/alias.js');
testFile('test/t/cases/alias2.js');
testFile('test/t/cases/alias3.js');
testFile('test/t/cases/also.js');
testFile('test/t/cases/augmentstag.js');
testFile('test/t/cases/authortag.js');
testFile('test/t/cases/borrowstag.js');
testFile('test/t/cases/borrowstag2.js');
testFile('test/t/cases/classtag.js');
testFile('test/t/cases/constructstag.js');
testFile('test/t/cases/constructstag2.js');
testFile('test/t/cases/constructstag3.js');
testFile('test/t/cases/constructortag.js');
testFile('test/t/cases/copyrighttag.js');
testFile('test/t/cases/defaulttag.js');
testFile('test/t/cases/deprecatedtag.js');
testFile('test/t/cases/exports.js');
testFile('test/t/cases/exportstag.js');
testFile('test/t/cases/exportstag2.js');
testFile('test/t/cases/exportstag3.js');
testFile('test/t/cases/exceptiontag.js');
testFile('test/t/cases/globaltag.js');
testFile('test/t/cases/ignoretag.js');
testFile('test/t/cases/lends.js');
testFile('test/t/cases/lends2.js');
testFile('test/t/cases/memberoftag.js');
testFile('test/t/cases/memberoftag2.js');
testFile('test/t/cases/moduletag.js');
testFile('test/t/cases/moduletag2.js');
testFile('test/t/cases/paramtag.js');
testFile('test/t/cases/privatetag.js');
testFile('test/t/cases/readonlytag.js');
testFile('test/t/cases/requirestag.js');
testFile('test/t/cases/returnstag.js');
testFile('test/t/cases/seetag.js');
testFile('test/t/cases/sincetag.js');
testFile('test/t/cases/thistag.js');
testFile('test/t/cases/typetag.js');
testFile('test/t/cases/typedeftag.js');
testFile('test/t/cases/variations.js');
testFile('test/t/cases/versiontag.js');


report();
