document.addEventListener('DOMContentLoaded', function() { console.log("loading"); contactbar = document.getElementById("contactbar"); spacer = document.getElementById("spacer"); sticky = contactbar.offsetTop;})

// Get the navbar
var contactbar;
var spacer;
var loaded;

// Get the offset position of the navbar
var sticky;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
window.onscroll = function check() {
    if(document.documentElement.clientWidth <= 500) { return; }
	if(!contactbar) { return; }
  	if (window.pageYOffset >= sticky) {
		contactbar.classList.add("sticky");
		spacer.classList.add("stickyspacer");
  	} else {
    	contactbar.classList.remove("sticky");
		spacer.classList.remove("stickyspacer");
  	}
} 
