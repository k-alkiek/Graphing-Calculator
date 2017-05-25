var graph = document.getElementById("graphCanvas");
var c = graph.getContext('2d');


var scale;
var step;

var xAxisYPos;
var yAxisXPos;

var xShift;
var yShift;

var xShiftPixels;
var yShiftPixels;

var expression;

var lineColor = "purple"

initialize();

function initialize() {
	scale = 50;
	step = 1;

	xAxisYPos;
	yAxisXPos;

	xShift = 0;
	yShift = 0;

	xShiftPixels = scale * xShift;
	yShiftPixels = scale * yShift;

	expression = "1/(x*x+1)*10*Math.sin(x*2)"	//default expression to plot

	draw(expression);
}


function draw(expression) {

	drawVerticals();
	drawHorizontals();
	writeXAxisNumbers();
	writeYAxisNumbers();

	plot(expression);
}

function clear() {
	c.clearRect(0, 0, graph.width, graph.height);
}

function readParams() {
	var stepInput = document.getElementById("step").value;
	step = stepInput == 0? 1 : stepInput;

	var xShiftInput = document.getElementById("xShift").value;
	xShift = xShiftInput;

	var yShiftInput = document.getElementById("yShift").value;
	yShift = yShiftInput;

	xShiftPixels = scale * xShift;
	yShiftPixels = scale * yShift;

	var expression = document.getElementById("equation").value;

	clear();
	draw(expression);
}

function drawVerticals() {
	for (var i=scale, yAxisDrawn=false; i<graph.width; i+=scale) {

		c.beginPath();

		if (Math.ceil(graph.width/(i-yShiftPixels)) === 2 && !yAxisDrawn) {
			c.strokeStyle="black";
			c.lineWidth = 2;
			yAxisXPos = i;
			yAxisDrawn = true;
		} else {
			c.strokeStyle="grey";
			c.lineWidth = 1;
		}
		c.moveTo(i, 0);
		c.lineTo(i, graph.height);
		
		c.stroke(); // Draw it
	}
}

function drawHorizontals() {
	for (var j=scale, xAxisDrawn=false; j<graph.height; j+=scale) {

		c.beginPath();

		if (Math.ceil(graph.height/(j-xShiftPixels)) === 2 && !xAxisDrawn) {
			c.strokeStyle="black";
			c.lineWidth = 2;
			xAxisYPos = j;
			xAxisDrawn = true;
		} else {
			c.strokeStyle="grey";
			c.lineWidth = 1;
		}
		c.moveTo(0, j);
		c.lineTo(graph.width, j);
		
		c.stroke(); // Draw it
	}
}


/*
 *Prints the numbers on the x axis.
 *Starts first by drawing the positive part
 *then draws the negative part
 */
function writeXAxisNumbers() {
	c.font="20px Aerial";

	//coordinates of the origin point
	var originXPos = yAxisXPos;
	var originYPos = xAxisYPos;

	var i, xPos;

	//The positive part of the x axis
	i = 1;
	xPos =  originXPos + scale;
	while (xPos < graph.width) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(xPos, originYPos);
		c.lineTo(xPos, originYPos + scale/8);
		c.stroke();

		c.fillText(i*step, xPos, originYPos + scale/2);

		xPos += scale;
		i++;
	}

	//The negative part of the x axis
	i = -1;
	xPos =  originXPos - scale;
	while (xPos > 0) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(xPos, originYPos);
		c.lineTo(xPos, originYPos + scale/8);
		c.stroke();

		c.fillText(i*step, xPos, originYPos + scale/2);

		xPos -= scale;
		i--;
	}

}


/*
 *Prints the numbers on the y axis.
 *Starts first by drawing the positive part
 *then draws the negative part
 */
function writeYAxisNumbers() {
	c.font="20px Aerial";

	//coordinates of the origin point
	var originXPos = yAxisXPos;
	var originYPos = xAxisYPos;

	var j, yPos;

	//The negative part of the y axis
	j = -1;
	yPos =  originYPos + scale;
	while (yPos < graph.height) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(originXPos, yPos);
		c.lineTo(originXPos - scale/8, yPos);
		c.stroke();

		c.fillText(j*step, originXPos - 3*scale/4, yPos + scale/8);

		yPos += scale;
		j--;
	}

	//The positive part of the y axis
	j = 1;
	yPos =  originYPos - scale;
	while (yPos > 0) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(originXPos, yPos);
		c.lineTo(originXPos - scale/8, yPos);
		c.stroke();

		c.fillText(j*step, originXPos - 2*scale/3, yPos + scale/8);

		yPos -= scale;
		j++;
	}

}


function plot(expression) {
	eval("var eqn = function(x) {return " + expression + ";}")

	interval = 1;
	var xPos = yAxisXPos;
	var yPos = xAxisYPos;

	c.fillStyle = lineColor;

	for (var i=0, xPos1=xPos, yPos1=yPos; i<graph.width-1; i+=interval) {
		var x = i/scale*step;				//Algebric value of x
		var y = eqn(x);						//Algebric value of y

		var xPos2 = xPos + i;				//X position in pixels
		var yPos2 = yPos - y/step*scale;	//Y poisition in pixels

		drawLine(xPos1, yPos1, xPos2, yPos2);

		xPos1 = xPos2;
		yPos1 = yPos2;

		//c.fillRect(xPos+i, yPos-eqn(x)/step*scale, 2, 2)
	}
	for (var i=0, xPos1=xPos, yPos1=yPos; i<graph.width-1; i+=interval) {
		var x = -i/scale*step;				//Algebric value of x
		var y = eqn(x);						//Algebric value of y

		var xPos2 = xPos - i;				//X position in pixels
		var yPos2 = yPos - y/step*scale;	//Y poisition in pixels

		drawLine(xPos1, yPos1, xPos2, yPos2);

		xPos1 = xPos2;
		yPos1 = yPos2;
	}
}

function drawLine(x1, y1, x2, y2) {
		c.beginPath();
		c.strokeStyle=lineColor;
		c.lineWidth = 2;
		c.moveTo(x1, y1);
		c.lineTo(x2, y2);
		c.stroke();
}