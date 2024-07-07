import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css";

function Form() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        interest_area: "",
        price_preference: "",
        trendiness_or_unique: "",
        design_style: "",
        recipient: "",
        location: "",
        time: "",
    });
    const [result, setResult] = useState("");
    const [showResults, setShowResults] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        let inputData = { ...formData };
        inputData[name] = value;
        setFormData(inputData);
    };
    
    const handlePredictClick = () => {
        const url = "http://127.0.0.1:5000/predict";
        setIsLoading(true);
        console.log("Predict was called with:", formData);
        const jsonData = JSON.stringify(formData);

        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body:jsonData,
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            setResult(response);
            setIsLoading(false);
            setShowResults(true);
            navigate('/recommendations', { state: { jsonData: response } });
        });
    };

    return (
        <div className="form-container">
            <form method="post" acceptCharset="utf-8">
                <div className="form-group">
                    <label>Category of Product:
                        <input
                        type="text"
                        className="form-control"
                        id="interest_area"
                        name="interest_area"
                        value={formData.interest_area}
                        onChange={handleChange}
                        placeholder="Electronics, Apparel etc."/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Trendiness of Product:
                        <select
                        className="dropdown form-control"
                        id="trendiness_or_unique"
                        name="trendiness_or_unique"
                        value={formData.trendiness_or_unique}
                        onChange={handleChange}
                        required>
                            <option value={""} disabled>
                                Select Trendy or Unique
                            </option>
                            <option value="1">Trendy</option>
                            <option value="0">Unique</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label> Product Description:
                        <input
                        type="text"
                        className="form-control"
                        id="design_style"
                        name="design_style"
                        value={formData.design_style}
                        onChange={handleChange}
                        placeholder="Describe your ideal product"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Price Preference:
                        <select
                        className="dropdown form-control"
                        id="price_preference"
                        name="price_preference"
                        value={formData.price_preference}
                        onChange={handleChange}
                        required>
                            <option value={""} disabled>
                                Select your preferred price point
                            </option>
                            <option value="0">Affordable</option>
                            <option value="1">Pricey</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label> Recipient Description:
                        <input
                        type="text"
                        className="form-control"
                        id="recipient"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        placeholder="Describe your product recipient"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Recipient Location:
                        <select
                        className="dropdown form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required>
                            <option value={""} disabled>
                                Select the recipient's country
                            </option>
                            <option value="singapore">Singapore</option>
                            <option value="malaysia">Malaysia</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label> Receive Product by:
                        <input
                        type="text"
                        className="form-control"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="Number of days from today"/>
                    </label>
                </div>
                <div className="form-group">
                    <button
                    className="predict-btn"
                    disabled={isLoading}
                    onClick={!isLoading ? handlePredictClick : null}
                    >
                    Get Product Recommendations
                    </button>
                </div>
            </form>
            <div className="results-container">
            </div>
        </div>
    )
};

export default Form;
