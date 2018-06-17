var dataModule = (function () {

	var lineReturn = '|';
	var shuffle = function (array) {
		var newArray = [];
		var randomIndex;
		var randomElement;
		while (array.length > 0) {
			randomIndex = Math.floor(Math.random() * array.length);
			randomElement = array[randomIndex];
			newArray.push(randomElement);
			array.splice(randomIndex, 1);
		}
		return newArray;
	};

	String.prototype.capitalize = function () {
		var newString = '';
		var firstCharCap = this.charAt(0).toUpperCase();
		var remainingChar = this.slice(1);
		newString = firstCharCap + remainingChar;
		return newString;
	};

	var capitalizeRandom = function (arrayOfStrings) {
		return arrayOfStrings.map(function (currentWord) {

			var x = Math.floor(4 * Math.random());
			return (x == 3) ? currentWord.capitalize() : currentWord;
		})
	};
	var addRandomPunctuation = function (arrayOfStrings) {
		return arrayOfStrings.map(function (currentWord) {
			var randomPunctuation;
			var items = [lineReturn, '?', '', '', '', '', '.', '', ',', '', '', '', '', '', '', '!', '', '', '', '', ''];
			var randomIndex = Math.floor(Math.random() * items.length);
			randomPunctuation = items[randomIndex];
			return currentWord + randomPunctuation;
		});
	};



	var appData = {
		indicators: {
			testStarted: false,
			testEnded: false,
			totalTestTime: 0,
			timeLeft: 0
		},
		results: {
			wpm: 0,
			wpmChange: 0,
			cpm: 0,
			cpmChange: 0,
			accuracy: 0,
			accuracyChange: 0,
			numOfCorrectWords: 0,
			numOfCorrectCharacters: 0,
			numOfTestCharacters: 0
		},
		words: {
			currentWordIndex: 0,
			testWords: [],
			currentWord: {}
		},
	};

	var word = function (index) {};
	word.prototype.update = function (value) {};


	return {
		fillListOfTestWords: function (textNumber, words) {
			var result = words.split(" ");

			if (textNumber == 0) {
				//result = shuffle(result);
				//result = capitalizeRandom(result);
				//result = addRandomPunctuation(result);

			}
			appData.words.testWords = result;
		},

		getListOfTestWords: function () {
			return appData.words.testWords;
		},

		getLineReturn() {
			return lineReturn;
		},

		returnData() {
			console.log(appData);
		}
	}
})();
