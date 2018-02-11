//
// Aaron Groeneveld
// 10103833
//
function getStats(txt) {

    var nChars = txt.length;
    if (nChars === 0) {
        return {
            "nChars": 0,
            "nWords": 0,
            "nLines": 0,
            "nonEmptyLines": 0,
            "maxLineLength": 0,
            "averageWordLength": 0,
            "palindromes": [],
            "longestWords": [],
            "mostFrequentWords": []
        };
    }

    //First 3 Questions
    var patt = /[^a-zA-Z0-9]+/g; //Pattern for RegEx is any alphanumeric. Could add apostrophes if we wanted
    var wordList = cleanArray(txt.replace(patt, " ").toLowerCase().split(" ")); //Master List of words that we're counting
    var nWords = wordList.length;
    var nLines = txt.split(/\r\n|\r|\n/).length; //Doesn't have the same problem with blank splits

    //Q4 Non Empty Lines
    var nonEmptyPatt = /\t|[ ]+/g;
    var nNonEmptyLines = cleanArray(txt.replace(nonEmptyPatt, "").split(/\r\n|\r|\n/)).length;

    //Q5 Max Line Length
    var lines = txt.split(/\r\n|\r|\n/);
    var maxLineLength = 0;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > maxLineLength) {
            maxLineLength = lines[i].length
        }
    }


    //Q6 Average word length
    var allWordLengths = 0;
    for (var i = 0; i < wordList.length; i++) {
        allWordLengths += wordList[i].length;
    }
    var averageWordLength = allWordLengths / wordList.length;

    //Q7 Palindromes
    var palindromeList = [];
    for (var i = 0; i < wordList.length; i++) {
        if (wordList[i] === wordList[i].split('').reverse().join('') && wordList[i].length > 2 && !palindromeList.includes(wordList[i])) {
            palindromeList.push(wordList[i]);
        }
    }

    //Q8 Longest Words
    var wordUniqueArray = [...new Set(wordList)]
    var longestWords = wordUniqueArray.sort(function(a, b) {
        return b.length - a.length || // sort by length, if equal then
            a.localeCompare(b); // sort by dictionary order
    });

    //Q9 Most Frequent Words
    var freqWordArray = [...new Set(wordList)];
    var frequencies = [];
    var freqPairs = [];
    for (var i = 0; i < freqWordArray.length; i++) {
        frequencies[i] = 0;
        for (var j = 0; j < wordList.length; j++) {
            if (wordList[j] === freqWordArray[i]) {
                frequencies[i]++;
            }
        }
        freqPairs[i] = [
            [freqWordArray[i]],
            [frequencies[i]]
        ]
    }
    //Now we need to sort it first by frequency, then alphabetical order in the event of a tie
    freqPairs.sort(function(a, b) {
        var labelA, valueA, labelB, valueB;
        labelA = a[0];
        labelB = b[0];
        valueA = a[1]; // Where 1 is your index, from your example
        valueB = b[1];
        if (valueA > valueB) {
            return -1;
        } else if (valueA < valueB) {
            return 1;
        }
        if (labelA > labelB) {
            return 1;
        } else if (labelA < labelB) {
            return -1;
        }

    });
    //Now to process the string
    var mostFrequentWords = [];
    for (var i = 0; i < freqPairs.length; i++) {
        mostFrequentWords.push(freqPairs[i][0] + "(" + freqPairs[i][1] + ")")
    }


    return {
        nChars: nChars,
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        maxLineLength: maxLineLength,
        averageWordLength: averageWordLength,
        palindromes: palindromeList,
        longestWords: longestWords.slice(0, 10),
        mostFrequentWords: mostFrequentWords.slice(0, 10)
    };
}




//Idea taken from here to take off the extra split when punctuation ends a string
//https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] != "") {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}