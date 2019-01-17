$(document).ready(function(){
    $("#btnReg").click(function(){
        insertIntoDB();   
    });
  });

  function insertIntoDB(){
    userData = {
        userName: $('#regUsername').val(),
        email: $('#regEmail').val(),
        password: $('#regPassword').val()
    };

    $.ajax({
        method: 'POST',
        url: 'https://api-notey.herokuapp.com/api/1.0/user/register',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(result){
            console.log('ditt konto har skapats');
            window.location="/login";
        },
        error: function(error){
            $('#error-footer').empty();
            var err = JSON.parse(error.responseText);
            var $p = $('<p>').text(err.errorMessage);
            $('#error-footer').append(
                $p
            );
            $('#regUsername').css('border', '');
            $('#regEmail').css('border', '');
            $('#regPassword').css('border', '');
            if(err.errorMessage == "User name already exists!"){
                $('#regUsername').css('border', '1px solid #ff0000');
            }
            else{
                $('#regUsername').css('border', '1px solid #ff0000');
                $('#regEmail').css('border', '1px solid #ff0000');
                $('#regPassword').css('border', '1px solid #ff0000');
            }
            $p.css('color', 'red');
            $p.css('font-weight', 'bold');
        }
    });
} 

$(document).ready(function(){
    $("#btnLogin").click(function(){
        login();
    });
});

function login(){
    $("form").submit(function(){
    });
    var userName = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    userData = {
        userName: userName,
        password: password
    };

    $.ajax({
        method: 'POST',
        url: 'https://api-notey.herokuapp.com/api/1.0/user/login',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(result){
            var token = result;
            console.log(token);
            console.log(result.includes(token));

            if(result.includes(token)){
                console.log('it worked');
                
                // saves token in localStorage
                var getInput = token;
                localStorage.setItem("userToken",getInput); 

                window.location='/';
               // goToHome("storageName");                           
            }           
           
        },
        error: function(error) { 
            $('#error-footer').empty();
            var err = JSON.parse(error.responseText);
            var $p = $('<p>').text(err.errorMessage);
            $('#error-footer').append(
                $p
            );
            $('#regUsername').css('border', '');
            $('#regPassword').css('border', '');
            $('#inputUsername').css('border', '1px solid #ff0000');
            $('#inputPassword').css('border', '1px solid #ff0000');
            $p.css('color', 'red');
            $p.css('font-weight', 'bold'); 
        }
    });
}