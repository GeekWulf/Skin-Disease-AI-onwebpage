// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
      
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/By6kxe40C/";
      
let model, webcam, labelContainer, maxPredictions, startButton, stopButton;

      
// Load the image model and setup the webcam
startButton = document.getElementById("buttonStart");
startButton = document.getElementById("buttonStop");


async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    const preWebcam = document.getElementById("pre-webcam");
      
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
      
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
      
    // append elements to the DOM
    //document.getElementById("webcam-container").appendChild(webcam.canvas);
    document.getElementById("webcam-container").replaceChild(webcam.canvas, preWebcam);
    //labelContainer = document.querySelector(".dyn-dect-bar");
    labelContainer1 = document.querySelector(".dyn-dect-bar");
    labelContainer2 = document.querySelector(".dyn-udect-bar");
    //for (let i = 0; i < maxPredictions; i++) { // and class labels
        //labelContainer.appendChild(document.createElement("div"));
    //}
}


//var loop = setInterval(loop(), 1)

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

      
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    
    //console.log("is 1")
    const DetectclassPrediction = prediction[0].probability.toFixed(2);
    labelContainer1.childNodes[1].innerHTML = Math.floor(DetectclassPrediction * 100) + " %";

    //console.log("is 2")
    const UndetectclassPrediction = prediction[1].probability.toFixed(2);
    labelContainer2.childNodes[1].innerHTML = Math.floor(UndetectclassPrediction * 100) + " %";
        
    
    //const progress = document.querySelector(".dect-score");
    //let pro = document.querySelector(".dect-score").innerHTML;
    //console.log(pro);

    //let i = 0;
    //const fakeUploadPerc = [0, 2, ];

    //const interval = setInterval(() => {
       // progress.style.width = pro;
        //i++;
        //if(progress == 100){
            //clearInterval(interval);
        //}
    //}, 1);

}
