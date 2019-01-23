var error;
var token = localStorage.getItem('userToken');
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
                var $div = $('<div class="noteyheader float-left">').text(value['heading']);
                var $small = $('<small class="float-right">');
                var $div2 = $('<div id="fade_bottom" class="noteycontent">');
                var converter = new showdown.Converter();
                var converted = converter.makeHtml(value['content']); 
                var $append = $(converted);
                var $button = $('<button value="'+ value['id'] + '"class="btn btn-outline-light btn-secondary col-sm-4 noteybox">').append(
                    $div.append(
                        $small
                    ),
                    $div2.append(
                        $append
                    )

                );
                $("#notey-list").append($button);
            });
            
            // Add onclick listener after listItems have been created
            $("#notey-list button").click(function(){
                openNotey(this);
            });
        },
        error: function(error){
            var err = JSON.parse(error.responseText);
            if(err.errorCode == 3.1){
                error = "You don't have any noteys!";
            }
            var $errorNote = $('<i class="far fa-sticky-note fa-lg">');
            var $errorP = $('<p class="left">').append(
                $errorNote,
                error
                

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
    });
});
function createNote(){
        var title = $("#noteTitle").val();
        var text = $('#content').val();
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
                transitionClose();
            },
            error: function(error){
                var err = JSON.parse(error.responseText);
                console.log(err);
            },
        });
}

function transitionAdd(){
    if($("#createNotey").is(":visible")){
        return;
    }
    
    else if($("#viewNotey").is(":visible") && $("#editNotey").is(":visible")){
        closeAll();
        $('#createNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else if($("#editNotey").is(":visible")){
        updateNoteyClose();
        $('#createNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else if($("#viewNotey").is(":visible")){
        closeNotey();
        $('#createNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else{
        $('#createNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    

}

function transitionClose(){
    $('#createNotey').addClass('magictime slideUp');
    setTimeout(function(){
        $('#createNotey').removeClass('magictime slideUp');
        $('#createNotey').css('display', 'none');
    }, 1000);

}



$(function(){
    $("#logout").click(function(){
        logout();
    });
});

// Global function so we can call it whenever
function logout(){
    localStorage.clear();
    window.location = "/start";
}

function openNotey(button){
    generateNote(button.value);
    if($("#viewNotey").is(":visible")){
        return;
    }
    else{
        $('#viewNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#viewNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#viewNotey').css('display', 'block');
    }
}

function closeNotey(){
    $('#viewNotey').addClass('magictime slideUp');
    setTimeout(function(){
        $('#viewNotey').removeClass('magictime slideUp');
        $('#viewNotey').css('display', 'none');
    }, 1000);
}

function updateNotey(){
    if($("#editNotey").is(":visible")){
        return;
    }
    else{

        $('#editNotey').addClass('magictime slideUpReturn');
        setTimeout(function(){
            $('#editNotey').removeClass('magictime slideUpReturn');
        }, 1000);
        $('#editNotey').css('display', 'block');
        $('#saveUpdatedNotey').css('display', 'inline-block');
        $('#cancelUpdateNotey').css('display', 'inline-block');
        $('#viewFooter').css('display', 'none');
        $('#viewBody').css('display', 'none');
    }
}

function updateNoteyClose(){
    $('#editNotey').addClass('magictime slideUp');
    setTimeout(function(){
        $('#editNotey').removeClass('magictime slideUp');
        $('#editNotey').css('display', 'none');
    }, 1000);
    $('#viewFooter').css('display', 'block');
    $('#viewBody').css('display', 'block');
}

function closeAll(){
    updateNoteyClose();
    closeNotey();
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
            console.log(content);
            var converter = new showdown.Converter();
            var converted = converter.makeHtml(content);
            console.log(converted);
            $("#viewTitle").html(title);
            $("#editTitle").val(title);
            $("#viewBody").html(converted);
            $("#editContent").val(content);
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
            closeNotey();
        },
        error: function(error){
        }

    });
};

$(function(){
    $("#saveUpdatedNotey").click(function(){
        var title = $("#editTitle").val();
        var text = $('#editContent').val();
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
        var id = this.value;
        $.ajax({
            method: 'PATCH',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/update/' + this.value,
            contentType: "application/json",
            data: JSON.stringify(noteData),
            success: function(result){
                fetchNoteys();
                generateNote(id);
                updateNoteyClose();


            },
            error: function(error){
                var err = JSON.parse(error.responseText);
                console.log(err);
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

function generateDetails(){
    $.ajax({
        method: 'GET',
        headers: {
            'Authorization': token,
        },
        url: 'https://api-notey.herokuapp.com/api/1.0/user/decode',
        success: function(result){
            console.log(result);
            $('#userName').text(result.userName);
        },
        error: function(error){
            var err = JSON.parse(error.responseText);
        }

    });
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }