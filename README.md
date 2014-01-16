JSlider
=======

A slider library that allows for simple creation of slider, and endless customization.

To get started, go to "releases" and download the latest non-prerelease version, and include it.

### Usage

Usage is fairly simple. To create the most simple slider, you must have a div, with a UL in it,
which has LI elements in it. These LI elements are your slides.

´´´
<div id="slider">
	<ul id="slides">
		<li class="slide">slide1</div>
		<li class="slide">slide2</div>
		<li class="slide">slide3</div>
	</ul>
</div>
´´´

The "class" and "id" attribtues are *not* required.

After you have those elements, you need to write some javascript. Go inside
a JavaScrpt file, or create a <pre>script</pre> tag and write.

´´´
var slider = new JSlider("#your-slider-id"); //You can use any selector here
slider.start(); //This starts the automated slider
´´´

If you have done everything correctly you should be able to sit back and whatch them slides go.

You may also set some options for JSlider. This is done by passing an Object containing key=>value pairs to the JSlider constructor.

For example, to set how long the slider should stay at each slide, do:

´´´
var slider = new JSlider("#your-slider-id", {
	"delay" : 5000 //Set the delay to 5000ms
}); //You can use any selector here
slider.start(); //This starts the automated slider
´´´

The code above will make JSlider wait for 5 seconds before it slides to the next slide.

Currently avaible options are:
<ul>
	<li><pre>(number)delay</pre> : (ms) Set how long JSlider should wait before it slide.</li>
	<li><pre>(number)duration</pre> : (ms) Sets the animation duration</li>
</ul>


There is also some avaible function in the JSlider object.
<ul>
	<li><pre>(void)start()</pre> : Start the slider </li>
	<li><pre>(void)stop()</pre> : Stop the slider </li>
	<li><pre>(void)next()</pre> : Go to the next slide </li>
	<li><pre>(void)prev()</pre> : Go to the previous slide </li>
</ul>

