window.onscroll = function() {check()};
window.onload = function() { navbar = document.getElementById("navbar"); spacer = document.getElementById("spacer"); sticky = navbar.offsetTop;}

// Get the navbar
var navbar;
var spacer;

// Get the offset position of the navbar
var sticky;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function check() {
	if(!navbar) { return; }
  	if (window.pageYOffset >= sticky) {
    	navbar.classList.add("sticky")
		spacer.classList.add("stickyspacer")
  	} else {
    	navbar.classList.remove("sticky");
		spacer.classList.remove("stickyspacer");
  	}
} 
