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

  function redirectLogin(){
    window.location.href = "login";
  }