prediction_1 = ""

Webcam.set({
    width :350,
    heigth:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/zoU0rjnce/model.json', modelLoaded);

function modelLoaded() {
    console.log('model loaded!');
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        prediction_1 = results[0].label;

        if (results[0].label == "Entrada aceptada") {
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
        }
        if (results[0].label == "Entrada denegada") {
            document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        }
    }
}
