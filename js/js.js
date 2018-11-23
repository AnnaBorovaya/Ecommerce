
$( function() {
	var handle = $( "#custom-handle" );
	var handle_2 = $( "#custom-handle_2" );
   $( "#slider-range" ).slider({
	 range: true,
	 min: 0,
	 max: 500,
	 values: [ 75, 300 ],
		   create: function() {
	   handle.append($("<span/>").text( $( this ).slider( "values", 0 ) ));
			   handle_2.append($("<span/>").text( $( this ).slider( "values", 1 ) ));
	 },
		   slide: function( event, ui ) {
	   $( "#custom-handle span" ).text( ui.values[0]);
				$( "#custom-handle_2 span" ).text( ui.values[1]);
	 }
   });
});

//$('.carousel').carousel({
//	interval: 500
//  })