$(document ).ready(function() {
	$('#toggleForm').on('click', () => {
		$('#elemForm').slideToggle('slow');
	});

	$(function(){
		//variables for string literal
		const elemStack = $('#elemStack');
		const name = $('#elemEntry');
		const symbol = $('#elemSymbol');
		const number = $('#atomNoEntry');
		const deutsch = $('#deutsch');
		const trivia = $('#trivia');

		function addElement(element){
			elemStack.prepend(
				`<div class="flexColumn element">
					<p class="atomicNo">${element.number}</p>
					<p class="atomicSymbol">${element.symbol}</p>
					<p class="elemName">${element.name}</p>
				</div>`
			);
		}
	$.ajax({
		type: 'GET',
		url: 'http://small-tiyfe.herokuapp.com/collections/chemicalelements/',
		success: function(elements){
			$.each(elements, (i, element) => {
				addElement(element);
			})
		},
		error: function(error){
			// console.log(error);
			alert('Error loading elements.')
		},
		complete: function(){
			console.log('You gots elements.')
		}
	});
	$('#saveBtn').on('click', (e)=>{
		e.preventDefault();
		const element ={
			name: name.val().toLowerCase(),
			symbol: symbol.val().toLowerCase(),
			number: number.val(),
			deutsch: deutsch.val().toLowerCase(),
			trivia: trivia.val()
		}
		console.log(element);
		$.ajax({
				type: 'POST',
				url: 'http://small-tiyfe.herokuapp.com/collections/chemicalelements',
				data: element,
				success: function(newElement){
					addElement(newElement);
					name.val('');
					symbol.val('');
					number.val('');
					deutsch.val('');
					trivia.val('');
				},
				error: function(error){
					console.log(error);
					alert("error in loading new element.");
				},
				complete: function(){
					console.log('you did something fantastic.')
				}
  
		});
	});

	})
  

			
// ecmasript6 for when i want to cap first letter of the chem symbol:
// const capitalize = str => str.length
//   ? str[0].toUpperCase() +
//     str.slice(1).toLowerCase()
//   : '';

// const saveBtn = document.getElementById('saveBtn');
	
});