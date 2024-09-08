import React, { useState } from 'react'

const Address_form = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        altPhone: "",
        addressType: "Home",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        console.log(formData);
        // Retrieve the array
        const savedArray = localStorage.getItem("address");
        let myArray = savedArray ? JSON.parse(savedArray) : [];

        // Add a new item to the array
        myArray.push(formData);

        // Save the updated array back to localStorage
        // localStorage.setItem("myArray", JSON.stringify(myArray));

        localStorage.setItem('address' , JSON.stringify(myArray))
    };
    return (
        <form className={`container p-3 ${props.display}`}  onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">10-digit mobile number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        maxLength="10"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Pincode</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Locality</label>
                    <input
                        type="text"
                        className="form-control"
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Address (Area and Street)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">City/District/Town</label>
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">State</label>
                    <select
                        className="form-select"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--Select State--</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Landmark (Optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Alternate Phone (Optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Address Type</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="addressType"
                                value="Home"
                                checked={formData.addressType === "Home"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Home (All day delivery)</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="addressType"
                                value="Work"
                                checked={formData.addressType === "Work"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                Work (Delivery between 10 AM - 5 PM)
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        SAVE AND DELIVER HERE
                    </button>
                    <button type="button" className="btn btn-danger">
                        CANCEL
                    </button>
                </div>
            </div>
        </form>

    )
}

export default Address_form
