var token = localStorage.getItem('userToken');
if (token === null){
    console.log('not logged in');
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
            $.each(notes.reverse(), function(index, value){
                var listItem = '<button value="'
                listItem += value['id']
                listItem +='" class="list-group-item list-group-item-action">';
                listItem += value['heading'];
                listItem += '<small class="float-right">';
                // We could add a date difference calculator here
                listItem += value['date'];
                listItem += '</small>';
                listItem += '</button>';
                $("#notey-list").append(listItem)
            });
            
            // Add onclick listener after listItems have been created
            $("#notey-list button").click(function(){
                openNotey(this);
            });
        },
        error: function(error){
            console.log(error);
        }
    });

    
}

$(function(){
    $("#saveNotey").click(function(){
        var title = $("#noteTitle").val();
        var text = $("#content").val();
        var noteDate = new Date().toISOString();
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
                console.log("sent");
                console.log(result);
                $("#noteTitle").val('');
                $("#content").val('');
                fetchNoteys();
            },
            error: function(error){
                console.log("failure");
                console.log(error);
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
    console.log("logged out");
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
            $("#deleteNotey").val(id);

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
            console.log('Deleted notey');
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
    });
});

$(function(){
    $("#saveUpdatedNotey").click(function(){
        var title = $("#updateTitle").val();
        var text = $("#updateContent").val();
        var noteDate = new Date().toISOString();
        var noteData = {
                heading: title,
                content: text,
                date: noteDate
        };

        $.ajax({
            method: 'PATCH',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/update/{id}',
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
            },
            error: function(error){
                
            }
        });
    });
});

$(function(){
    $("#deleteNotey").click(function(){
        deleteNotey(this.value);
    });
});