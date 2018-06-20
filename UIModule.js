var UIModule = (function () {

	var DOMElements = {
		timeLeft: document.getElementById('timeLeft'),
		wpm: document.getElementById('wpm'),
		wpmChange: document.getElementById('wpmChange'),
		cpm: document.getElementById('cpm'),
		cpmChange: document.getElementById('cpmChange'),
		accuracy: document.getElementById('accuracy'),
		accuracyChange: document.getElementById('accuracyChange'),
		textInput: document.querySelector('#input'),
		nameInput: document.querySelector('.form-group'),
		content: document.getElementById('content'),
		nameField: document.getElementById('name'),
		activeWord: '',
		modal: $('#myModal'),
		download: document.getElementById('download')
	};

	var splitArray = function (string) {
		return string.split('');
	};

	var addSpace = function (array) {
		array.push(' ');
		return array;
	};

	var addSpanTag = function (array) {
		return array.map(function (currentCharacter) {
			return '<span>' + currentCharacter + '</span>'
		});
	};

	var addWordSpanTag = function (array) {
		array.push('</span>');
		array.unshift('<span>');
		return array;
	};

	var joinEachWord = function (array) {
		return array.join('');
	};

	var userValue;
	var returnCharClass = function (currentCharacter, index) {
		return (index < userValue.length) ? (currentCharacter == userValue[index] ? 'correctCharacter' : 'wrongCharacter') : '0';


	};


	var updateChange = function (value, changeElement) {


		var classToAdd, html;
        [classToAdd, html] = (value >= 0) ? ['scoreUp', '+' + value] : ['scoreDown', value];


		if (changeElement == DOMElements.accuracyChange) {
			html += '%';
		}


		changeElement.innerHTML = html;


		changeElement.removeAttribute('class');
		changeElement.className = classToAdd;


		fadeElement(changeElement);
	};

	var fadeElement = function (element) {
		element.style.opacity = 1;
		setTimeout(function () {
			element.style.opacity = 0.9;
		}, 100);
	};

	return {
		
		getDOMElements: function () {
			return {
				textInput: DOMElements.textInput,
				download: DOMElements.download
			};
		},
		
		updateTimeLeft: function (x) {
			DOMElements.timeLeft.innerHTML = x;
		},
		
		
		updateResults: function (results) {
		
		DOMElements.wpm.innerHTML = results.wpm;
		
		DOMElements.cpm.innerHTML = results.cpm;
		
		DOMElements.accuracy.innerHTML = results.accuracy + '%';
		
		updateChange(results.wpmChange, DOMElements.wpmChange);
		updateChange(results.cpmChange, DOMElements.cpmChange);
		updateChange(results.accuracyChange, DOMElements.accuracyChange);
	},
		
		fillModal : function(wpm){
			var results;
			if(wpm<40){
				results = {
					type : 'turtle' ,
					image: 'turtle.jpg',
					level: 'Beginner'
				};
			}else if(wpm < 70){
				results = {
					type : 'horse' ,
					image: 'horse.jpg',
					level: 'Average'
				};
			}else{
				results = {
					type : 'cheetah' ,
					image: 'puma.jpg',
					level: 'Expert'
				};
			}
			
			var html = '<div class = "result"><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute!</p><img width ="300" height = "200" class = "rounded-circle" src="images/%image%" alt = %alt%></div>';
			
			html = html.replace('%type%',results.type);
			html = html.replace('%wpm%',wpm);
			html = html.replace('%image%',results.image);
			html = html.replace('%alt%',results.type);
			
			DOMElements.nameInput.insertAdjacentHTML('beforebegin',html);
			
			DOMElements.download.setAttribute('level',results.level);
			
		},
		
		
		showModal : function(){
			DOMElements.modal.modal('show');
		},
		
		inputFocus: function () {
			DOMElements.textInput.focus();
		},
		
		isNameEmpty : function(){
			return DOMElements.nameField.value == ""
		},
		
		flagNameInput: function(){
			DOMElements.nameField.style.borderColor = 'red';
		},
		
		spacePressed: function (event) {
			return event.data == ' '
		},

		enterPressed: function (lineReturn) {
		return DOMElements.textInput.value.includes(lineReturn + ' ');
	},

		emptyInput: function () {
			DOMElements.textInput.value = '';
		},
		
		getTypedWord: function () {
			console.log(DOMElements.textInput.value);
			return DOMElements.textInput.value;
		},

		fillContent: function (array, lineReturn) {

			var content = array.map(splitArray);
			content = content.map(addSpace);
			content = content.map(addSpanTag);
			content = content.map(addWordSpanTag);
			content = content.map(joinEachWord);
			content = content.join('');
			content = content.split('<span>' + lineReturn + '</span>').join('<span>&crarr;</span>');
			DOMElements.content.innerHTML = content;

		},
		
		formatWord: function (wordObject) {
			var activeWord = DOMElements.activeWord;
			activeWord.className = 'activeWord';

			var correctValue = wordObject.value.correct;
			userValue = wordObject.value.user;


			var classes = Array.prototype.map.call(correctValue,
				returnCharClass);
			var activeWord = DOMElements.activeWord;
			var characters = activeWord.children;

			for (var i = 0; i < characters.length; i++) {
				characters[i].removeAttribute('class');
				characters[i].className = classes[i];
			}

		},
		
		setActiveWord: function (index) {

			DOMElements.activeWord = DOMElements.content.children[index];

		},
		
		deactivateCurrentWord: function () {
			DOMElements.activeWord.removeAttribute('class');
		},
		
		scroll: function () {
			var activeWord = DOMElements.activeWord;
			var top1 = activeWord.offsetTop;
			var top2 = DOMElements.content.offsetTop;
			var diff = top1 - top2;
			DOMElements.content.scrollTop = diff - 40;
		}

	}
})()
