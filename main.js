$(document ).ready(function() {
	$('#toggleForm').on('click', () => {
		console.log('toggle form button clicked;');
		$('#elemForm').slideToggle('slow');
	})
	//change vanJS to jQ

// http://small-tiyfe.herokuapp.com/collections/katyelements
//below is old. along with greyhound notes from holder js file
	function Elem(name, number, mass, trivia){
		this.name = name;
		this.number = number;
		this.mass = mass;
		this.trivia = trivia;
	}
	let elementCards = [];
/* http://small-tiyfe.herokuapp.com/collections/katyelements */
// const saveBtn = document.getElementById('saveBtn');
	$('#saveBtn').on('click', (e)=>{
		console.log(`You've made the switch to jQuery at save button. Good on you, kitten.`);
		

// saveBtn.addEventListener('click', function(e){
	e.preventDefault();
  // get value of fields
	const name = document.getElementById('elemEntry').value.trim();
	const symbol = document.getElementById('elemSymbol').value.trim();
	const number = document.getElementById('atomNoEntry').value.trim();
	const mass = document.getElementById('atomMassEntry').value.trim();
	const trivia = document.getElementById('trivia').value.trim();

	let elementCard = new Elem(name, number, mass, trivia);
  
	elementCards.push(elementCard);
	// str = JSON.stringify(elementCards);
	str = JSON.stringify(elementCards, null, 4); // (Optional) beautiful indented output.
	console.log(`Stack of elementCards: ${str}`); // Logs output to dev tools console.
	
// 	$.ajax({
// 				type: 'POST',
// 				url: 'http://small-tiyfe.herokuapp.com/collections/katyelements/',
// 				data: elements,
// 				success: function(newFoster){
// 					addFoster(newFoster);
// 					$name.val('');
// 					$sex.val('');
// 					$color.val('');
// 					$adoption_group.val('');
// 					$notes.val('');
// 					$photo.val('');

// 				}
//   document.querySelectorAll('.inputFields').value = '';
//   //capture the entry, create an object and push to an array
	});

});