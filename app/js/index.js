(function() {
  
  
  var questionCounter = 0; //Tracks question number
  var startQuestion = questionCounter;
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var quizscore = $('#quizscore');
  var repo = $('#repo');
  // Display initial question
  displayNext();
  
// Click handler for the 'next' button
  $('#init').on('click', function (e) {
    questionCounter = parseInt(document.getElementById("init_question").value)-1;
    startQuestion = questionCounter;
    selections = []; 
    quiz = $('#quiz');
    var quizscore = $('#quizscore');
  	// Display initial question
  	displayNext();
    //document.getElementById("demo").innerHTML = x;
  });

  $('#report').on('click', function (e) {
    repo.text(displayScore_new_repo());
  });

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter-startQuestion])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Domanda ' + (index + 1) + ':</h2>');
    qElement.append(header);

    if (typeof questions[index].img !== 'undefined'){
    	var image = $('<img src="'+questions[index].img+'" alt="Img" >')
    	qElement.append(image);
    }

    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter-startQuestion] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {+-
      $('#question').remove();
      //$('#img').hide();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        //console.log(displayScore_new());
        quizscore.text(displayScore_new());
        if (!(isNaN(selections[questionCounter-startQuestion]))) {
          $('input[value='+selections[questionCounter-startQuestion]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === startQuestion+1){
          $('#prev').show();
        } else if(questionCounter === startQuestion){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }

  function displayScore_new_repo() {
    var ques = "[id,errata,corretta]";
    for (var i = 0; i < selections.length; i++) {  
      //console.log(selections[i]+"---"+questions[startQuestion+i].correctAnswer);
      if (selections[i]!==questions[startQuestion+i].correctAnswer){
        console.log("DOMANDA:"+(startQuestion+i+1)+", RISPOSTA SBAGLIATA:"+selections[i]+", CORRETTA:"+questions[startQuestion+i].correctAnswer);
        ques = ques.concat("["+(startQuestion+i+1)+","+selections[i]+","+questions[startQuestion+i].correctAnswer+"]");
      }
    }
    return ques;
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore_new() {
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {  
      // console.log(selections[i]+"---"+questions[startQuestion+i].correctAnswer);
      if (selections[i] === questions[startQuestion+i].correctAnswer) {
        numCorrect++;
      }
    }

    return numCorrect.toString()+" corrette su "+(selections.length).toString() + " risposte";
  }
})();