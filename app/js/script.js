document.querySelector(".hamburger__toggle")
  .addEventListener( "click", function() {
    this.classList.toggle( "active" );
    var div = document.querySelector(".bar");
    if (div.style.width !== '100%') {
        div.style.width = '100%';
    }
    else {
        div.style.width = '0px';
    }
  });



