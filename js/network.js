function Network() {
    this.inputs = [];
    this.output = {};
    this.target = {};
    this.hidden = [];
    this.connections = [];
    this.bias = 1;
    this.controlSuccess = false;
}

Network.prototype.createConnections = function () {
    var self = this;
    this.inputs.forEach(function (input) {
        for (var i = 0; i < self.hidden.length; i++) {
            var connection = new Connection(input, self.hidden[i])
            self.hidden[i].connections.push(connection)
            self.connections.push(connection)
        }
    })
    this.hidden.forEach(function (hide) {
        var connection = new Connection(hide, self.output)
        self.output.connections.push(connection)
        self.connections.push(connection)
    })
}


Network.prototype.display = function () {

    this.inputs.forEach(function (neuron) {
        fill(neuron.fill.r, neuron.fill.g, neuron.fill.b);
        ellipse(neuron.position.x, neuron.position.y, 80, 80);
    })

    this.output.outputDisplay();

    this.hidden.forEach(function (neuron) {
        neuron.display();
    })

    fill(this.target.fill.r, this.target.fill.g, this.target.fill.b);
    ellipse(this.target.position.x, this.target.position.y, 80, 80);


    this.connections.forEach(function (connection) {
        connection.display();
    })

    this.control();
}


Network.prototype.createHiddenNeurons = function (num) {
    var neurons = [];
    var count = 200
    for (var i = 0; i < num; i++) {
        var nueron = {
            fill: {
                r: 0,
                g: 0,
                b: 0
            },
            position: {
                x: 1000,
                y: count
            }
        };
        neurons.push(new Neuron(nueron));
        count += 100;
    }
    return neurons;
}





Network.prototype.createOutput = function () {
    this.output = new Neuron({
        fill: {
            r: 0,
            g: 0,
            b: 0
        },
        position: {
            x: 1600,
            y: 600
        }
    })
}

Network.prototype.createTarget = function () {
    this.target = new Neuron({
        fill: {
            r: 170,
            g: 56,
            b: 170
        },
        position: {
            x: 2000,
            y: 600
        }
    })
}

Network.prototype.createHiddenLayer = function () {
    var neurons = this.createHiddenNeurons(10);
    neurons.forEach(function (neuron) {
        fill(neuron.fill.r, neuron.fill.g, neuron.fill.b)
        ellipse(neuron.position.x, neuron.position.y, 80, 80);
    })

    this.hidden = neurons;
}

Network.prototype.createInput = function () {
    var inputs = [];
    for (var i = 0; i < 3; i++) {
        var inputData = {
            fill: {
                r: 0,
                g: 0,
                b: 0
            },
            position: {
                x: 200,
                y: 0
            }
        }
        if (i === 0) {
            inputData.fill.r = 255;
            inputData.position.y = 400
        }
        if (i === 1) {
            inputData.fill.g = 255;
            inputData.position.y = 600
        }
        if (i === 2) {
            inputData.fill.b = 255;
            inputData.position.y = 800
        }
        inputs.push(new Neuron(inputData));
    }
    this.inputs = inputs;
}


Network.prototype.control = function () {
    if (this.controlSuccess === false) {
        var fillColor = {
            r: parseInt(Math.random() * 255),
            g: parseInt(Math.random() * 255),
            b: parseInt(Math.random() * 255)
        };
        console.log((fillColor))
        if (fillColor === {
                r: 170,
                g: 56,
                b: 170
            }) {
            this.controlSuccess = true;
        }
        var position = {
            x: 1600,
            y: 400
        }

        fill(fillColor.r, fillColor.g, fillColor.b);
        ellipse(position.x, position.y, 80, 80);
    }
}


Network.prototype.teach = function () {
    var self = this;
    var total = 0;
    this.connections.forEach(function (connection) {
        if (connection.end.position.x === 1000) {
            connection.err = connection.error(connection.end);
            if (connection.err > self.bias) {
                connection.weight = Math.random();
                total += 1;
            }
        } else if (connection.start.position.x === 1000) {
            connection.err = connection.error(connection.start);
            if (connection.err > self.bias) {
                connection.weight = Math.random();
                total += 1;
            };
        }
    })

    if (total < 20) {
        this.bias *= .7;
    }
}