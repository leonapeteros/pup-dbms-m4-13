$(function (){
var check = [];
function onFormSubmit(event){
	

	var data= $(event.target).serializeArray();

	var thesis = {};
	for (var i=0; i<data.length; i++){
		thesis[data[i].name] = data[i].value 

	}
	//send data to server
	var thesis_create_api = '/api/thesis';
	$.post(thesis_create_api,thesis,function(response){	 //url,data,callback
		if (response.status = "ok"){

		}});

	var list_element=$('<li id="item"' +'class="' + thesis.year + thesis.title + '">');
	list_element.html(thesis.year + ' ' + thesis.title + ' '  + ' <input type=button class="buttn btn-danger  btn-xs" value="Delete"  > ');
	
	if  ($('ul.thesis-list li').hasClass(thesis.year + thesis.title))
	{
		alert('Duplicate entries found! .Try Again');
	}
	else
	{
		$(".thesis-list").prepend(list_element) ;
		check.push(thesis.year + ' ' + thesis.title);

	}

	 return false;

}


function loadAllthesis_list() {
	var thesis_list_api = '/api/thesis';
	$.get(thesis_list_api, {}, function(response){
	console.log('thesis list', response)
	response.data.forEach(function(thesis){
	$('table tr:first').after('<tr></tr>');
	$('tr:eq(1)').append('<td >'+ thesis.user_id + '</td>');
	$('tr:eq(1)').append('<td >'+ thesis.user_email + '</td>');
    $('tr:eq(1)').append('<td >'+ thesis.year + '</td>');
    $('tr:eq(1)').append('<td >'+ thesis.title + '</td>') ;
	$('tr:eq(1)').append('<td >'+  (' <a  href=\'thesis/edit/'+thesis.id+'\'>Edit</a>')+ ' ' + ('<a href=\'thesis/delete/'+thesis.id+'\'>Delete</a>')+ '</td>') ;
	
});
});
};

function DeleteEntry(event){
	$(this).parent().remove();
	$(this).closest('li').remove();
				
}
$(document).on('click',  '.buttn' , DeleteEntry)

$('.create-form').submit(onFormSubmit)
	loadAllthesis_list()
$('.create-form').submit(function(onFormSubmit){ 
    this.reset();


});
});

// Module 4