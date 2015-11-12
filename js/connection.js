function Connection(start, end) {
    this.start = start;
    this.end = end;
    this.weight = Math.random();
}

Connection.prototype.display = function () {
    var position = [(this.start.position.x + this.end.position.x) / 2, (this.start.position.y + this.end.position.y) / 2]
    line(this.start.position.x, this.start.position.y, this.end.position.x, this.end.position.y);
    textSize(20);
    text(this.weight + "", position[0], position[1])
}


Connection.prototype.error = function (neuron) {
    var fill = neuron.fill;
    var goal = network.target.fill;
    var rDiff = ((goal.r - fill.r) / 255);
    var gDiff = ((goal.g - fill.g) / 255);
    var bDiff = ((goal.b - fill.b) / 255);
    var delta = Math.max(Math.abs(rDiff), Math.abs(gDiff), Math.abs(bDiff));
    return delta;
}