var content = $('#content').val();
var noteTitle = $('#noteTitle').val();

// Fetches all notes onsite load
$(function(){
    $.ajax({
        method: 'post',
        url: 'https://api=notey.herokuapp.com/api/1.0/notes',
        contentType: "application/json",
        data:{
            userName:'tuva'
        },
        success: function(notes){
            console.log(notes);
        },
        error: function(error){
            console.log(error);
        }
    });
});

// Saving the Notey for the first time
$(function(){
    $("#firstSaveBtn").click(function(){
        console.log('notey was saved');
        // save title and content to database
        $.ajax({
            method: 'post',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/create',
            contentType: "application/json",
            data:{
                userName:'tuva',                
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