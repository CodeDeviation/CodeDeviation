//
//  Created by Sebastian.Hanke on 12.08.14.
//
$( document ).ready(function(){
 
    // some global var
    var formula             = [],
        formulaTop          = [],
        FunctionPressed     = "",
        formulaOutput       = "",
        finalValue,
        newValue            = "",
        curValue,
        newValueTop,
        formulaStorage      = [],
        formulaTopStorage   = [],
        formulaOutputTop    = "",
        intermedResult,
        ValuePercentage,
        countFunctionClicks = 0,
        countNumClicks      = 0,
        countCommaClicks    = 0,
        countClicks         = 0,
        countBackUsed       = 0,
        $scrBottom = $(".screenBottom"),
        $scrTop = $(".screenTop");
 
 
    // defining states of the calculator for FullReset
    function FullResetCalc(curValue) {
 
        // after reset show current Value (curValue)
        $scrBottom.val(curValue);
        formula             = [];
        formulaTop          = [];
        formulaStorage      = [];
        formulaTopStorage   = [];
        formulaOutput       = "";
        formulaOutputTop    = "";
        finalValue          = "";
        // after reset delete Values in .screenTop
       $scrTop.val("");
 
        // if a function is selected
        $scrBottom.data("isFunctionSelected", false).data("whichFunction", "").data("intermedResults", false);
 
        // Check for numbers
        $scrBottom.data("isValueThere", false).data("firstNumAfterFunct", false).data("isZero", true);
 
        // check if calculation has been performed on previous step
        $scrBottom.data("PreviousStep", false).data("hasBeenReseted", true).data("ResultsClicked", false);
 
        // check for "special" operators / functions
        $scrBottom.data("negate", false).data("commaLocked", false).data("reciprocal", false).data("sqrt", false).data("firstForBack", false).data("wasNegated", false).data("percentage", false).data("BackUsed", false);
 
        $scrBottom.data("concat", false);
 
        // reset counts
        countFunctionClicks = 0;
        countCommaClicks    = 0;
        countNumClicks      = 0;
        countBackUsed       = 0;
 
        $scrBottom.removeClass("lowerFont");
 
 
    }
 
    function SmallResetCalc(curValue) {
 
        $scrBottom.data("isFunctionSelected", false).data("whichFunction", "");
        $scrBottom.data("isValueThere", false).data("firstNumAfterFunct", false).data("isZero", true);
        $scrBottom.data("intermedResults", false).data("PreviousStep", false).data("hasBeenReseted", true);
        $scrBottom.data("negate", false).data("commaLocked", false).data("reciprocal", false).data("sqrt", false).data("firstForBack", false).data("wasNegated", false).data("percentage", false).data("BackUsed", false);
        $scrBottom.data("concat", false);
 
        formula             = [];
        formulaTop          = [];
        countFunctionClicks = 0;
        countBackUsed       = 0;
 
    }
 
    function displayResults(ResultValue) {
 
            var x = round(ResultValue,15);
 
            if ((x.toString().length) > 15) {
                $(".screenBottom").addClass("lowerFont");
            }
 
            $scrBottom.val(x);
            $scrTop.val("");
 
            SmallResetCalc("");
 
            $scrBottom.data("isValueThere", true).data("PreviousStep", true);
 
        }
 
    function formulajoin(a) {
 
        // this is to store the numbers as one number at index[0] (why? to exchange Functions if pressed e.g.)
        formulaStorage[0] = formula.join(a);
        console.log("join 1",formulaStorage, formulaTop);
        //formula.length = 0;
        formula = formulaStorage.slice();
        formulaOutput = formula.join(a);
        console.log("join 2",formula);
        formulaTopStorage[0] = formulaTop.join(a);
        //formulaTop.length = 0;
        formulaTop = formulaTopStorage.slice();
        formulaOutputTop = formulaTop.join(a);
        console.log("top join", formulaTop, formulaOutputTop);
    }
 
    function round(number, decimals) {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
 
    // initial reset
    FullResetCalc("0");
 
    // count clicks on function-keys(-,+,/,*,1/x,sqrt,%), why see... $(".operator").click(function() {
    $(".count").click(function() {
        countFunctionClicks++;
    });
 
// Status (++)    // what happens when num-key is pressed
    $(".num").click(function() {
        countNumClicks++;
 
        // (Num1) check if previous calculation was performed, if yes reset Calculator to input-text
        if ($scrBottom.data("PreviousStep") == true) {
 
            FullResetCalc($(this).text());
            formula.push($scrBottom.val());
            formulaTop.push($scrBottom.val());
            $scrBottom.data("isValueThere", true).data("isZero", false);
            $scrBottom.data("hasBeenReseted", false).data("ResultsClicked", false);
 
            // (Num2) check if a function-button is pressed, then lock-in the first Value and Display
        } else if (($scrBottom.data("isFunctionSelected") == true) && ($scrBottom.data("isValueThere") == false)) {
            //formulajoin("");
            $scrBottom.val($(this).text());
 
            formula.push($scrBottom.val());
            formulaTop.push($scrBottom.val());
 
            $scrBottom.data("isFunctionSelected", false).data("ResultsClicked", false);
            $scrBottom.data("firstNumAfterFunct", true).data("isZero", false).data("isValueThere", true).data("firstForBack", true);
            console.log("(Num2)",formula);
            // (Num3) Append nach intermedResults
        } else if (($scrBottom.data("intermedResults") == true)) {
 
            newValue = $(this).text();
            $scrBottom.val(newValue);
 
            formula.push(newValue);
            formulaTop.push(newValue);
 
            $scrBottom.data("isFunctionSelected", false).data("ResultsClicked", false);
            $scrBottom.data("intermedResults", false).data("isValueThere", true);
            console.log("(Num3)",formula);
 
        } else if ($scrBottom.val() == "0" && $(this).text() == "0") {
 
        // (Num4) else just append the new number to existing or start over, when Calculator was reset
        } else {
            var curValue = $scrBottom.val(),
                toAppend = $(this).text();
 
            if (curValue == "0") {
                curValue = "";
            }
            newValue = curValue + toAppend;
 
            formula.push($(this).text());
            formulaTop.push($(this).text());
 
            $scrBottom.val(newValue);
 
            $scrBottom.data("isValueThere", true).data("isZero", false);
            $scrBottom.data("isFunctionSelected", false).data("firstNumAfterFunct", false).data("ResultsClicked", false);
            console.log("(Num4)",formula);
        }
 
    });
 
// Status (++)    // what happens if operator button is clicked
    $(".operator").click(function() {
 
        // to enable comma, sqrt and reciprocal etc. after function has been set
        $scrBottom.data("commaLocked",  false);
        $scrBottom.data("sqrt",         false);
        $scrBottom.data("reciprocal",   false);
        $scrBottom.data("concat",       false);
 
        // if clicked then reset counts
        countNumClicks      = 0;
        countCommaClicks    = 0;
        countBackUsed       = 0;
        console.log(formula);
        if ($scrBottom.data("negate") == true) {
            //formula.push(newValue);
console.log("negate in Func", formula);
        }
 
        if ($scrBottom.data("isFunctionSelected") == false && $scrBottom.data("isValueThere") == true && countFunctionClicks < "2") {
 
            // after "Result"-button
            if ($scrBottom.data("PreviousStep") == true) {
                formula.push($scrBottom.val());
                formulaOutput = formula.join("");
console.log("PrevStep in Func", formula);
                formulaTop.push($scrBottom.val());
                formulaOutputTop = formulaTop.join();
 
                $scrBottom.data("PreviousStep", false);
 
            }
            formulajoin("");
 
            // global var to be used in "percentage" calculation
            ValuePercentage = formulaTop[0];
 
            // set isFunctionSelected to true and return text to whichFunction
            FunctionPressed = $(this).text();
 
            formulaTop.push(FunctionPressed);
 
            $scrTop.val(formulaOutputTop+FunctionPressed);
            $scrBottom.val("0");
 
            $scrBottom.data("isZero", true);
            $scrBottom.data("wasNegated",   false);
            $scrBottom.data("isFunctionSelected", true).data("whichFunction", FunctionPressed).data("negate", false).data("isValueThere", false);
            console.log("(1)",formula);
            // doing intermediate results
        } else if (countFunctionClicks >= 2 && $scrBottom.data("isValueThere") == true && $scrBottom.data("isFunctionSelected") == false) {
 
            FunctionPressed = $(this).text();
            if ($scrBottom.data("wasNegated") == true && $scrBottom.data("firstForBack") == true) {
                formula[2] = "(";
                formula[formula.length] = ")";
            }
            // do intermediate results calculation
            var cloneArrayFormula = JSON.parse(JSON.stringify(formula)); // to really clone array without just setting pointer
            cloneArrayFormula = cloneArrayFormula.join("");
            intermedResult = eval(cloneArrayFormula);
 
            formulaTop.push(FunctionPressed);
            formulaOutputTop = formulaTop.join("");
 
            $scrTop.val(formulaOutputTop);
 
            formulajoin("");
 
            // change Font-size if intermediate result.length > 10
            var x = round(intermedResult,15);
            if ((x.toString().length) > 10) {
                $(".screenBottom").addClass("lowerFont");
            }
            $scrBottom.val(x);
            $scrBottom.data("wasNegated",   false);
            $scrBottom.data("ResultsClicked", false).data("PreviousStep", false).data("isValueThere", true).data("isFunctionSelected", true).data("whichFunction", FunctionPressed).data("negate", false).data("intermedResults", true).data("isZero", false);
            console.log("(2)",formula);
            // exchange selected function directly
        } else if ($scrBottom.data("isFunctionSelected") == true && $scrBottom.data("isValueThere") == false) {
            FunctionPressed = $(this).text();
 
            formulaTop[1] = FunctionPressed;
 
            $scrTop.val(formulaOutputTop+FunctionPressed);
 
            $scrBottom.data("isFunctionSelected", true).data("whichFunction", FunctionPressed).data("negate", false).data("isValueThere", false).data("isZero", true);
            $scrBottom.data("wasNegated",   false);
            console.log("(3)",formula, $scrBottom.data());
        } else {
 
        }
 
        // add function to formula
        formula[1] = FunctionPressed;
        console.log($scrBottom.data());
    });
 
// Status (++)    // add comma
    $(".comma").click(function() {
 
        if ($scrBottom.data("isValueThere") == true && $scrBottom.data("commaLocked") == false && $scrBottom.data("isZero") == false) {
 
            countCommaClicks = 1;
            var curValue = $scrBottom.val();
 
            // if intermediate results available then replace scrBottom with "0" and push comma
            if (/*curValue.indexOf(".") !== -1 || */$scrBottom.data("intermedResults") == true) {
 
                formula.push("0");
                formulaTop.push("0");
 
                formula.push($(this).text());
                formulaOutput = formula.join("");
 
                formulaTop.push($(this).text());
                formulaOutputTop = formulaTop.join("");
 
                newValue = ("0.");
                $scrBottom.val(newValue);
                $scrBottom.data("commaLocked", true).data("intermedResults", false);
                countNumClicks++;
 
            } else if (formula.indexOf(".") != -1) {
 
            }else {
 
                var toAppend = $(this).text();
 
                newValue = curValue + toAppend;
                formula.push($(this).text());
                formulaOutput = formula.join("");
 
                formulaTop.push($(this).text());
                formulaOutputTop = formulaTop.join("");
 
                $scrBottom.val(newValue);
                $scrBottom.data("isValueThere", true).data("commaLocked", true).data("intermedResults", false);
            }
 
            // if Zero then push this and append
        } else if ($scrBottom.data("isZero") == true && $scrBottom.data("ResultsClicked") == false) {
 
            countCommaClicks = 1;
            var curValue = $scrBottom.val(),
                toAppend = $(this).text();
 
            newValue = curValue + toAppend;
            formula.push("0");
            formulaTop.push("0");
 
            // to enable "negate" without pressing "0"
            countNumClicks++;
 
            formula.push($(this).text());
            formulaOutput = formula.join("");
 
            formulaTop.push($(this).text());
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val(newValue);
            $scrBottom.data("isValueThere", true).data("commaLocked", true).data("isZero", false);
            console.log(countNumClicks, countCommaClicks);
 
 
            // if Results have been calculated and displayed
        } else if ($scrBottom.data("ResultsClicked") == true/* || $scrBottom.data("intermedResults") == true*/) {
 
            SmallResetCalc("");
            newValue = "0.";
            $scrBottom.val(newValue);
            formula.push(newValue);
            formulaTop.push(newValue);
 
            countCommaClicks = 1;
            countNumClicks++;
            $scrBottom.data("isValueThere", true).data("commaLocked", true).data("hasBeenReseted", false).data("isZero", false);
 
        } else {
 
        }
 
    });
 
// Status (++)    // reciprocal button
    $(".reciprocal").click(function() {
 
            var curValue = $scrBottom.val(),
                reciprocal = round(1/curValue, 6);
            countClicks = countNumClicks + countCommaClicks;
 
                // prevent array spaming when hitting button more times
            if ($scrBottom.data("reciprocal") == true || $scrBottom.data("sqrt") == true) {
                formula.pop();
                formulaTop.pop();
                $scrBottom.data("reciprocal", false);
                countNumClicks = 1;
            }
            if ($scrBottom.data("commaLocked") == true) {
               for (var i=0; i < countClicks; i++) {
                   formula.pop();
                   formulaTop.pop();
               }
 
            } else if ($scrBottom.data("negate") == true) {
               for (var i=0; i < countClicks; i++) {
                   formula.pop();
                   formulaTop.pop();
               }
            }
            $scrBottom.val(reciprocal);
 
            for (var i=0; i < countClicks; i++) {
                formula.pop();
                formulaTop.pop();
            }
            newValueTop = " reciproc(" + curValue + ")";
 
            formula.push(reciprocal);
            formulaOutput = formula.join("");
 
            formulaTop.push(newValueTop);
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val(reciprocal);
 
            $scrTop.val(formulaOutputTop);
            $scrBottom.data("isValueThere", true).data("reciprocal", true);
 
            countNumClicks      = 0;
            countCommaClicks    = 0;
 
 
    });
 
// Status (++)    // sqrt button
    $(".sqrt").click(function() {
 
        var curValue = $scrBottom.val(),
            squareRoot = round(Math.sqrt(curValue), 6);
        countClicks = countNumClicks + countCommaClicks;
 
        if ($scrBottom.data("commaLocked") == true) {
            for (var i=0; i < countClicks; i++) {
                formula.pop();
                formulaTop.pop();
            }
 
        } else if ($scrBottom.data("negate") == true) {
            formulaTop.pop();
 
        }else if ($scrBottom.data("sqrt") == true || $scrBottom.data("reciprocal") == true) {
            formula.pop();
            formulaTop.pop();
            countNumClicks = 1;
 
        } else {
 
            for (var i=0; i < countClicks; i++) {
                formula.pop();
                formulaTop.pop();
            }
        }
        $scrBottom.val(squareRoot);
        newValueTop = " sqrt(" + curValue + ")";
 
        formula.push(squareRoot);
        formulaOutput = formula.join("");
 
        formulaTop.push(newValueTop);
        formulaOutputTop = formulaTop.join("");
 
        $scrBottom.val(squareRoot);
 
        newValueTop = " sqrt(" + curValue + ")";
        $scrTop.val(formulaOutputTop);
        $scrBottom.data("isValueThere", true).data("sqrt", true);
        countNumClicks      = 0;
        countCommaClicks    = 0;
 
    });
 
// Status (++)    // delete last digit
    $(".back").click(function() {
               console.log("außen anfang",formula,formula.indexOf("."), countClicks);
                // workaround if back was already used (just add +1 to count, here  just done with count Comma instead of introducing new var
                if ($scrBottom.data("BackUsed") == true) {
                    countBackUsed = 1;
                    $scrBottom.data("BackUsed", false);
                    console.log("BackUsed", countClicks);
                }
 
                countClicks = countNumClicks + countCommaClicks + countBackUsed;
 
                // if negative value then split the resulting value into the array and begin deleting
                if ($scrBottom.data("wasNegated") == true && $scrBottom.data("firstForBack") == false) {
                    var formulaBack = $scrBottom.val().split("");
                    countClicks = formulaBack.length;
                    if ($scrBottom.data("concat") == false) {
                        formula = formulaBack.concat();
                        formulaTop = formulaBack.concat();
                        $scrBottom.data("concat", true);
                        console.log("xxx",formula, formulaTop,formulaBack, formulaOutputTop, countClicks);
                    }
                    console.log( formula, formulaBack);
 
                    // if negative value and already function then split the resulting value into the array and begin deleting
                } else if ($scrBottom.data("wasNegated") == true && $scrBottom.data("firstForBack") == true) {
                    var formulaBack = $scrBottom.val().split("");
                    countClicks = formulaBack.length;
                    //var index = formula.indexOf(newValue);
console.log("index",newValue);
                    if ($scrBottom.data("concat") == false) {
                        formula.splice(2, formula.length - 2);
                        formula = formula.concat(formulaBack);
                        formulaTop = formulaBack.concat();
                        $scrBottom.data("concat", true);
                        console.log(formula);
                    }
 
                    console.log("back funct true", formula, formulaBack);
                }
 
        if ($scrBottom.data("firstNumAfterFunct") == false && countClicks > 1 && $scrBottom.data("percentage") == false) {
 
            var curValue = $scrBottom.val(),
                toDelete = curValue.slice(0,-1);
            console.log("normal",formula,formula.indexOf("."), countClicks, $scrBottom.data());
 
            // solution for comma and ...
            if ($scrBottom.data("firstForBack") == false && formula.indexOf(".") == countClicks-1) {
                $scrBottom.data("commaLocked", false).data("BackUsed", true);
                //formulaBack--;
                console.log("inside",formula.indexOf("."), countClicks);
 
            // ...comma after function
            } else if ($scrBottom.data("firstForBack") == true && formula.indexOf(".")-1 == countClicks) {
                $scrBottom.data("commaLocked", false).data("BackUsed", true);
                //formulaBack--;
                console.log("inside comma locked",formula.indexOf("."), countClicks);
            }
 
            formulaOutputTop = formulaOutputTop.slice(0,-1);
 
            formula.pop();
            formulaTop.pop();
 
            formulaOutput = formula.join("");
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val(toDelete);
            $scrBottom.data("isValueThere", true).data("isZero", false);
            countNumClicks--;
 
 
            //if first number after function replace with "0" in screen
        } else if ($scrBottom.data("firstNumAfterFunct") == true && $scrBottom.data("isValueThere") == true){
console.log("first after func");
                formulaOutput = formulaOutput.slice(0,-1);
                formulaOutputTop = formulaOutputTop.slice(0,-1);
 
                formula.pop();
                formulaTop.pop();
 
                formulaOutput = formula.join("");
                formulaOutputTop = formulaTop.join("");
 
                $scrBottom.val("0");
 
            $scrBottom.data("isZero", true).data("isFunctionSelected", true).data("isValueThere", false);
 
            // if last number available replace with "0" in screen
        } else if ($scrBottom.data("firstNumAfterFunct") == false && countClicks == 1) {
console.log("last number");
            formulaOutput = formulaOutput.slice(0,-1);
            formulaOutputTop = formulaOutputTop.slice(0,-1);
 
            formula.pop();
            formulaTop.pop();
 
            formulaOutput = formula.join("");
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val("0");
            $scrBottom.data("isValueThere", true).data("isZero", true);
 
            countNumClicks--;
 
        } else if ($scrBottom.data("isFunctionSelected") == true && $scrBottom.data("isValuethere") == false) {
console.log("else");
        } else {
 
        }
        /**/
    });
 
// Status (++)    // negate current value
    $(".negate").click(function() {
 
        var curValue = $scrBottom.val();
 
        countClicks = countNumClicks + countCommaClicks;
        FunctionPressed = $scrBottom.data("whichFunction");
 
        if ($scrBottom.data("isValueThere") == true &&  $scrBottom.data("negate") == false && $scrBottom.data("isZero") == false
        && FunctionPressed === "*" || FunctionPressed === "+" || FunctionPressed === "/" || FunctionPressed === "-") {
 
            newValueTop = "(" + (-1 * curValue) + ")";
            newValue = -1 * curValue;
            formula.splice(-1* countClicks, countClicks);
            formulaTop.splice(-1* countClicks, countClicks);
 
            formulaOutput = formula.join("");
            formula.push(newValue);
 
            formulaTop.push(newValueTop);
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val(newValue); //$(this).text()
            $scrBottom.data("negate", true).data("intermedResults", false);
            $scrBottom.data("wasNegated", true);
 
            countNumClicks++;
            //countCommaClicks    = 0;
            console.log("negate (Func)", $scrBottom.data(),formula, $scrBottom.val());
        }else if ($scrBottom.data("isValueThere") == true &&  $scrBottom.data("negate") == true) {
 
            newValue = -1 * curValue;
            formula.splice(-1* countClicks, countClicks);
            formulaTop.splice(-1* countClicks, countClicks);
 
            formulaOutput = formula.join("");
            formula.push(newValue);
 
            formulaTop.push(newValueTop);
            formulaOutputTop = formulaTop.join("");
            $scrBottom.val(newValue); //$(this).text()
 
            countNumClicks++;
            //countCommaClicks    = 0;
 
            $scrBottom.data("intermedResults", false).data("negate", false);
            $scrBottom.data("wasNegated", true);
            console.log("negate (neg true)", $scrBottom.data(),formula, $scrBottom.val());
        } else if ($scrBottom.data("isValueThere") == true &&  $scrBottom.data("negate") == false) {
 
            // triggers if only numbers are clicked by this time and no function etc.
            newValueTop = -1 * curValue;
 
            formula.splice(0);
            formulaTop.splice(-1* countClicks, countClicks);
 
            formula.push(newValueTop);
            formulaOutput = formula.join("");
 
            formulaTop.push(newValueTop);
            formulaOutputTop = formulaTop.join("");
 
            $scrBottom.val(newValueTop); //$(this).text()
 
            countNumClicks++;
            //countCommaClicks    = 0;
 
            $scrBottom.data("negate", true).data("intermedResults", false);
console.log(formula);
            $scrBottom.data("wasNegated", true);
            console.log("negate false", $scrBottom.data(),formula, $scrBottom.val());
        } else if($scrBottom.data("isZero") == true) {
 
        } else {
 
        }
 
    });
 
// Status (++)    // current value as percentage of previous number
    $(".percentage").click(function() {
 
        countClicks = countNumClicks + countCommaClicks;
        newValue = $scrBottom.val();
        var percentageOutput = round((newValue / 100) * ValuePercentage, 6);
 
        if ($scrBottom.data("commaLocked") == true) {
            for (var i=0; i < countClicks; i++) {
                formula.pop();
                formulaTop.pop();
            }
 
        } else if ($scrBottom.data("negate") == true) {
            percentageOutput = "("+percentageOutput+")";
        }
        for (var i=0; i < countClicks; i++) {
            formula.pop();
            formulaTop.pop();
        }
 
        formula.push(percentageOutput);
 
        var str = percentageOutput.toString();
        if (str.indexOf("-") >= -1) {
            var TrashVar = "("+percentageOutput+")";
            formulaTop.push(TrashVar);
        } else {
            formulaTop.push(percentageOutput);
        }
 
        formulaOutputTop = formulaTop.join("");
        $scrTop.val(formulaOutputTop);
 
        $scrBottom.val(percentageOutput);
 
        // solution for back-button
        countNumClicks++;
 
        $scrBottom.data("percentage", true).data("firstNumAfterFunct", false);
    });
 
// Status (++)    // calculate now!
    $(".result").click(function() {
        var n = $scrBottom.val();
console.log("result", $scrBottom.data(),formula, $scrBottom.val(), n);
        // account for negated and back used -> introduce brackets
        if ($scrBottom.data("wasNegated") == true && $scrBottom.data("firstForBack") == true) {
            formula.splice(2, 0, "(");
            formula[formula.length] = ")";
            console.log("result wasnegated", $scrBottom.data(),formula, $scrBottom.val(), n);
        }
 
        if ($scrBottom.data("intermedResults") == true && $scrBottom.data("isValueThere") == true) {
            formula.push($scrBottom.val());
            formulaOutput = $scrBottom.val()+FunctionPressed+$scrBottom.val();
            var finalValue = eval(formulaOutput);
            displayResults(finalValue);
 
        } else if (isNaN(n)) {
            FullResetCalc("0");
            console.log("NaN")
 
        }else {
            formulaOutput = formula.join("");
            finalValue = eval(formulaOutput);
            $scrBottom.data("ResultsClicked", true);
            displayResults(finalValue);
            console.log("result else", $scrBottom.data(),formula, $scrBottom.val(), n);
        }
    });
 
// Status (++)    // CE (clear last entry
    $(".CE").click(function() {
 
        countClicks = countNumClicks + countCommaClicks;
 
        if ($scrBottom.data("isValueThere") == true) {
            for (var i=0; i < countClicks; i++) {
                formula.pop();
                formulaTop.pop();
                $scrBottom.val("0");
            }
            $scrBottom.data("isValueThere", false).data("isZero", true);
 
        } else {
        }
    });
 
// Status (++)    // "C" clear was pressed
    $(".clear").click(function() {
        FullResetCalc("0");
    });
 
}); //end of document-ready