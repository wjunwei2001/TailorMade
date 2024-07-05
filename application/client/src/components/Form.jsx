/* Interest area: category, text box
Price preference: affordable/pricey, dropdown
Trendiness: trendy/unique, dropdown
Design style: description, text box
recipient: describe recipient, text box
recipient location: textbox
receiving date/time: textbox?
*/
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css";

function Form() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        Category: "",
        Price_Preference: "",
        Trendiness: "",
        Design_Style: "",
        Recipient_Description: "",
        Recipient_Location: "",
        Receiving_Date: "",
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
        // retrieve and run ML model -> retrieve listings -> pass into Recommendations

        // const url = "http://localhost:5000/predict";
        // setIsLoading(true);
        // console.log("Predict was called with:", formData);
        // const jsonData = JSON.stringify(formData);

        // fetch(url, {
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body:jsonData,
        // })
        // .then((response) => response.json())
        // .then((response) => {
        //     setResult(response.Prediction);
        //     setIsLoading(false);
        //     setShowResults(true);
        // });

        const dummyData = [
            {
              _id: "100001",
              img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              productName: "Round Table Clock",
              price: "44.00",
              color: "Black",
            },
            {
              _id: "100002",
              img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              productName: "Round Table Cock",
              price: "44.00",
              color: "Black",
            },
            {
              _id: "100003",
              img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              productName: "Round Table Clock",
              price: "44.00",
              color: "Black",
            }
          ];
        navigate('/recommendations', { state: { jsonData: dummyData } });
    };

    return (
        <div className="form-container">
            <form method="post" acceptCharset="utf-8">
                <div className="form-group">
                    <label>Category of Product:
                        <input
                        type="text"
                        className="form-control"
                        id="Category"
                        name="Category"
                        value={formData.Category}
                        onChange={handleChange}
                        placeholder="Electronics, Apparel etc."/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Trendiness of Product:
                        <select
                        className="dropdown form-control"
                        id="Trendiness"
                        name="Trendiness"
                        value={formData.Trendiness}
                        onChange={handleChange}
                        required>
                            <option value={""} disabled>
                                Select Trendy or Unique
                            </option>
                            <option value="0">Unique</option>
                            <option value="1">Trendy</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label> Product Description:
                        <input
                        type="text"
                        className="form-control"
                        id="Design_Style"
                        name="Design_Style"
                        value={formData.Design_Style}
                        onChange={handleChange}
                        placeholder="Describe your ideal product"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>Price Preference:
                        <select
                        className="dropdown form-control"
                        id="Price_Preference"
                        name="Price_Preference"
                        value={formData.Price_Preference}
                        onChange={handleChange}
                        required>
                            <option value={""} disabled>
                                Select your preferred price
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
                        id="Recipient_Description"
                        name="Recipient_Description"
                        value={formData.Recipient_Description}
                        onChange={handleChange}
                        placeholder="Describe your product recipient"/>
                    </label>
                </div>
                <div className="form-group">
                    <label> Recipient Location:
                        <input
                        type="text"
                        className="form-control"
                        id="Recipient_Location"
                        name="Recipient_Location"
                        value={formData.Recipient_Location}
                        onChange={handleChange}
                        placeholder="Location"/>
                    </label>
                </div>
                <div className="form-group">
                    <label> Receive Product by:
                        <input
                        type="text"
                        className="form-control"
                        id="Receiving_Date"
                        name="Receiving_Date"
                        value={formData.Receiving_Date}
                        onChange={handleChange}
                        placeholder="Date and Time"/>
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
