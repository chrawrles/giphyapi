var meme = ['Grumpy Cat', 'Doge', 'Scumbag Steve', 'Pepe', 'Nick Young', 'Rickroll', 'Fidget Spinner', 'Shia Lebouf', 'Water Bottle Flip'];
var current; var paused; var animated; var still;

function createButtons(){
	$('#MemeButtons').empty();
	for(var i = 0; i < meme.length; i++){
		var memeBtn = $('<button>').text(meme[i]).addClass('memeBtn').attr({'data-name': meme[i]});
		$('#MemeButtons').append(memeBtn);
	}

	$('.memeBtn').on('click', function(){
		$('.display').empty();

		var thisMeme = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + thisMeme + "&limit=20&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			current = giphy.data;
			$.each(current, function(index,value){
				animated= value.images.original.url;
				paused = value.images.original_still.url;
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				still= $('<img>').attr('data-animated', animated).attr('data-paused', paused).attr('src', paused).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, still);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

$('#addMeme').on('click', function(){
	var newMeme = $('#newMemeInput').val().trim();
	meme.push(newMeme);
	createButtons();
	return false;
});

createButtons();