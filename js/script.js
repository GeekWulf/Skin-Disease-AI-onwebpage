const URL = "https://teachablemachine.withgoogle.com/models/By6kxe40C/";
      
let model, webcam, labelContainer, maxPredictions, startButton;

startButton = document.getElementById("buttonStart");

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    const preWebcam = document.getElementById("pre-webcam");
      
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; 
    webcam = new tmImage.Webcam(500, 500, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);
    document.getElementById("webcam-container").replaceChild(webcam.canvas, preWebcam);
    detectBar = document.getElementById("dectectedBar");
    undetectBar = document.getElementById("undectectedBar");
    dyndetectBar = document.querySelector(".dyn-dect-bar");
    dynundetectBar = document.querySelector(".dyn-udect-bar");
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}
      
async function predict() {
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
