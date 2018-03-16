
score = {
    num: 100,
    add: function (num) {
        if (num === undefined) {num = 1}
        this.num += num;
        DOM.points.innerHTML = "score: " + score.num 
    },
    remove: function (num) {
        if (num === undefined) {num = 1}
        this.num -= num;
        DOM.points.innerHTML = "score: " + score.num 
    }
};

stopWatch = {
    start: function () {
        this.start = new Date();
    },
    getTime: function () {
        var now = new Date();
        return (now - this.start)/1000;
    }
}

DOM = (function getDOM () {
    let DOM = {};
    let allDOM = document.getElementsByTagName("*");
    for (let i=0; i<allDOM.length; i++){
        if (allDOM[i].id !== ""){
            DOM[allDOM[i].id] = allDOM[i];
        }
    }
    return DOM;
})();

for (let i=1; i<16; i++) {
    DOM["bttn_" + i].addEventListener ("click", addLetter);
}

DOM.bttn_16.addEventListener ("click", () => {
    score.remove(1);
    let n = word.soFar.length;
    let letter = word.id[n];
    word.soFar += letter;
    for (let i=1; i<16; i++) {
        if (DOM["bttn_" + i].value === letter) {
            if (DOM["bttn_" + i].style.backgroundColor !== "rgb(0, 0, 0)") {
                DOM["bttn_" + i].style.backgroundColor = "rgb(0, 0, 0)";
                DOM.word.innerHTML = word.soFar;
                break;
            }
        }
    }
    if (DOM.word.innerHTML.trim() === word.id) {
        showScreenSuccess();
    }  
});

DOM.bttn_17.addEventListener("click", () => {
    score.remove(2);
    var msg = new SpeechSynthesisUtterance(word.id);
    window.speechSynthesis.speak(msg);  
})

DOM.bttn_18.addEventListener ("click", () => {
    score.remove(5);
    let tmp = DOM.word.innerHTML;
    DOM.word.innerHTML = word.id;
    setTimeout(()=>{
        DOM.word.innerHTML = tmp;
    }, 200)
});

DOM.bttn_19.addEventListener ("click", () => {
    score.remove(5);
    DOM.img.style.display = "block";
    DOM.img.style.visibility = "visible"
    DOM.letters.style.display = "none";
    DOM.description.style.display = "none";
    setTimeout(()=>{
        DOM.img.style.display = "none";
        DOM.img.style.visibility = "hidden"
        DOM.letters.style.display = "block";
        DOM.description.style.display = "block";
    }, 400)
});

DOM.bttn_20.addEventListener ("click", () => {
    score.remove(1);
    DOM.word.innerHTML = word.soFar;
    for (let i=1; i<16; i++) {
        DOM["bttn_" + i].style.visibility = "visible";
    }
});

// Get JSON words
word = {};
function getNewWord () {
    var num =  Math.floor(Math.random() * (words.length - 1)) + 1;   
    word.id = words[num].id.toUpperCase();
    word.url = "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=" + words[num].urlId;
    word.shuffled = shuffle(word.id, 15);
    word.soFar = "";
    word.description = words[num].definition;
    if (!word.description) {
        word.description = dictionary[word.id];
        //word.description.replace(word.id, "###");
        //word.description.replace(word.id.toLowerCase(), "###");
        //word.description.replace(word.id, "###");
        //word.description.replace(word.id.charAt(0).toUpperCase() + word.id.slice(1), "###");
    }
};

function update () {

    //getNewWo
    getNewWord();

    // Reset letters
    for (let i=1; i<16; i++) {
        DOM["bttn_" + i].value = word.shuffled[i-1];
    }

    // Reset screen
    DOM.word.style.color = "black";
    DOM.img.style.visibility = "hidden";
    DOM.img.style.display = "none";
    DOM.img.setAttribute ("src", word.url);
    DOM.game.style.visibility = "visible";
    DOM.word.innerHTML = "";
    DOM.word.style.background = "white";
    DOM.letters.style.display = "initial";
    for (let i=1; i<16; i++) {
        DOM["bttn_" + i].style.visibility = "visible";
        DOM["bttn_" + i].style.backgroundColor = "rgb(200, 200, 200)";
    }
    
    if (word.description === undefined) {
        DOM.description.innerHTML = "";
    } else {
        DOM.description.innerHTML = word.description;
    }
}

function addLetter (){
    DOM.word.innerHTML += this.value;
    this.style.visibility = "hidden";
    if (DOM.word.innerHTML.trim() === word.id) {
        score.add(5);
        showScreenSuccess();
    }
}

function showScreenSuccess () {
    DOM.word.style.color = "green";
    DOM.letters.style.display = "none";
    DOM.img.style.visibility = "visible"
    DOM.img.style.display = "block"
    DOM.img.addEventListener ("click", update);
    DOM.description.style.visibility = "visible"
    var msg = new SpeechSynthesisUtterance(word.id);
    window.speechSynthesis.speak(msg);  
}

function shuffle(word, len) {
    while (word.length < len ) {
        word += " ";
    }
    var arr = word.split("");
    var x, i, j;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr.join("");
}

update ();



