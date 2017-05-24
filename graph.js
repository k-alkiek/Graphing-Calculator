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


initialize();

function initialize() {
	scale = 60;
	step = 1;

	xAxisYPos;
	yAxisXPos;

	xShift = 1;
	yShift = -1;

	xShiftPixels = scale * xShift;
	yShiftPixels = scale * yShift;
	draw();
}

function draw() {

	drawVerticals();
	drawHorizontals();
	writeXAxisNumbers();
	writeYAxisNumbers()
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


function writeYAxisNumbers() {
	c.font="20px Aerial";

	//coordinates of the origin point
	var originXPos = yAxisXPos;
	var originYPos = xAxisYPos;

	var j, yPos;

	//The positive part of the x axis
	j = -1;
	yPos =  originYPos + scale;
	while (yPos < graph.height) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(originXPos, yPos);
		c.lineTo(originXPos - scale/8, yPos);
		c.stroke();

		c.fillText(j*step, originXPos - scale/2, yPos + scale/8);

		yPos += scale;
		j--;
	}

	//The negative part of the x axis
	j = 1;
	yPos =  originYPos - scale;
	while (yPos > 0) {
		c.beginPath();
		c.strokeStyle="black";
		c.lineWidth = 2;
		c.moveTo(originXPos, yPos);
		c.lineTo(originXPos - scale/8, yPos);
		c.stroke();

		c.fillText(j*step, originXPos - scale/2, yPos + scale/8);

		yPos -= scale;
		j++;
	}

}

// function writeYAxisNumbers() {
// 	c.font="20px Aerial";
// 	var originXPos = yAxisXPos;
// 	var originYPos = xAxisYPos;


// 	for (var j=1; (j)*scale <graph.height/2; j++) {
// 		//draw the negative value
// 		var negativeYPos =  originYPos + j*scale

// 		if (negativeYPos > 0 && negativeYPos < graph.height) {
// 			c.beginPath();
// 			c.strokeStyle="black";
// 			c.lineWidth = 2;
// 			c.moveTo(originXPos, negativeYPos);
// 			c.lineTo(originXPos - scale/8, negativeYPos);
// 			c.stroke();

// 			c.fillText(-j*step, originXPos - 2*scale/3, negativeYPos + scale/3);
// 		}

// 		//draw the positive value
// 		var positiveYPos =  originYPos - j*scale

// 		if (positiveYPos > 0 && positiveYPos < graph.height) {
// 			c.beginPath();
// 			c.strokeStyle="black";
// 			c.lineWidth = 2;
// 			c.moveTo(originXPos, positiveYPos);
// 			c.lineTo(originXPos - scale/8, positiveYPos);
// 			c.stroke();

// 			c.fillText(j*step, originXPos - 2*scale/3, positiveYPos + scale/3);
// 		}	
// 	}

// }