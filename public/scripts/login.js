var error;
$(document).ready(function(){
    $("#btnReg").click(function(){
        insertIntoDB();   
    });
  });

  function insertIntoDB(){
    event.preventDefault();
    userData = {
        userName: $('#regUsername').val(),
        email: $('#regEmail').val(),
        password: $('#regPassword').val()
    };
    
    // Checks if registration is possible on click of enter
    var input = document.getElementById("regEmail", "regPassword", "regUsername");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("#btnReg").click();
        }
    });

    $.ajax({
        method: 'POST',
        url: 'https://api-notey.herokuapp.com/api/1.0/user/register',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(result){
            console.log('Kontot har skapats');
            window.location="/login";
        },
        error: function(error){
            $('#error-footer').empty();
            var err = JSON.parse(error.responseText);
            if(err.errorCode == 1.0 || err.errorCode == 1.1){
                error = "No special characters allowed!";
            }
            else if(err.errorCode == 1.3){
                error = "Username is already taken!";
            }
            else if(err.errorCode == 1.4){
                error = "You must fill all fields!";
            }
            else if(err.errorCode == 1.2){
                if($('#regUsername').val()=="" || $('#regEmail').val()=="" || $('#regPassword').val()==""){
                    error = "You must fill all fields!";
                }
                else{
                  error = "Email is invalid!";  
                }
                
            }
            var $p = $('<p>').text(error);
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
    closeNav();
    $("#btnLogin").click(function(event){
        event.preventDefault();
        login(); 
        
        
    });
});

function openNav() {
    $('.layer').css('display', 'block');
    if( $('.mobile-indicator').is(':visible')){
      document.getElementById("myNav").style.width = "100%";
    }
    else{
      document.getElementById("myNav").style.width = "80%";
    }
    
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    $('.layer').css('display', 'none');
    document.getElementById("myNav").style.width = "0%";
  }

function login(){
    $("#btnLogin").click(function(event){
        event.preventDefault();
    });
    var userName = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    userData = {
        userName: userName,
        password: password
    };
    
    // Checking if password and username matches any in the database on click of enter
    var input = document.getElementById("inputPassword", "inputUsername");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("#btnLogin").click();
        }
    });

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
            if(err.errorCode == 6.0 || err.errorCode == 6.1){
                error = "Username and password don't match!";
            }
            var $p = $('<p>').text(error);
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

function moveToStart(){
    $('#backButton').on('click touchstart', function() {
        window.location.href = "start";
    });
    
}