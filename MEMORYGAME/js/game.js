/* * Create a list that holds all of your cards */

let cardsItems=['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-bicycle','fa-bicycle','fa-leaf','fa-leaf','fa-bomb','fa-bomb'];

let open=[];
let match=0;
let moves=0;
let stars=3
let timer=0;
let min=0;
let sec=0;


let startInterval=setInterval(function(){
	sec=sec+1;	
	if(sec==59){
		min=min+1;
		sec=00;
	}

		$(".timer").text(min+":"+sec+" time")
},1000);


// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function updateCards() {
    cardsItems = shuffle(cardsItems);
    var m= 0;
    $.each($(".card i"), function(){
      $(this).attr("class", "fa " + cardsItems[m]);
      m++;
    });
};
updateCards();





function ratings(){
	$('.fa-star').last().attr('class',"fa fa-star-o").css("color","red");
}




$('.card').click(function(){
	$(this).addClass("open show");
	$(this).addClass("pointer-event");

	if(open.length===0){		
		open.push($(this).children().attr('class'));
	}else if(open.length===1){		
		open.push($(this).children().attr('class'));


		if(open[0]===open[1]){
			matched();
			
			open.pop();
			open.pop();
		}

		else if(open[0]!==open[1]){			
			$(this).addClass('open show');
			var first='.'+open[0].slice(3);
			var second='.'+open[1].slice(3);
       
			setTimeout(function(){
				$(first).parent('.card').attr('class','card');
				$(second).parent('.card').attr('class','card');
				moves+=1;
				if((moves===16 || moves===20)){
					stars++;
					ratings();
				}
				$(".moves").text(moves);
				open.pop();
				open.pop();				
			},300)
		}
	}
});


 function matched(){

 	var first='.'+open[0];
			var second='.'+open[1];
			$(first).parent('.card').attr('class','card match pointer-event');
			$(second).parent('.card').attr('class','card match pointer-event');
			match+=1;
			matchcondition();
			
 }

function matchcondition() {

	if(match===8){
				$('#myModal').modal('show');
				$('.moves').text(moves);
				$("#matches").text(match);
				$(".star").text(stars);
				$("#scoreTime").text(min+" : "+sec);

				let stopInterval=setInterval(function(){
					clearInterval(startInterval);
				});
			}
}
















































