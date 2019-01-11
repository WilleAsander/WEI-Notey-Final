// Token for test account. Change this to the token given on login.
var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YzM3MWU1NzQ1MWQwMjAwMTcxYWRiM2QiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCRzNWQxQkVPSllWWkxCQ0Z3Y0Zkei5PbFIxZXhwWHRUV3lxZTJZdFVMd014YzNhSWlVd0FuQyIsIl9fdiI6MH0.8cECfQfC87TjEM2bbI3OQGkQfv4HMHOixTIZWu-9pMg"

// Fetches all notes on site load
$(function fetchNoteys(){
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
                var listItem = '<a href="#" value="'
                listItem += value['id']
                listItem +='" class="list-group-item list-group-item-action">';
                listItem += value['heading'];
                listItem += '</a>';
                $("#notey-list").append(listItem)
            });

            $("#notey-list a").click(function(){
                console.log("button clicked");
            });
            
        },
        error: function(error){
            console.log(error);
        }
    });

    
});

$(function(){
    $("#saveNotey").click(function(){
        var title = $("#noteTitle").val();
        var text = $("#content").val();
        var noteDate = new Date().toISOString();
        $.ajax({
            method: 'POST',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/create/',
            contentType: "application/json",
            headers:{
                'Authorization': token
            },
            data:{
                heading: title,
                content: text,
                date: noteDate
            },
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
    
});

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