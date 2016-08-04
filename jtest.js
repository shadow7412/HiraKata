//Global Variables. I don't care what you say, they are useful. Whinge all you want.
var letters = new Array(46);
letters[0] = "あアA";
letters[1] = "いイI";
letters[2] = "うウU";
letters[3] = "えエE";
letters[4] = "おオO";
letters[5] = "かカKA";
letters[6] = "きキKI";
letters[7] = "くクKU";
letters[8] = "けケKE";
letters[9] = "こコKO";
letters[10] = "さサSA";
letters[11] = "しシSHI";
letters[12] = "すスSU";
letters[13] = "せセSE";
letters[14] = "そソSO";
letters[15] = "たタTA";
letters[16] = "ちチCHI";
letters[17] = "つツTSU";
letters[18] = "てテTE";
letters[19] = "とトTO";
letters[20] = "なナNA";
letters[21] = "にニNI";
letters[22] = "ぬヌNU";
letters[23] = "ねネNE";
letters[24] = "のノNO";
letters[25] = "はハHA";
letters[26] = "ひヒHI";
letters[27] = "ふフFU";
letters[28] = "へヘHE";
letters[29] = "ほホHO";
letters[30] = "まマMA";
letters[31] = "みミMI";
letters[32] = "むムMU";
letters[33] = "めメME";
letters[34] = "もモMO";
letters[35] = "やヤYA";
letters[36] = "ゆユYU";
letters[37] = "よヨYO";
letters[38] = "らラRA";
letters[39] = "りリRI";
letters[40] = "るルRU";
letters[41] = "れレRE";
letters[42] = "ろロRO";
letters[43] = "わワWA";
letters[44] = "をヲWO";
letters[45] = "んンN";
// This 2D array stores how many times you got the letter right for each letter. It is used in the hope that if you are getting a letter correct constatly, it will show up less than the others. It is in the form [letter][characterset]
var correctans = new Array(46);
for(i=0;i!=46;i++){
  correctans[i]=Array(2);
  correctans[i][0]=0;
  correctans[i][1]=0;
}
// This is in here so that javascript doesnt forget things after the function is run, as the function checks against the old before generating a new character.
var score=0,
    total=0,
    beststreak=0,
    streak=0,
    nr, // the character set to use
    sr, // the character's index
    oldone,
    cap;

function run(firstrun){
  if (!firstrun){
    theguess = document.guess.guessbox.value.toUpperCase();
    var justanswer="";
    // pulls out all characters except the first two: aka the expected answer.
    for (var i = 2; letters[sr].length > i; i++){
      justanswer += letters[sr].charAt(i);
    }
    // Checks for correctness. If correct, adds to the score and total and streak, and also makes the character harder to get in the future. If incorrect, resets streak and adds to the total. Also displays what was expected in the text box. This area also errorchecks against blank answers (usually an indication that a firefox user has not clicked back into the textbox)
    if (justanswer === theguess){
      total++;
      score++;
      streak++;
      correctans[sr][nr] = correctans[sr][nr] + 100;

    } else if(theguess === "") {
      alert("Please enter the answer into the textbox!");
      return false;
    } else {
      total++;
      if (streak > beststreak){
        beststreak = streak;
      }
      correctans[sr][nr] = correctans[sr][nr]/3;
      streak = 0;
      do { //forces the user to type the correct answer, as a way of enforcing it.
        anothergo = prompt("Type '" + justanswer + "'.");
      } while(justanswer != anothergo.toUpperCase());
    }
  }
  //Reads in the radio buttons to find how far down the array to choose a number from
  if (document.guess.cover[0].checked){
    cap=5;
  } else if (document.guess.cover[1].checked){
    cap=10;
  } else if (document.guess.cover[2].checked){
    cap=15;
  } else if (document.guess.cover[3].checked){
    cap=20;
  } else if (document.guess.cover[4].checked){
    cap=25;
  } else if (document.guess.cover[5].checked){
    cap=30;
  } else if (document.guess.cover[6].checked){
    cap=35;
  } else if (document.guess.cover[7].checked){
    cap=38;
  } else if (document.guess.cover[8].checked){
    cap=43;
  } else {
    cap=46;
  }
  // Generates the character that shall be tested on.
  var repicked = 0;
  var skippedletters = "";
  while (i!=100){
    sr = Math.floor(Math.random() * cap);
    if (document.guess.hkb[0].checked){
      nr = 0;
    } else if(document.guess.hkb[1].checked){
      nr = 1;
    } else {
      nr = Math.floor(Math.random() * 2);
    }
    // This check prevents doubleups, and makes the numbers that are constantly correct come up less frequently. NEEDS MORE WORK. ONE DAY.

    if (!Math.floor(Math.random() * (correctans[sr][nr]))){
      if (oldone!=letters[sr][nr]){
        oldone = letters[sr][nr];
        break;
      }
    }
    repicked++;
    skippedletters += letters[sr][nr];
    if (oldone !== letters[sr][nr]){
      i++;
    }
  }

  //Sets up the form: clears the box, sets the letter, and updates the score.
  document.guess.guessbox.value = "";
  document.guess.guessbox.focus();
  document.getElementById("letter").innerHTML = letters[sr][nr];
  var percent = Math.floor((1.0*score/total)*100);
  if (isNaN(percent)){
    percent = 0;
  }
  document.getElementById("score").innerHTML = "Score: " + score + "/" + total + ". (" + percent + "%) <br>Streak: " + streak + " Best Streak: " + beststreak + ".";
  //document.getElementById("warning").innerHTML="Skipped "+repicked+" letters: "+skippedletters;
  return false;
}
