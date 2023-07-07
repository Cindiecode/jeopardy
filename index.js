
let counter= 0;
let flag= false;
let questionStack=[];



async function setupAndStart() {
    $("#start").click(function(e){
        questionCard();
    });
}



function questionCard() {
    
        $('#question-card').fadeIn();


       
    

        $.ajax({url: "http://jservice.io/api/categories?count=6", success: function(result){
            for(let i=0; i < result.length; i++){

        let categoryId= result[i].id;
        console.log(categoryId)
             $.ajax({url:"http://jservice.io/api/clues?category=" + categoryId + "&count=2" , success: function(question){
                 for(let i=0; i < 2; i++){
                     let clues= {
                    question: question[i].question,
                    category: question[i].category.title,
                      answer: question[i].answer
              }
              questionStack.push(clues); 
              }
              
          }});
          
}}});

displayQAndC();
}

function displayQAndC(){
    $('#question').text(questionStack[counter].question);
    $('#category').text(questionStack[counter].category);
}


function gameOver(){ 
    $('#question-card').fadeOut();
    $('#game-over').fadeIn();
    $('#reload-text').text("Game Over. Please reload."); 
    let button = $("<button>").text("Restart Game").attr("id", "reload-button");
    
if (counter== questionStack.length){
    $("#game-over").append(button);
}
counter=0; 
  $("#reload-button").click(function(){
    $('#game-over').fadeOut();
        questionCard()});
}




function displayAnswer(){
  if (flag == false){
        $('#answer').text(questionStack[counter].answer); 
        flag = true;
        counter++;
        if (counter == questionStack.length) {
           return gameOver();
        }
    }
    else {
        $('#answer').text("");  
        displayQAndC();
        flag=false;
    }
}

$("#start").click(function(){
    questionCard()});

$("#question-card").click(function(e){displayAnswer();
    });










  


