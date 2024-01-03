// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
      
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/By6kxe40C/";
      
let model, webcam, labelContainer, maxPredictions, startButton;

      
// Load the image model and setup the webcam
startButton = document.getElementById("buttonStart");

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
    document.getElementById("webcam-container").replaceChild(webcam.canvas, preWebcam);
    //labelContainer = document.querySelector(".dyn-dect-bar");
    detectBar = document.getElementById("dectectedBar");
    undetectBar = document.getElementById("undectectedBar");
    dyndetectBar = document.querySelector(".dyn-dect-bar");
    dynundetectBar = document.querySelector(".dyn-udect-bar");
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}
      
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    
    const DetectclassPrediction = prediction[0].probability.toFixed(2);
    let detectPer = (DetectclassPrediction * 100) * 6.5;
    let detectbarLenght = (50 + detectPer) + "px";
    dyndetectBar.style.width = detectbarLenght;
    dyndetectBar.childNodes[1].innerHTML = Math.ceil(DetectclassPrediction * 100) + "%";

    const UndetectclassPrediction = prediction[1].probability.toFixed(2);
    let undetectPer = (UndetectclassPrediction * 100) * 6.5;
    let undetectbarLenght = (50 + undetectPer)+ "px";
    dynundetectBar.style.width = undetectbarLenght;
    dynundetectBar.childNodes[1].innerHTML = Math.ceil(UndetectclassPrediction * 100) + "%";
        
}
