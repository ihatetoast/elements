$(document ).ready(function() {
	$('#toggleForm').on('click', () => {
		console.log('toggle form button clicked;');
		$('#elemForm').slideToggle('slow');
	})

// http://small-tiyfe.herokuapp.com/collections/katyelements

  //variables for string literal
	const name = $('#elemEntry');
	const symbol = $('#elemSymbol');
	const number = $('#atomNoEntry');
	const deutsch = $('#deutsch');
	const trivia = $('#trivia');
// const saveBtn = document.getElementById('saveBtn');
	$('#saveBtn').on('click', (e)=>{
		e.preventDefault();
		const element ={
			_id: `${number.val()}-${Date.now()}`,
			name: name.val(),
			symbol: symbol.val(),
			number: number.val(),
			deutsch: deutsch.val(),
			trivia: trivia.val()
		}
		$.ajax({
				type: 'POST',
				url: 'http://small-tiyfe.herokuapp.com/collections/katyelements/',
				data: element,
				success: function(newElement){
					// addElement(newElement);
					name.val('');
					symbol.val('');
					number.val('');
					deutsch.val('');
					trivia.val('');}
  
		});
	});
});