import React, { useEffect, useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

const siteKey = "6LeVEegqAAAAALW5dSwcy6K-esBV6LQ7fgOT-fWO";

const RecaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [score, setScore] = useState(null);

    const handleVerify = async () => {
        if (!executeRecaptcha) return;
        
        const token = await executeRecaptcha("spam");

        const response = await axios.post("https://03ea-2401-4900-1c27-d6a3-2f26-70e3-4678-9d.ngrok-free.app/verify", { token });
        console.log("response", response.data);

        if (response.data.success) {
            
            setScore(response.data.score);
        } else {
            alert("Verification failed");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Google reCAPTCHA v3 Example</h2>
            <button onClick={handleVerify}>Verify reCAPTCHA</button>
            {score !== null && <p>reCAPTCHA Score: {score}</p>}
        </div>
    );
};

function App() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            <RecaptchaComponent />
        </GoogleReCaptchaProvider>
    );
}

export default App;
