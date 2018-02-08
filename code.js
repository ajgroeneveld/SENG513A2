//
// this is just a stub for a function you need to implement
//
function getStats(txt) {

    var nChars = txt.length;
    if (nChars===0){
        var nWords = 0
        var nLines = 0
    }
    else{
        var patt = /[^a-zA-Z0-9]+/g;   //Pattern for RegEx is any alphanumeric and apostrophes (for contractions)
        var wordList = cleanArray(txt.replace(patt," ").toLowerCase().split(" "))
        var nWords = wordList.length
        var nLines = txt.split(/\r\n|\r|\n/).length
    }




    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: 22,
        averageWordLength: 3.3,
        maxLineLength: 33,
        palindromes: ["12321", "kayak", "mom"],
        longestWords: ["xxxxxxxxx", "123444444"],
        mostFrequentWords: ["hello(7)", "world(1)"]
    };
}




//Idea taken from here to take off the extra split when puncuation ends a string
//https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript

//Really bad solution, but I don't want to spend too much time on it
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]!="") {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}