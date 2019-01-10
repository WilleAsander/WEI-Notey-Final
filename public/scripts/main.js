var content = $('#content').val();
var noteTitle = $('#noteTitle').val();

// Fetches all notes onsite load
$(function(){
    $.ajax({
        method: 'post',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes',
        // Switch to token
        data:{
            id:'5c371e57451d0200171adb3d'
        },
        success: function(notes){
            $.each(notes, function(index, value){
                var listItem = '<button type="button" value="'
                listItem += value['_id']
                listItem +='" class="list-group-item list-group-item-action">';
                listItem += value['heading'];
                listItem += '</button>';
                $("#notey-list").append(listItem)
            });
        },
        error: function(error){
            console.log("failure");
            console.log(error);
        }
    });
});

// Saving the Notey for the first time
$(function(){
    $("#firstSaveBtn").click(function(){
        console.log('notey was saved');
        // save title and content to database
        // Currently does not work
        $.ajax({
            method: 'post',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/create',
            contentType: "application/json",
            data:{
                id:'5c371e57451d0200171adb3d',                
                heading: $("#notetitle").val,
                content: $("#content").val,  
                date:'e',                 
            } ,
            dataType: 'text',
    
            success: function (data){
                console.log(data);
                
            },
            error: function (error){
                console.log(error);
            }
        });
        
    });
});

// Update the Noteys
$(function(){
    $("#SaveBtn").click(function(){
        console.log('note was updated');
        // update and save title and content to database
    });
});