var radius;
var c;
var imge = []
var width;
var height;
var imageHeight = 28;
var imageWidth = 28;
var NeuralNetwork = null;

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function windowResized() {
    //resizeCanvas(30, 30);
    //saveCanvas('myCanvas', 'jpg');
}

function loadImageBuffer(buffer) {
    let img = createImage(28, 28);
    img.loadPixels();
    for (let i = 0; i < img.height; i++) {
        for (let j = 0; j < img.width; j++) {
            var col = buffer[i * 28 + j];
            img.set(j, i, color(col, col, col));
        }
    }
    img.updatePixels();
    image(img, 17, 17);
}

function normalizeDistance(buffer) {
    for(var i = 0; i < buffer.length; i++) {
        buffer[i] = buffer[i] / 255.0;
    }
}

function addTest(response) {
    var stre = "<p>The network estimates that this number is " + response.toString() + "</p>";
    var element;
    var el = document.getElementById("mesg");
    if(el != null) {
        var element = el;
        element.innerHTML = stre;
    }
    else {
        element = htmlToElement(stre);
        element.id = "mesg"
    }
    c_element = document.getElementById("resp");
    c_element.appendChild(element);
}

function findGreater(response) {
    var maxim = 0;
    var index = 0;
    for(var i = 0; i < response.length; i++) {
        if(maxim < response[i]) {
            maxim = response[i];
            index = i;
        }
    }
    return index;
}

function test_Digits() {
    loadPixels();
   // var ghita = new NeuralObject([43, 61, 1], [2, 0], 0.2);
    sentData = []
    for(var i = 0; i < pixels.length; i += 4) {
        sentData.push(255 - pixels[i]);
    }
    var buffer = resizeImageBuffer(sentData, height, width, imageHeight, imageWidth);
    var s = 0;
    for(var i = 0; i < buffer.length; i++) {
        s += buffer[i];
    }
   // console.log(sentData.length, buffer.length, buffer, s, height, width)
    var NeuralNetwork = new NeuralObject([784, 81, 10], [2, 0], 0.2);
    NeuralNetwork.nn_LoadFile();
    normalizeDistance(buffer);
    var response = NeuralNetwork.feedForward(buffer);
    console.log(NeuralNetwork.feedForward(buffer));
   // loadImageBuffer(buffer);
    addTest(findGreater(response))
}

function setup() {
    width = 392;
    height = 392;
    cnv = createCanvas(height, width);
    cnv.id("Canvas")
    cnv.parent('ExampleBox')
    createP();
    c = color(0, 0, 0);
    background(255);
    colorMode(RGB, 255)
}

function draw() {
  radius = 20;
}

function mouseClicked() {
  if (mouseX > 400) {
    c = get(mouseX, mouseY);
  }
}

function executeCode() {
    var newUrl = "http://localhost:5000/execute.json";
    var value = document.getElementById("txtarea").value.split("\n")
    console.log(value)
    httpPost(newUrl, 'json', {"code": value}, function(response) {
        var resp = "";
        for(var i = 0; i < response["response"].length; i++) {
            resp += response["response"][i] + "\n";
        }
        document.getElementById("output").innerHTML = resp
        console.log(response)
    });
}

function mouseDragged() {
    stroke(c)
    if (mouseX < width) {
        strokeWeight(radius);
        imge.push(mouseY * height + mouseX)
        imge.push(pmouseY * height + pmouseX)
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function changeBG() {
  background(255);
  imge = []
  return false;
}
