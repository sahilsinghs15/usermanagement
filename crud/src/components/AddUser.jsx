import { useState } from "react";
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./addUser.css";

function AddUser() {
    const [enterData, setEnterData] = useState({
        name: "",
        email: "",
        password: "",
    });


    function handleUserInput(e) {
        const { name, value } = e.target;
        setEnterData({
            ...enterData,
            [name]: value,
        });
    }


    async function handleSubmit() {
        try {
            
            const response = await axios.post("http://localhost:5500/entry", enterData);
            console.log(response.status);
            if (response.status !== 201) {
                toast.error("Failed to enter User Data");
            } else {
                toast.success("User Data entered Successfully");
                // To Clear input fields after successful submission
                setEnterData({
                    name: "",
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to enter User Data");
        } 
    }

    
 
    return (
        <div className="main-container">
            <div className="container">
                <h1>User Data</h1>
                <div className="inputDiv">
                    <label htmlFor="name" className="label">Name:</label>
                    <input
                        required
                        className="input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Your Name"
                        value={enterData.name}
                        onChange={handleUserInput}
                    />
                </div>


                <div className="inputDiv">
                    <label htmlFor="email" className="label">Email:</label> 
                    <input
                        required
                        className="input"
                        id="email"
                        name="email" 
                        type="text"
                        placeholder="Enter your email"
                        value={enterData.email}
                        onChange={handleUserInput}
                    />
                </div>

                <div className="inputDiv">
                    <label htmlFor="password" className="label">Pass:</label> 
                    <input
                        required
                        className="input"
                        id="password"
                        name="password" 
                        type="text"
                        placeholder="Enter your password"
                        value={enterData.password}
                        onChange={handleUserInput}
                    />
                    
                </div>
                <button onClick={handleSubmit} id="submit-btn">Submit</button>

            </div>
            
            <ToastContainer/>
        </div>
    );
}

export default AddUser;
