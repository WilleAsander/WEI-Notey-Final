var token = localStorage.getItem('userToken');
// We should add a check to see if the logged in user is valid. but we can't since the api doesn't provide us with something like that.
if (token === null){
    logout();
}

// Fetches all notes on site load
$(fetchNoteys);
function fetchNoteys(){
    
    $("#notey-list").empty();
    $("#notey-list a").off();

    $.ajax({
        method: 'GET',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/',
        contentType: "application/json",
        headers:{
            'Authorization': token
        },
        success: function(notes){
            $.each(notes.reverse(), function(index, value ){
                var listItem = '<button value="'
                listItem += value['id']
                listItem +='" class="btn btn-outline-light btn-secondary col-sm-4 noteybox"><div class="noteyheader float-left">' + value['heading']
                listItem += '<small class="float-right">';
                // We could add a date difference calculator here
                listItem += value['date'];
                listItem += '</small>';
                listItem += '</div>';
                listItem += '<div id="fade_bottom" class="noteycontent">' + value['content'] + '</div>'
                listItem += '</button>';
                $("#notey-list").append(listItem)
            });
            
            // Add onclick listener after listItems have been created
            $("#notey-list button").click(function(){
                openNotey(this);
            });
        },
        error: function(error){
            var err = JSON.parse(error.responseText);
            var $errorNote = $('<i class="far fa-sticky-note fa-lg">');
            var $errorP = $('<p class="left">').append(
                $errorNote,
                err.errorMessage
            );
            var $errorDiv = $('<div id="errorDiv">');
            $errorDiv.append(
                $errorP
            );
            $("#notey-list").empty();
            $('#notey-list').append(
                $errorDiv
            );
            $errorP.css('font-style', 'italic');
            $errorP.css('font-weight', 'bold');
            $errorP.css('font-size', '200%');
            $errorP.css('opacity', '0.5');
        }
    });

    
    
}


$(function(){
    $("#saveNotey").click(function(){
        var title = $("#noteTitle").val();
        var text = $("#content").val();
        var noteDate = new Date();
        var dd = noteDate.getDate();
        var mm = noteDate.getMonth()+1; //January is 0!
        var yyyy = noteDate.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        noteDate = mm + '/' + dd + '/' + yyyy;
        var noteData = {
            heading: title,
            content: text,
            date: noteDate
        };
        $.ajax({
            method: 'POST',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/create/',
            contentType: "application/json",
            headers:{
                'Authorization': token
            },
            data:JSON.stringify(noteData),
             
            success: function(result){
                console.log(result);
                $("#noteTitle").val('');
                $("#content").val('');
                fetchNoteys();
            },
            error: function(error){
                var err = JSON.parse(error.responseText);
            },
        });
    });
});
$(function(){
    $("#logout").click(function(){
        logout();
    });
});

// Global function so we can call it whenever
function logout(){
    localStorage.clear();
    window.location = "/login";
}

function openNotey(button){
    generateNote(button.value);
    $("#updateTitle").hide();
    $("#displayTitle").show();
    
    $("#updateContent").hide();
    $("#displayContent").show();
    
    $("#updateNotey").show();
    $("#saveUpdatedNotey").hide();

    $("#closeNotey").show();
    $("#cancelUpdateNotey").hide();

    $("#deleteNotey").show();

    $("#myUpdateModal").modal('toggle');
}

function generateNote(id){
    $.ajax({
        method: 'GET',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/' + id,
        contentType: "application/json",
        success: function(result){
            // sets the value of noteys data into title and content
            var title = result.heading;
            var content = result.content;
            
            $("#displayTitle").html(title);
            $("#updateTitle").val(title);
            $("#displayContent").html(content);
            $("#updateContent").val(content);
            $("#deleteNotey, #saveUpdatedNotey").val(id);

        },
        error: function(error) { 
            alert(error.errorMessage); 
        }
    });
}

function deleteNotey(id){
    $.ajax({
        method: 'DELETE',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/delete/' + id,
        success: function(result){
            fetchNoteys();
        },
        error: function(error){
        }

    });
};

// Switch to edit mode
$(function(){
    $("#updateNotey").click(function(){
        $("#displayTitle").hide();
        $("#updateTitle").show();

        $("#displayContent").hide();
        $("#updateContent").show();

        $("#updateNotey").hide();
        $("#saveUpdatedNotey").show();

        $("#closeNotey").hide();
        $("#cancelUpdateNotey").show();

         $("#deleteNotey").hide();
    });
});

$(function(){
    $("#saveUpdatedNotey").click(function(){
        var title = $("#updateTitle").val();
        var text = $("#updateContent").val();
        var noteDate = new Date();
        var dd = noteDate.getDate();
        var mm = noteDate.getMonth()+1; //January is 0!
        var yyyy = noteDate.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        noteDate = mm + '/' + dd + '/' + yyyy;
        var noteData = {
            heading: title,
            content: text,
            date: noteDate
        };
        var noteData = {
                heading: title,
                content: text,
                date: noteDate
        };

        $.ajax({
            method: 'PATCH',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/update/' + this.value,
            contentType: "application/json",
            data: JSON.stringify(noteData),
            success: function(result){
                $("#displayTitle").html(title);
                $("#displayContent").html(text);

                $("#updateTitle").hide();
                $("#displayTitle").show();

                $("#updateContent").hide();
                $("#displayContent").show();

                $("#updateNotey").show();
                $("#saveUpdatedNotey").hide();

                $("#closeNotey").show();
                $("#cancelUpdateNotey").hide();

                $("#deleteNotey").show();


            },
            error: function(error){
                var err = JSON.parse(error.responseText);
            }
        });
    });
});

$(function(){
    $("#cancelUpdateNotey").click(function(){
        $("#updateTitle").hide();
        $("#displayTitle").show();

        $("#updateContent").hide();
        $("#displayContent").show();

        $("#updateNotey").show();
        $("#saveUpdatedNotey").hide();

        $("#closeNotey").show();
        $("#cancelUpdateNotey").hide();

        $("#deleteNotey").show();
    });
});

$(function(){
    $("#deleteNotey").click(function(){
        deleteNotey(this.value);
    });
});