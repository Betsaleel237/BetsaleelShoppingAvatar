// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Speech SDK should be available globally as 'window.SpeechSDK'
    const speechsdk = window.SpeechSDK;

    if (!speechsdk) {
        alert("Speech SDK not loaded");
        return;
    }

    // Replace with your Azure subscription key and region
    const subscriptionKey = "3QRGjrMl2mcXLsNhisQiAK96WlULgo6elCEKmNGEJQicnZlBmjwvJQQJ99AKAC8vTInXJ3w3AAAYACOGoC0f";
    const region = "westus2";

    // Initialize speech configuration
    const speechConfig = speechsdk.SpeechConfig.fromSubscription(subscriptionKey, region);
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    speechConfig.speechRecognitionLanguage = "en-US";

    // Create the speech recognizer
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    // Add event listener for the button
    const startButton = document.getElementById("start-recognition");
    const recognizedTextElement = document.getElementById("recognized-text");

    startButton.addEventListener("click", () => {
        recognizer.recognizeOnceAsync(result => {
            if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
                recognizedTextElement.textContent = result.text;
            } else if (result.reason === speechsdk.ResultReason.NoMatch) {
                recognizedTextElement.textContent = "No speech could be recognized. Please try again.";
            } else if (result.reason === speechsdk.ResultReason.Canceled) {
                const cancellation = speechsdk.CancellationDetails.fromResult(result);
                recognizedTextElement.textContent = `Recognition canceled: ${cancellation.reason}`;
                if (cancellation.reason === speechsdk.CancellationReason.Error) {
                    console.error(`Error: ${cancellation.errorDetails}`);
                }
            } else {
                recognizedTextElement.textContent = "Unknown error occurred.";
            }
        });
    });
    
});
