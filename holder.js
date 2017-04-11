var handleData = function(data){
	data.results.forEach(function(val, index, arr){
	//HOLDERS
	var indivItems =$('<div class="indiv-items"></div>');//little ones that hold all of these 
	var	textBox = $('<div class="text-box"></div>');
	var imageBox = $('<div class="image-holder"</div>');

	//DATA
	var title = $('<div class="item-title"></div>', {'data-id': val.listing_id}).html(val.title);
	var price = $('<div class="price"></div>', {class:val.price}).html('$'+val.price);
	var url = $('<a></a>', {href:val.url});
	var shopName = $('<div></div>', {'data-id': val.id}).html(val.Shop.shop_name);
	var itemImg = $('<img/>', {src:val.Images[0].url_170x135});

	//APPENDECTOMY
    container.append(indivItems);//big bastard the SECTION
    
 	url.append(itemImg); //image onto the link
 	imageBox.append(url); //linkinto the image box
   indivItems.append(imageBox);

    indivItems.append(textBox);
    
    textBox.append(title);
    textBox.append(shopName);
    textBox.append(price);
    

    //Create a function that makes an AJAX request to the Etsy API 
//using whatever search term you'd like.
var settings = {
	url:'https://api.etsy.com/v2/listings/active.js?api_key=ucchv0eh6zpa6tu1rvyn8dhf&keywords=greyhounds&includes=Images,Shop',
	type: 'GET',
	dataType: 'jsonp',//<--part of the etsy thing
	success: handleData,
	error: function(err){
		console.log(err);
	},
	complete: function(){
		console.log("Looking for greyhound items on Etsy.")
	}
}
$.ajax(settings);

$(document ).ready(function() {
	console.log("Greyhounds are go!");

	$(function(){
		var $greyhoundList = $('#greyhoundList');
		var $name = $('#name');
		var $sex = $('#sex');
		var $color = $('#color');
		var $adoption_group = $('#adoption_group');
		var $notes = $('#notes');
		var $photo = $('#photo');

		function addFoster(greyhound){
			$greyhoundList.prepend(
				`<div class="row fosterRow">
					<div>
						<li id="fosterItem" data-id=${greyhound._id}>
							<div id="fosterPhoto">
								<img src="./../images/photos/fosters/${greyhound.photo}"/>
							</div>
							<p>	
								<strong>Name: </strong>
								<span class="noeditFosterEntry fosterName" id="individualFoster"> ${greyhound.name}</span>
								<input class="editFosterEntry fosterName"/>
							</p>
							<p>
								<strong>Sex: </strong>
								<span class="noeditFosterEntry fosterTrait fosterSex"> ${greyhound.sex}</span>
								<input class="editFosterEntry fosterSex">
							</p>
							<p>
								<strong>Color: </strong>
								<span class="noeditFosterEntry fosterTrait fosterColor"> ${greyhound.color}</span>
								<input class="editFosterEntry fosterColor">
							</p>
							<p>
								<strong>Adoption group: </strong>
								<span class="noeditFosterEntry fosterTrait fosterAdoptionGroup">  ${greyhound.adoption_group}</span>
								<input class="editFosterEntry fosterAdoptionGroup">
							</p>
							<p>
								<strong>Notes: </strong>
								<div class="noeditFosterEntry fosterTrait fosterNotes">  ${greyhound.notes}</div>
								<textarea rows='20' cols='50'class="editFosterEntry fosterNotes"></textarea>
							</p>
							<button data-id=${greyhound._id} class="noeditFosterEntry delBtn">Delete</button>
							<button class="noeditFosterEntry editFosterBtn">Edit</button>
							<button class="editFosterEntry saveEditBtn">Save</button>
							<button class="editFosterEntry cancelEditBtn">Cancel</button>
						</li>
					</div>
				</div>`
			);
		}
		$.ajax({
			type: 'GET',
			url: 'http://small-tiyfe.herokuapp.com/collections/greyhounds/',
			success: function(greyhounds){
				$.each(greyhounds, function(i, greyhound){
					addFoster(greyhound);
				})
			},
			error: function(error){
				// console.log(error);
				alert('Error loading greyhounds.')
			},
			complete: function(){
				console.log('You have retrieved some lovely greyhounds.')
			}
		});
		$('#addFoster').on('click', function(){
			var foster ={
				name: $name.val(),
				sex: $sex.val(),
				color: $color.val(),
				adoption_group: $adoption_group.val(),
				notes: $notes.val(),
				photo: $photo.val()
			}
			$.ajax({
				type: 'POST',
				url: 'http://small-tiyfe.herokuapp.com/collections/greyhounds/',
				data: foster,
				success: function(newFoster){
					addFoster(newFoster);
					$name.val('');
					$sex.val('');
					$color.val('');
					$adoption_group.val('');
					$notes.val('');
					$photo.val('');

				},
				error: function(error){
					console.log(error);
					alert("Error in saving new foster.");
				},
				complete: function(){
					console.log('You have posted a new foster.')
				}
			})
		});
		//listen to the parent container since asynch and won't be loaded in time. 
		$greyhoundList.delegate('.delBtn', 'click', function(){
			var $li = $(this).closest('li');
			$.ajax({
				type: 'DELETE',
				url: 'http://small-tiyfe.herokuapp.com/collections/greyhounds/'+$(this).attr('data-id'),
				success: function(){
					console.log("You deleted a foster. You're mean.")
					$li.fadeOut(300, function(){
						$(this).remove();
					});
				}
			});
		});
		$greyhoundList.delegate('.editFosterBtn', 'click', function(){
			console.log("edit button clicked")
			var $li = $(this).closest('li');
			// put the value of the span or div that holds the text i'll edit
			// into the input field so i see waht i need to edit.
			$li.find('input.fosterName').val($li.find('span.fosterName').html());
			$li.find('input.fosterSex').val($li.find('span.fosterSex').html());
			$li.find('input.fosterColor').val($li.find('span.fosterColor').html());
			$li.find('input.fosterAdoptionGroup').val($li.find('span.fosterAdoptionGroup').html());
			$li.find('textarea.fosterNotes').val($li.find('div.fosterNotes').html());
			$li.addClass('editFosterEntry');
		})
		$greyhoundList.delegate('.cancelEditBtn', 'click', function(){
			console.log("cancel button clicked")
			$(this).closest('li').removeClass('editFosterEntry');
		})
		$greyhoundList.delegate('.saveEditBtn', 'click', function(){
			console.log("save button clicked")
			var $li = $(this).closest('li');
			var foster ={
				name: $li.find('input.fosterName').val(),
				sex: $li.find('input.fosterSex').val(),
				color: $li.find('input.fosterColor').val(),
				adoption_group: $li.find('input.fosterAdoptionGroup').val(),
				notes: $li.find('textarea.fosterNotes').val()
			}
			$.ajax({
				type: 'PUT',
				url: 'http://small-tiyfe.herokuapp.com/collections/greyhounds/'+$li.attr('data-id'),
				data: foster,
				success: function(newFoster){
					console.log('You edited the entry.')
					$li.find('span.fosterName').html(foster.name);
					$li.find('span.fosterSex').html(foster.sex);
					$li.find('span.fosterColor').html(foster.color);
					$li.find('span.fosterAdoptionGroup').html(foster.adoption_group);
					$li.find('div.fosterNotes').text(foster.notes);
					$li.removeClass('editFosterEntry');
				},
				error: function(error){
					console.log(error);
					alert("Error in saving edit.");
				},
				complete: function(){
					console.log('You have edited a foster.')
				}
			})
		})
	});

});
























	