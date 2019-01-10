var content = $('#content').val();
var noteTitle = $('#noteTitle').val();


// Saving the Notey for the first time
$(function(){
    $("#firstSaveBtn").click(function(){
        console.log('notey was saved');
        // save title and content to database
        $.ajax({
            method: 'post',
            url: '', // API goes here
            data:{
            //    userName:'',                
                heading: '', //data (title content goes here) I think
                content: '',  
            //    date:'',                 
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