$(document).ready(function () {

  /*
  A function take the form data and format into the APIs expected JSON input
  @INPUT data: A serialized form array of key:value pairs
  */
  function serializeCourseObject(data) {

    clean_obj = {'name': null, 'credits': null, 'duration': null, 'tutor': [], 'about': null };

    $.each(data, function(i, item) {
      if(data[i].name === 'tutor') {
        clean_obj.tutor.push( { 'email' : $('#create-course-form #id_tutor option[value=' + data[i].value + ']').html() } );
      } else {
        clean_obj[data[i].name] = data[i].value;
      }
    });
    return clean_obj
  };

  /*
  A jquery binding to handle the processing of the course creation form
  */
  $('#create-course-form').submit(function(event) {

      event.preventDefault();

      $form = $(this);

      clean_data = serializeCourseObject($('#create-course-form').serializeArray());

      $.ajax({
        url: $(this).attr('action'), // url where to submit the request
        type : $(this).attr('method'), // type of action POST || GET
        dataType : 'json', // data type
        contentType: 'application/json',
        data : JSON.stringify(clean_data), // post data || get data
        success : function(result) {
            // you can see the result from the console
            // tab of the developer tools
            $('#create-course-form').each(function(){
                this.reset();
            });
            $('div #warning').remove();
            console.log(result);
            window.alert('Succesfuly added a new course!');
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            //custom handler to append errors to the form for the user to fix
            errors = xhr.responseJSON
            $.each(errors, function(i, item) {
                $('#create-course-form #div_id_' + i).append('<div id="warning"> <p> **' + item + '</p></div>');
            });
        }
    });
  });

});