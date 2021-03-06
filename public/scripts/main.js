var error;
var token = localStorage.getItem('userToken');
if (token === null) {
    logout();
}

// Fetches all notes on site load
$(fetchNoteys);
function fetchNoteys() {
    $("#notey-list").empty();
    $.ajax({
        method: 'GET',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/',
        contentType: "application/json",
        headers: {
            'Authorization': token
        },
        success: function (notes) {
            $.each(notes, function (index, value) {
                var $button = $('<a id="noteyItem" data-value="' + value['id'] + '" class="list-group-item list-group-item-action" href="read">');
                var $small = $('<small id="dateHead" class="float-right">');
                var $headerWrapper = $('<div id="headerWrapper">');
                $headerWrapper.css('font-weight', 'bold');
                $headerWrapper.css('font-size', '115%');
                var $small2 = $('<small class="float-bottom" id="noteyContent">');
                var converter = new showdown.Converter();
                var converted = converter.makeHtml(value['content']);
                var clean = converted.replace(/<\/?[^>]+(>|$)/g, "");
                $arrow = $('<img id="rightAngle" src="img/2D780716D3D89B2EFB0155599BA0A89F.png">');
                var modified = $('<p>');
                var $append = $(converted);
                var cuttedHead
                $small.append(
                    value['modifiedDate'],
                    $arrow
                );
                if (clean.replace(/ /g, '').length > 35) {
                    cutted = clean.substring(0, 35);
                    cutted += "...";
                    modified.append(cutted);

                }
                else {
                    modified = clean;
                }

                if (value['heading'].replace(/ /g, '').length > 20) {
                    cuttedHead = value['heading'].substring(0, 20);
                    cuttedHead += "...";
                }
                else {
                    cuttedHead = value['heading']
                }

                $button.append(
                    $headerWrapper.append(
                        cuttedHead,
                        $small
                    ),

                    $small2.append(
                        modified
                    )


                );
                $("#notey-list").append($button);
            });

            // Add onclick listener after listItems have been created
            $("#notey-list a").click(function () {
                generateNote($(this).data("value"));
            });

        },
        error: function (error) {
            var err = JSON.parse(error.responseText);
            if (err.errorCode == 3.1) {
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

function openNav() {
    $('.layer').css('display', 'block');
    if ($('.mobile-indicator').is(':visible')) {
        document.getElementById("myProfile").style.width = "100%";
        generateDetails();
    }

    else {
        generateDetails();
        document.getElementById("myProfile").style.width = "80%";

    }

}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    $('.layer').css('display', 'none');
    document.getElementById("myProfile").style.width = "0%";
}

$(function () {
    $("#saveNotey").click(function () {
    });
});
function createNote() {
    var title = $("#noteTitle").val();
    var text = $('#content').val();

    if (title == "" && text == "") {
        title = "New Document"
        text = "(No content yet)"
    }

    else if (title == "") {
        title = "New Document"
    }

    else if (text == "") {
        text = "(No content yet)"
    }

    var noteDate = new Date();
    var noteData = {
        heading: title,
        content: text,
        date: noteDate
    };
    $.ajax({
        method: 'POST',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/create/',
        contentType: "application/json",
        headers: {
            'Authorization': token
        },
        data: JSON.stringify(noteData),

        success: function (result) {
            console.log(result);
            $("#noteTitle").val('');
            $("#content").val('');
        },
        error: function (error) {
            var err = JSON.parse(error.responseText);
            console.log(err);
        },
    });
}

/*function transitionAdd(){
    if($("#createNotey").is(":visible")){
        return;
    }
    
    else if($("#viewNotey").is(":visible") && $("#editNotey").is(":visible")){
        closeAll();
        $('#createNotey').addClass('magictime slideRightReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideRightReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else if($("#editNotey").is(":visible")){
        updateNoteyClose();
        $('#createNotey').addClass('magictime slideRightReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideRightReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else if($("#viewNotey").is(":visible")){
        closeNotey();
        $('#createNotey').addClass('magictime slideRightReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideRightReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
    }
    else{
        $('#createNotey').addClass('magictime slideRightReturn');
        setTimeout(function(){
            $('#createNotey').removeClass('magictime slideRightReturn');
        }, 1000);
        $('#createNotey').css('display', 'block');
        $('#listContainer').css('display', 'none');
    }
    

}

function transitionClose(){
    $('#createNotey').addClass('magictime slideRight');
    setTimeout(function(){
        $('#createNotey').removeClass('magictime slideRight');
        $('#createNotey').css('display', 'none');
    }, 1000);
    $('#listContainer').css('display', 'block');


}
*/


$(function () {
    $("#logout").click(function () {
        logout();
    });
});

// Global function so we can call it whenever
function logout() {
    localStorage.clear();
    window.location = "/start";
}

/*function updateNotey() {
    if ($("#editNotey").is(":visible")) {
        return;
    }
    else {

        $('#editNotey').addClass('magictime slideRightReturn');
        setTimeout(function () {
            $('#editNotey').removeClass('magictime slideRightReturn');
        }, 1000);
        $('#editNotey').css('display', 'block');
        $('#saveUpdatedNotey').css('display', 'inline-block');
        $('#cancelUpdateNotey').css('display', 'inline-block');
        $('#viewFooter').css('display', 'none');
        $('#viewBody').css('display', 'none');
        $('#listContainer').css('display', 'none');
    }
}

function updateNoteyClose() {
    $('#editNotey').addClass('magictime slideRight');
    setTimeout(function () {
        $('#editNotey').removeClass('magictime slideRight');
        $('#editNotey').css('display', 'none');
    }, 1000);
    $('#viewFooter').css('display', 'block');
    $('#viewBody').css('display', 'block');
    $('#listContainer').css('display', 'block');
}

function closeAll() {
    updateNoteyClose();
    closeNotey();
}*/


function generateNote(id) {
    $.ajax({
        method: 'GET',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/' + id,
        contentType: "application/json",
        success: function (result) {
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
            $("#deleteNotey").attr('data-value', '' + id + '');
            $("#updateNotey").attr('data-value', '' + id + '');
            $("#saveUpdatedNotey").attr('data-value', '' + id + '');
            $("#deleteNotey").click(function () {
                console.log('im here');
                deleteNotey($(this).data('value'));
            });
            $("#saveUpdatedNotey").click(function () {
                saveEditedNotey($(this).data('value'));
            });
        },
        error: function (error) {
            alert(error.errorMessage);
        }
    });
}

function deleteNotey(id) {
    console.log('im here');
    $.ajax({
        method: 'DELETE',
        url: 'https://api-notey.herokuapp.com/api/1.0/notes/delete/' + id,
        success: function (result) {
            
        },
        error: function (error) {
        }

    });
};

function saveEditedNotey(id) {
        console.log('hey');
        var title = $("#editTitle").val();
        var text = $('#editContent').val();

        if (title == "" && text == "") {
            title = "New Document"
            text = "(No content yet)"
        }

        else if (title == "") {
            title = "New Document"
        }

        else if (text == "") {
            text = "(No content yet)"
        }

        var noteDate = new Date();
        var noteData = {
            heading: title,
            content: text,
            date: noteDate
        };
        $.ajax({
            method: 'PUT',
            url: 'https://api-notey.herokuapp.com/api/1.0/notes/update/' + id,
            contentType: "application/json",
            data: JSON.stringify(noteData),
            success: function (result) {


            },
            error: function (error) {
                var err = JSON.parse(error.responseText);
                console.log(err);
            }
        });
}

function generateDetails() {
    $.ajax({
        method: 'POST',
        headers: {
            'Authorization': token,
        },
        url: 'https://api-notey.herokuapp.com/api/1.0/user/decode',
        success: function (result) {
            console.log(result);
            $('#user-name').text(result.userName);
        },
        error: function (error) {
            var err = JSON.parse(error.responseText);
        }

    });
}