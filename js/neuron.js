function Neuron(neuron) {
    this.fill = neuron.fill;
    this.position = neuron.position;
    this.connections = [];
}

Neuron.prototype.display = function () {
    var self = this;
    this.connections.forEach(function (connection) {
        var rWeight = connection.weight * connection.start.fill.r;
        if (rWeight > 0) {
            self.fill.r = rWeight;
        }
        var gWeight = connection.weight * connection.start.fill.g;
        if (gWeight > 0) {
            self.fill.g = gWeight
        }
        var bWeight = connection.weight * connection.start.fill.b;
        if (bWeight > 0) {
            self.fill.b = bWeight
        }
    })
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.position.x, this.position.y, 80, 80);
}

Neuron.prototype.outputDisplay = function () {
    var self = this;
    var r = 0;
    var g = 0;
    var b = 0;
    var goal = network.target.fill;
    this.connections.forEach(function (connection, index, arr) {
        console.log(connection.weight, connection.start.fill)
        var rWeight = connection.weight * connection.start.fill.r;
        r += rWeight / arr.length;
        var gWeight = connection.weight * connection.start.fill.g;
        g += gWeight / arr.length;
        var bWeight = connection.weight * connection.start.fill.b;
        b += bWeight / arr.length;
    })
    var delta = goal.r - r + goal.g - g + goal.b - b;
    console.log(r)
    textSize(40);
    if (
        parseInt(r) === 170 &&
        parseInt(g) === 56 &&
        parseInt(b) === 170
    ) {
        text((r + " " + g + " " + b), this.position.x, this.position.y - 200);
    }

    fill(r, g, b);
    ellipse(this.position.x, this.position.y, 80, 80);
    text(parseInt(delta), this.position.x, this.position.y + 100);
}