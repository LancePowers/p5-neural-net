// Create a network that can choose a color
// 0 - 255 is the range of weighting that can take place.
// Can change the color at random
// if in top 5 add weight of 1 else 
var network = new Network();

function setup() {
    createCanvas(2400, 1200);
    network.createHiddenLayer();
    network.createInput();
    network.createOutput();
    network.createTarget();
    network.createConnections();
}

function draw() {
    background(1000)
    frameRate(60);
    network.display();
    network.teach();
}