$(document).ready(function () {

    /*
    A function take the form data and format into the APIs expected JSON input
    @INPUT data: A serialized form array of key:value pairs
    */
    function serializeCourseObject(data) {

        clean_obj = {'name': null, 'credits': null, 'duration': null, 'tutor': [], 'about': null };

        $.each(data, function(i, item) {
        if(data[i].name === 'tutor') {
            clean_obj.tutor.push( { 'email' : $('#update-course-form #id_tutor option[value=' + data[i].value + ']').html() } );
        } else {
            clean_obj[data[i].name] = data[i].value;
        }
        });
        return clean_obj
    };

    /*
    Adds data to form before shown to use for updates
    */
    function populateForm(form, data) {
        $.each(data, function(key, value){
            if (key === 'credits') {
                input = $('#id_credits', form).val(value);
            } else if (key === 'tutors') {
                tutors = value.split(',');
                $.each($('#update-course-form #id_tutor option'), function(i, val) { 
                    $.each(tutors, function(i, tutor) {
                        if(val.text.trim() === (tutor.trim())) {
                            $(val).attr('selected', true);
                        }
                    });
                });
            } else {
                $('[name='+key+']', form).val(value);
            }
        });
    };

    /*
    Returns a pretty string from an array of multiple tutor emails
    */
   json_format_tutors = function (tutors) {
        tutor_emails = ""
        $.each(tutors, function (i, tutor) {
            tutor_emails = tutor_emails + ' ' + tutor.email + ','
        });
        return tutor_emails
    }

    /*
    Returns a pretty string from an array of multiple tutor emails
    */
   xml_format_tutors = function (tutors) {
        tutor_emails = ""
        $.each(tutors, function (i, tutor) {
            tutor_emails = tutor_emails + ' ' + tutor.children[4].textContent + ','
        });
        return tutor_emails
    }

    /*
    A function to retrieve and list course objects
    */
    $("#course-list").click(function () {

        $('.list-group').empty();

        selected_format = $("#list-course-format option:selected").text();

        $.ajax({
            url: '/api/courses/', // url 
            type: 'GET', // type of action POST || GET
            dataType: 'html', // data type
            contentType: 'application/' + selected_format,
            data: { format: selected_format },
            success: function (result) {
                //JSON FORMATTER
                if (selected_format === 'json') {
                    $('#raw-content p').empty()
                    $('#raw-content xmp').html(vkbeautify.json(result, 4));

                    $.each(JSON.parse(result), function (i, obj) {
                        $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                            '<h6>ID:</h6><p class="object-id">' + obj.id + '</p>' +
                            '<h6>Name:</h6><p class="object-name">' + obj.name + '</p>' +
                            '<h6>Credits:</h6><p class="object-credits"> ' + obj.credits + '</p>' +
                            '<h6>Duration:</h6><p class="object-duration"> ' + obj.duration + '</p>' +
                            '<h6>Tutors:</h6><p class="object-tutors"> ' + json_format_tutors(obj.tutor) + '</p>' +
                            '<h6>About:</h6><p class="object-about"> ' + obj.about + '</p>' +
                            '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                            '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="#">Delete</button>' +
                            '</div>'
                            + '</a>')
                    });

                // XML FORMATTER    
                } else if (selected_format === 'xml') {

                    $('#raw-content p').empty()
                    xml_res = $.parseXML(result);
                    $('#raw-content xmp').html(vkbeautify.xml((new XMLSerializer()).serializeToString(xml_res)));

                    var courses = xml_res.getElementsByTagName('list-item');

                    $.each(courses, function(i, course) {
                        //ensure we are looking at a full course node
                        if(course.childNodes.length >= 6) {
                            id = (course.children[0].textContent) ? course.children[0].textContent : '';
                            name = (course.children[1].textContent) ? course.children[1].textContent : '';
                            credits = (course.children[2].textContent) ? course.children[2].textContent : '';
                            duration = (course.children[3].textContent) ? course.children[3].textContent : '';
                            tutors = (course.childNodes[4].getElementsByTagName('list-item')) ? xml_format_tutors(course.childNodes[4].getElementsByTagName('list-item')) : '';
                            about = (course.children[5].textContent) ? course.children[5].textContent : '';

                            $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                                '<h6>ID:</h6><p class="object-id">' + id + '</p>' +
                                '<h6>Name:</h6><p class="object-name">' +  name + '</p>' +
                                '<h6>Credits:</h6><p class="object-credits"> ' + credits + '</p>' +
                                '<h6>Duration:</h6><p class="object-duration"> ' + duration + '</p>' +
                                '<h6>Tutors:</h6><p class="object-tutors"> ' + tutors + '</p>' +
                                '<h6>About:</h6><p class="object-about"> ' + about + '</p>' +
                                '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                                '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="#">Delete</button>' +
                                '</div>'
                            + '</a>')
                        }
                    });


                //TEXT FORMATTER    
                } else if (selected_format === 'text') {
                    $('#raw-content xmp').empty()
                    $('#raw-content p').html(result);

                    $.each($.parseJSON(result.slice(2, -1)), function (i, obj) {
                        $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                            '<h6>ID:</h6><p class="object-id">' + obj.id + '</p>' +
                            '<h6>Name:</h6><p class="object-name">' + obj.name + '</p>' +
                            '<h6>Credits:</h6><p class="object-credits"> ' + obj.credits + '</p>' +
                            '<h6>Duration:</h6><p class="object-duration"> ' + obj.duration + '</p>' +
                            '<h6>Tutors:</h6><p class="object-tutors"> ' + json_format_tutors(obj.tutor) + '</p>' +
                            '<h6>About:</h6><p class="object-about"> ' + obj.about + '</p>' +
                            '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                            '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="">Delete</button>' +
                            '</div>'
                            + '</a>')
                    });
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });

    $(document).on('click', ".update-modal", function (event) {
        previous_data = {
            'name': $(event.target).closest('.course-object').children('.object-name').text(),
            'credits': $(event.target).closest('.course-object').children('.object-credits').text().trim(),
            'duration': $(event.target).closest('.course-object').children('.object-duration').text().trim(),
            'tutors': $(event.target).closest('.course-object').children('.object-tutors').text(),
            'about': $(event.target).closest('.course-object').children('.object-about').text()
        }
        //ensure we keep the ID uneditable
        $("#myModal #myModalID").html($(event.target).closest('.course-object').children('.object-id').text());
        
        populateForm($('#update-course-form'), previous_data)
    });

    $(document).on('click', ".delete-course", function (event) {
        //ensure we keep the ID uneditable
        id = $(event.target).closest('.course-object').children('.object-id').text();
        url = '/api/courses/'

        $.ajax({
            url: url + id + '/', // url where to submit the request
            type: 'DELETE', 
            success: function (result) {
                window.alert('Succesfuly deleted course!');
                $('#course-list').click();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                //custom handler to append errors to the form for the user to fix
                errors = xhr.responseJSON
                window.alert(errors);
                
            }
        });

    });
    /*
    push updated course data to the server
    */
    $('#update-course-form').submit(function (event) {

        event.preventDefault();

        $form = $(this);

        clean_data = serializeCourseObject($('#update-course-form').serializeArray());

        $.ajax({
            url: $(this).attr('action') + $("#myModal #myModalID").text() + '/', // url where to submit the request
            type: 'PATCH', 
            dataType: 'json', // data type
            contentType: 'application/json',
            data: JSON.stringify(clean_data), // post data || get data
            success: function (result) {
                $('#update-course-form').each(function () {
                    this.reset();
                });
                $('div #warning').remove();
                console.log(result);
                window.alert('Succesfuly updated course!');
                $('#course-list').click();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                //custom handler to append errors to the form for the user to fix
                errors = xhr.responseJSON
                $.each(errors, function (i, item) {
                    $('#update-course-form #div_id_' + i).append('<div id="warning"> <p> **' + item + '</p></div>');
                });
            }
        });
    });

$("#search-course-form").submit(function (event) {

        event.preventDefault();

        $('.list-group').empty();
        $('#raw-content xmp').empty();

        selected_format = $("#search-course-format option:selected").text();
        search_name = $('#search-course-form').serializeArray()[0].value;

        $.ajax({
            url: $(this).attr('action'), // url 
            type: 'GET', // type of action POST || GET
            dataType: 'html', // data type
            contentType: 'application/' + selected_format,
            data: { name: search_name, format: selected_format },
            success: function (result) {
                //JSON FORMATTER
                if (selected_format === 'json') {
                    $('#raw-content p').empty()
                    $('#raw-content xmp').html(vkbeautify.json(result, 4));

                    $.each(JSON.parse(result), function (i, obj) {
                        $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                            '<h6>ID:</h6><p class="object-id">' + obj.id + '</p>' +
                            '<h6>Name:</h6><p class="object-name">' + obj.name + '</p>' +
                            '<h6>Credits:</h6><p class="object-credits"> ' + obj.credits + '</p>' +
                            '<h6>Duration:</h6><p class="object-duration"> ' + obj.duration + '</p>' +
                            '<h6>Tutors:</h6><p class="object-tutors"> ' + json_format_tutors(obj.tutor) + '</p>' +
                            '<h6>About:</h6><p class="object-about"> ' + obj.about + '</p>' +
                            '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                            '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="#">Delete</button>' +
                            '</div>'
                            + '</a>')
                    });

                // XML FORMATTER    
                } else if (selected_format === 'xml') {

                    $('#raw-content p').empty()
                    xml_res = $.parseXML(result);
                    $('#raw-content xmp').html(vkbeautify.xml((new XMLSerializer()).serializeToString(xml_res)));

                    var courses = xml_res.getElementsByTagName('list-item');

                    $.each(courses, function(i, course) {
                        //ensure we are looking at a full course node
                        if(course.childNodes.length >= 6) {
                            id = (course.children[0].textContent) ? course.children[0].textContent : '';
                            name = (course.children[1].textContent) ? course.children[1].textContent : '';
                            credits = (course.children[2].textContent) ? course.children[2].textContent : '';
                            duration = (course.children[3].textContent) ? course.children[3].textContent : '';
                            tutors = (course.childNodes[4].getElementsByTagName('list-item')) ? xml_format_tutors(course.childNodes[4].getElementsByTagName('list-item')) : '';
                            about = (course.children[5].textContent) ? course.children[5].textContent : '';

                            $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                                '<h6>ID:</h6><p class="object-id">' + id + '</p>' +
                                '<h6>Name:</h6><p class="object-name">' +  name + '</p>' +
                                '<h6>Credits:</h6><p class="object-credits"> ' + credits + '</p>' +
                                '<h6>Duration:</h6><p class="object-duration"> ' + duration + '</p>' +
                                '<h6>Tutors:</h6><p class="object-tutors"> ' + tutors + '</p>' +
                                '<h6>About:</h6><p class="object-about"> ' + about + '</p>' +
                                '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                                '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="#">Delete</button>' +
                                '</div>'
                            + '</a>')
                        }
                    });


                //TEXT FORMATTER    
                } else if (selected_format === 'text') {
                    $('#raw-content xmp').empty()
                    $('#raw-content p').html(result);

                    $.each($.parseJSON(result.slice(2, -1)), function (i, obj) {
                        $('.list-group').append('<a href="#" class="list-group-item"><div class="course-object">' +
                            '<h6>ID:</h6><p class="object-id">' + obj.id + '</p>' +
                            '<h6>Name:</h6><p class="object-name">' + obj.name + '</p>' +
                            '<h6>Credits:</h6><p class="object-credits"> ' + obj.credits + '</p>' +
                            '<h6>Duration:</h6><p class="object-duration"> ' + obj.duration + '</p>' +
                            '<h6>Tutors:</h6><p class="object-tutors"> ' + json_format_tutors(obj.tutor) + '</p>' +
                            '<h6>About:</h6><p class="object-about"> ' + obj.about + '</p>' +
                            '<button type="button" class="update-modal btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Update</button>' +
                            '<button type="button" class="delete-course btn btn-danger btn-sm" data-target="">Delete</button>' +
                            '</div>'
                            + '</a>')
                    });
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });


});