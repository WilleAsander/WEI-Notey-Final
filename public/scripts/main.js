var token = localStorage.getItem('userToken');

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
            $.each(notes, function(index, value){
                var listItem = '<button value="'
                listItem += value['id']
                listItem +='" class="list-group-item list-group-item-action">';
                listItem += value['heading'];
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

function openNotey(button){
    console.log(button.value);
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
            alert(error.errorMessage);
        }

    });
};

// Update the Noteys
$(function(){
    $("#updateNotey").click(function(){
        console.log('note was updated');
        // update and save title and content to database
    });
});

$(function(){
    $("#deleteNotey").click(function(){

    });
});