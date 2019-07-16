//This script first gets all images from the gallery in this page
//Then it scrolls through them on button click by making the new image have a display value
var images = [];
var current;
var currentNumber=0;
window.onload = function() {
	images=document.getElementsByClassName("gallery-image");
	if(images.length > 0) { document.getElementById("no-images").style.display = "none"; }
	else { return; }
	current=images[currentNumber];
	current.style.display="inline-block";
	document.getElementById("image-number").textContent = (currentNumber+1)+" / "+images.length;
}
function goRight() {
	if(images.length == 0) { return; }
	currentNumber++;
	if(currentNumber>images.length-1) { currentNumber = 0; }
	current.style.display="none";
	current = images[currentNumber];
	current.style.display="inline-block";
	document.getElementById("image-number").textContent = (currentNumber+1)+" / "+images.length;
}
function goLeft() {
	if(images.length == 0) { return; }
	currentNumber--;
	if(currentNumber<0)	{ currentNumber = images.length-1; }
	current.style.display="none";
	current = images[currentNumber];
	current.style.display="inline-block";
	document.getElementById("image-number").textContent = (currentNumber+1)+" / "+images.length;
}
