'use strict';

function numberInWord(num) {
  var number = num,
      numPackage = [],
      numWordPackage = [],
      output = '',
      firstDigits = [
      '',
      'ein',
      'zwei',
      'drei',
      'vier',
      'fünf',
      'sechs',
      'sieben',
      'acht',
      'neun',
      'zehn',
      'elf',
      'zwölf',
      'dreizehn',
      'vierzehn',
      'fünfzehn',
      'sechszehn',
      'achtzehn',
      'neunzehn'
    ],
    secondDigits = [
      '',
      'zehn',
      'zwanzig',
      'dreißig',
      'vierzig',
      'fünfzig',
      'sechzig',
      'siebzig',
      'achtzig',
      'neunzig'
    ],
    furtherDigits = [
      'hundert',
      'tausend',
      'million',
      'milliarde',
      'billion',
      'billiarde',
      'trillion',
      'trilliade',
      'quadrillion',
      'quadrilliarde',
      'quintillion',
      'quintilliarde'
    ],
    furtherDigitsPlural = [
      'hundert',
      'tausend',
      'millionen',
      'milliarden',
      'billionen',
      'billiarden',
      'trillionen',
      'trilliaden',
      'quadrillionen',
      'quadrilliarden',
      'quintillionen',
      'quintilliarden'
    ];
  this.parse = function parse() {
    if(isNaN(parseInt(number))) {
      return output;
    }
    var packageCount = splitNumber();
    numPackage = new Array(packageCount);
    numWordPackage = new Array(packageCount);
    pushNumbersIntoPackage();
    createOutputThreeDigitsOutput();
    createCompleteOutput();
    return output;
  };
  function splitNumber() {
    number = number.split('').reverse();
    var packages = number.length/3;
    if(packages%1) {
      packages++;
    }
    return parseInt(packages);
  }
  function pushNumbersIntoPackage() {
    var i = 0;
    each(number,function(k,v) {
      if(numPackage[i] === undefined) {
        numPackage[i] = [];
      }
      if(numPackage[i].length >= 3) {
        i++;
        numPackage[i] = [];
      }
      numPackage[i].push(v);
    });
  }
  function createOutputThreeDigitsOutput() {
    each(numPackage, function(k) {
      numPackage[k].reverse();
      if(numPackage[k].length === 1) {
        numWordPackage[k] = firstDigits[numPackage[k][0]];
      }
      if(numPackage[k].length === 2) {
        numWordPackage[k] = createTwoDigitsWord(numPackage[k]);
      }
      if(numPackage[k].length === 3) {
        numWordPackage[k] = createThreeDigitsWord(numPackage[k]);
      }
    });
  }
  function createTwoDigitsWord(n) {
    var integer = parseInt(n[0]+''+n[1]);
    if(integer < 20) {
      return firstDigits[integer];
    }
    if(n[1] > 0) {
      return firstDigits[n[1]]+'und'+secondDigits[n[0]];
    }
    return secondDigits[n[0]];
  }
  function createThreeDigitsWord(n) {
    var lastTwoDigits = [n[1],n[2]];
    if(n[0] === 0) {
      return createTwoDigitsWord(lastTwoDigits);
    }
    return firstDigits[n[0]]+furtherDigits[0]+createTwoDigitsWord(lastTwoDigits);
  }
  function createCompleteOutput() {
    each(numWordPackage, function(k) {
      if(k === 0) {
        output = numWordPackage[k] + output;
      } else {
        if(k+1 === numWordPackage.length) {
          output = numWordPackage[k] + checkPronounciation(k) + output;
        }
        if(k+1 !== numWordPackage.length && numWordPackage[k] !== furtherDigits[0]) {
          output = numWordPackage[k] + checkPronounciation(k) + output;
        }
      }
    });
  }
  function checkPronounciation(k) {
    var n = parseInt(numPackage[k].join(''));
    if(n === 1 && k > 2) {
      return 'e'+furtherDigits[k];
    }
    return furtherDigitsPlural[k];
  }
  /** copied from jquery library **/
  function each(object, callback, args) {
    var name, i = 0,
      length = object.length;

    if (args) {
      if (length === undefined) {
        for (name in object) {
          if (callback.apply(object[name], args) === false) { break; }
        }
      } else {
        for (; i < length;) {
          if (callback.apply(object[i++], args) === false) { break; }
        }
      }
      // A special, fast, case for the most common use of each
    } else {
      if (length === undefined) {
        for (name in object) {
          if (callback.call(object[name], name, object[name]) === false) { break; }
        }
      } else {
        for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {

        }
      }
    }
    return object;
  }
}
