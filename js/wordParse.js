/*
 PP 1.4: In the programming language of your choice, write a program that parses a sentence and replaces each word with the following:
 first letter, number of distinct characters between first and last character, and last letter.

 For example, Smooth would become S3h.  Words are separated by spaces or non-alphabetic characters and these separators should be
 maintained in their original form and location in the answer.

 We are looking for accuracy, efficiency and solution completeness. Please include this problem description in the comment at
 the top of your solution.  The problem is designed to take approximately 1-2 hours.
 */

/*
    Steps and considerations:
    1.) Take and validate user input (min length = 3; non-null)
    2.) split the string into arrays of words
    3.) determine first char, last char(s) and middle count
    4.) rebuild the string with the converts
    5.) return the new string
 */
/*global $ */
(function () {
    "use strict";
    // let's setup some event listeners to know when the input changes

    $(document).ready(function (){

        var theInput = $("#sentenceInput"), theOutput = $("#sentenceOutput");

        /* first, we'll listen for the button click
         * In this case, I made the assumption, based on the wording of the exercise, that we'd not have a parse for
         * anything less than 3 consecutive characters in length, so I'm enforcing a minimum limit to prevent unnecessary processing.
         * I am also checking to make sure three blanks weren't submitted.
         */
        $("#buttonSubmit").click(function (){
            if ($(theInput).val().length <= 2 || $(theInput).val() == "   " ) {
                $(theOutput).text("Sorry, but please enter a sentence containing at least one 3-letter word.");
                $(theOutput).addClass("errorText");
            }
            else {
                $(theOutput).removeClass("errorText");
                $(theOutput).text(parseTheSentence($(theInput).val()));
            }

            return false;
        });
    });

    function parseTheSentence(theUserSentence) {

        /*
        * in this case, I made the assumption, based on the wording of the exercise, that we'd not have a parse for
        * anything less than 3 consecutive characters in length, so I'm enforcing a minimum limit to prevent unnecessary processing.
        * Additionally, based on the language of the problem, the words wouldn't appear to have any special characters mixed in so
        * I'm excluding all but alphanumerics...for example, 7zip could be a word. Finally,  I am handling the case of
        * parenthesis and quotes around words (including smart quotes)...it only makes sense. Obviously, this could be expanded
        * to include other possible wrappers like single quotes.
        *
        * Naturally, I'd ask the product owner if this is how they would want it to work.
        * */

            var newString = "", snippet;
            var alphaNumRegex = /[a-zA-Z0-9]/;

            var wordArray = theUserSentence.split(/(\s* )/);

            for (var i = 0; i < wordArray.length; i++) {
                snippet = wordArray[i];

                console.log("Snippet is: " + snippet + " and length is " + snippet.length);

                //non-space entries & those lengths greater than 3 we'll deal with, otherwise just add it to the new string
                if (snippet != " " && snippet.length >= 3) {

                    var firstChar, lastChar, lastIndex;

                    firstChar = snippet.substr(0,1)  // get the first char
                    if (firstChar == "(" || firstChar == '"' || firstChar.match(/[\u201C\u201D\u201E]/g)) {  // if the first char of the snippet is a paren or quote
                        newString += firstChar;
                        firstChar = snippet.substr(1,1)  // get the first char after the paren
                        snippet = snippet.substring(1); // replace snippet without the paren
                    }

                    // we have to handle the cases of punctuation between the words
                    if (snippet.substr(snippet.length - 1, 1).match(alphaNumRegex)) {
                        lastChar = snippet.substr(snippet.length - 1, 1);
                        lastIndex = snippet.length - 1;
                    }
                    else {
                        lastChar = snippet.substr(snippet.length - 2, 2);
                        lastIndex = snippet.length - 2;
                    }

                    /* so here we are setting up an object, keyed by the individual letters and just setting the base value
                    * to 1. Once the initial letter is added, duplicates won't be added. Then we just get the object length.
                    */

                    var lettersObj = {};
                    var middleSection = snippet.substring(1, lastIndex);
                    for (var x in middleSection) {
                        lettersObj[middleSection[x]] = 1;
                    }

                    newString += firstChar + Object.keys(lettersObj).length + lastChar;
                }
                else {
                    newString += snippet;
                }
            }

            return newString;
    }
})();

