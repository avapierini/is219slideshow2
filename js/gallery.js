// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
requestAnimFrame( animate );
var currentTime = new Date().getTime();
if (mLastFrameTime === 0) {
mLastFrameTime = currentTime;
}

if ((currentTime - mLastFrameTime) > mWaitTime) {
swapPhoto();
mLastFrameTime = currentTime;
}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	
	if (mCurrentIndex>=mImages.length){
		mCurrentIndex=0;
	}
	if (mCurrentIndex<0){
		mCurrentIndex=mImages.length-1;
	}
	document.getElementById('photo').src=mImages[mCurrentIndex].img;
	var loc=document.getElementsByClassName('location');
	loc[0].innerHTML="Location: " + mImages[mCurrentIndex].location;

	var dec=document.getElementsByClassName('description');
	dec[0].innerHTML="Description: " + mImages[mCurrentIndex].description;

	var dt=document.getElementsByClassName('date');
	dt[0].innerHTML="Date: " + mImages[mCurrentIndex].date;

	mLastFrameTime=0;
	mCurrentIndex+=1;
}

//previous swap photo
function prevSwapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	
	if (mCurrentIndex>=mImages.length){
		mCurrentIndex=0;
	}
	if (mCurrentIndex<0){
		mCurrentIndex=mImages.length-1;
	}
	document.getElementById('photo').src=mImages[mCurrentIndex].img;
	var loc=document.getElementsByClassName('location');
	loc[0].innerHTML="Location: " + mImages[mCurrentIndex].location;

	var dec=document.getElementsByClassName('description');
	dec[0].innerHTML="Description: " + mImages[mCurrentIndex].description;

	var dt=document.getElementsByClassName('date');
	dt[0].innerHTML="Date: " + mImages[mCurrentIndex].date;

	mLastFrameTime=0;
	mCurrentIndex-=1;
}
// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrieved JSON information
var mJSON;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'newImages.json';
//var mUrl = 'images.json';
//var mUrl = "https://api.npoint.io/fd92faeca7696b78bac6";

//PART 2
//constructor
function fetchJSON() {
	mRequest.onreadystatechange = function(){
		console.log("on ready state change !!");
		if (this.readyState == 4 && this.status == 200) {
			mJSON = JSON.parse(mRequest.responseText);
			iterateJSON(mJSON);
		}
	}
	mRequest.open("GET",mUrl,true);
	mRequest.send();
}

//JSON file becomes gallery image object
function iterateJSON(mJSON) {
	for (x = 0; x < mJSON.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].location = mJSON.images[x].imgLocation;
		mImages[x].description = mJSON.images[x].description;
		mImages[x].date = mJSON.images[x].date;
		mImages[x].img = mJSON.images[x].imgPath;
	}
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	if (mUrl == null){
		mUrl = 'images.json';
	}

	//next photo
	$('#nextPhoto').click(function() {
   swapPhoto();
 }); 

 //previous photo
 $('#prevPhoto').click(function() {
   prevSwapPhoto();
 }); 

 //hide moreIndicator
