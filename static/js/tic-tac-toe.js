$(function(){

    // set the beginning text alignment
    var windowHeight = $(window).height();
    var headerDivHeight = $("#header-div").height();
    var marginTop = (windowHeight-headerDivHeight)/2;

    // set the beginning background div
    $("#background-div").height(30+headerDivHeight);
    $("#background-div").css("margin-top", marginTop+30);

    function showForm(evt){
        // change header text
        $("h1").prop('class',"fadeInUpBig").removeAttr("margin-top").html("Tic-Tac-Toe PLUS!");

        // hide begin button
        $("#begin").hide();
        
        // show form
        $(".game").removeAttr("hidden");

        //change background div height
        var row1Height = $("#row1").height();
        var row2Height = $("#row2").height();
        $("#background-div").height(20+row1Height+row2Height);
       
       // set size of placeholder div
       var arrowWidth = $("#arrow1").height();
       $("#placeholder").width(arrowWidth);

    }

    // create board based on form input
    function createBoard(evt){


        // empty board
        $("#board").empty();
        evt.preventDefault();
        n = parseInt($("input#num").val());

        // figure out dimenions based on window size
        var btnDimension = (($("#page-div").width() - n*2)/n);
        $("#board").css("max-width", (btnDimension*n));

        // loop through (2x) to create rows and columns of board as buttons
        for (var i=0; i<n; i++){
            for(var j=0; j<n; j++){
                $("#board").append("<button style='height:"+btnDimension+";width:"+btnDimension+";padding:0;margin:0' class='btn btn-default board-btn' data-row='"+i+"' data-column='"+j+"'}></button>");
            }
        }

        $(".board-btn").css("font-size",btnDimension).css("line-height", ".75em");
        //scroll to board
        $('#board')[0].scrollIntoView();
    }

    function resetBoard(evt){
        evt.preventDefault();

        n = parseInt($("input#num").val());

        // iterate through tiles on board and empty/enable them
        for (var m=0; m<(n*n); m++){
            $("#board")[0].children[m].disabled=false;
            $("#board")[0].children[m].innerHTML="";
        }

    }

    var move = "X";
    function addMove(evt){
        var players = $('input[name=options]:checked').val();
        // // find column and row of clicked on button
        // var column = evt.target.dataset.column;
        // var row = evt.target.dataset.row;

        // set button to current move ("X" or "O")
        evt.target.innerHTML = move;

        // disable button just clicked on
        evt.target.disabled = true;
        
        // check to see if there is a winner/tie based on latest move
        var answer = checkBoard(move);

        // if not winner/tie, proceed
        if (!answer){
            togglePlayer();
            
            if (players==="computer"){
                addComputerMove(move);
            }
        }
    }
    
    function addComputerMove(move){
        n = parseInt($("input#num").val());
        
        // the open array will collect the indices of open spots
        var open = [];

        for (var counter =0; counter<(n*n-1); counter++){
            if (($("#board")[0].children[counter].innerHTML)===""){
                open.push(counter);
            }
        }

        // randomly select an open index for the computer to play
        var index = _.sample(open, 1);
        $("#board")[0].children[index].innerHTML = move;
        $("#board")[0].children[index].disabled = true;
        
        checkBoard(move);

        togglePlayer();

    }

    function togglePlayer(){
     // toggle between X and O as current player 
        if (move === "X"){
            move = "O";
        }else{
            move = "X";
        }
    }

    function checkBoard(move){

        n = parseInt($("input#num").val());

        var winner;
        
        // check for a complete board
        var countBoard = 0;

        for (var r=0; r< n*n; r++){
            if(($("#board")[0].children[r].innerHTML)!==""){
                countBoard += 1;
            }
        }
        if(countBoard === (n*n)){
            winner = false;
        }

        // check for columns 
        var count1;
        // double for loop iterates first through the top of the column....
        for (var a=0; a<n; a+=1){
            count1 = 0;
            // ... then iterates through the next item in the column (+=n)
            for (var k=a; k<(n*n); k+=n){
                if (($("#board")[0].children[k].innerHTML)===move){
                    count1 += 1;
                }
                if (count1===n){
                    winner = true;
                } 
            }
        }

        // check for rows
        var count2;
        // double for loops iterates first through the first item in each row ...
        for (var b=0; b<n*n; b+=n){
            count2 = 0;
            // ... then iterates through the next item in the row (+=1)
            for (var l=b; l<(b+n); l+=1){
                if (($("#board")[0].children[l].innerHTML)===move){
                    count2 += 1;
                }
                if (count2===n){
                    winner = true;
                }
            }
        }

        // check for Top L - Bottom R diagonal
        var count3 = 0;
        // single for loop iterates across the board
        for (var c=0; c<(n*n); c+=(n+1)){
            if (($("#board")[0].children[c].innerHTML)===move){
                count3 += 1;
            }
            if (count3===n){
                winner = true;
            }
        }

        // check for Top R - Bottom L diagonal
        var count4 = 0;
        // single for loop iterates across the board
        for (var d=n-1; d<=(n*n-n); d+=(n-1)){
            if (($("#board")[0].children[d].innerHTML)===move){
                count4 += 1;
            }
            if (count4===n){
                winner = true;
            }
        }

        if (winner === true){
            $("#winner-title").html("Congrats to Player "+move+"!");
            $('#myModalWinning').modal('show');

            // disable the board
            for (var p=0; p<(n*n); p++){
                $("#board")[0].children[p].disabled=true;
            }
            return true;

        }else if (winner === false){
            $('#myModalCats').modal('show');
            return false;
        }

        return null;
    }

    // event listener for form submission -- n
    $("#n-form").on("submit", createBoard);

    // event listener for move click
    $("#board").on("click .board-btn", addMove);

    // event listener for reset board
    $("#reset").on("click", resetBoard);

    // event listener for clicking begin button
    $("#begin").on("click", showForm);

});

function resizeApp(){
    n = parseInt($("input#num").val());

    // make buttons change size
    var btnDimension1 = (($("#page-div").width() - n*2)/n);
    $(".board-btn").width(btnDimension1);
    $(".board-btn").height(btnDimension1);
    $("#board").width(btnDimension1*n +n*2);
    $(".board-btn").css("font-size",btnDimension1).css("line-height", ".75em");


    // make background-div different height
    var row1Height1 = $("#row1").height();
    var row2Height1 = $("#row2").height();
    $("#background-div").height(20+row1Height1+row2Height1);
}
// event listener for window resizing
  $(window).resize(resizeApp);
