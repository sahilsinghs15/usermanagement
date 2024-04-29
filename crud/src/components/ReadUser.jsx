import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddUser from "./AddUser";
import "./readUser.css";
import axios from "axios";

function ReadData() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(true);
    const [updatedData, setUpdatedData] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [showRead, setShowRead] = useState(false);
    const [updatingId, setUpdatingId] = useState(null); // Track the ID of the item being updated

    const { id } = useParams();

    async function handleRead() {
        try {
            setIsLoading(true);
            setShowRead(false);
            const response = await axios.get("http://localhost:5500/users");
            if (response.status !== 200) {
                setIsLoading(false);
                throw new Error("Error in reading data");
            } else {
                const responseData = response.data.data;
                console.log("Response Data :", responseData);
                setUserData(responseData);
                setShowAdd(false);
                setIsLoading(false);
                setShowRead(true);
            }
        } catch (error) {
            console.error("Error in reading data:", error);
            setIsLoading(false);
        }
    }

    async function handleUpdate(_id) {
        try {
            setIsUpdating(true);
            const response = await axios.put(`http://localhost:5500/updateUser/${_id}`, { name: updatedData });
            if (response.status !== 202) {
                throw new Error("Error in updating data");
            }
            const updatedUserData = userData.map((item) => {
                if (item._id === _id) {
                    return response;
                }
                return item;
            });
            setUserData(updatedUserData);
            setIsUpdating(false);
            console.log("Update Response :", response);
            setUpdatingId(null); // Reset the updatingId state after successful update
        } catch (e) {
            console.log("Error in updating data", e);
        }
    }

    async function handleDelete(_id) {
        try {
            const response = await axios.delete(`http://localhost:5500/delete/:${_id}`);
            console.log(response.message);
            await handleRead();
        } catch (e) {
            console.log(response.message, e);
        }
    }

    useEffect(() => {
        console.log("UserData:", userData);
    }, [userData]);

    return (
        <>
            {showAdd && <AddUser />}
            
                {showRead && userData.length > 0 && (
                    <div className="viewParent">
                        <div className="viewDiv">
                        <h3 id="db-heading">User Database</h3>

                            <ol >
                                {userData.map((data, index) => (
                                    <li id="lists" key={index} style={isUpdating ? {height : "70px", width : "100%"} : {height : "70px" , width : "90%"} }>
                                        {!isUpdating && <span id="id">Id: {index + 1}</span>} | <span id="name">Name: {data.name}</span>  {!isUpdating && <span> | Email: {data.email}</span>} 
                                        {updatingId === data._id && isUpdating && ( // Only show input field for the currently updating item
                                            <>
                                                <input
                                                    style={{height : "40px" , width : "100px"}}
                                                    placeholder="Enter New Name..."
                                                    type="text"
                                                    value={updatedData}
                                                    onChange={(e) => setUpdatedData(e.target.value)}
                                                />
                                                <button className="upDel-btn" onClick={() => handleUpdate(data._id)}>{isUpdating ? "Submit" : "Update"}</button>
                                            </>
                                        )}

                                        {!isUpdating && ( // Only show the "Update" button if not currently updating
                                            <button className="upDel-btn" onClick={() => { setIsUpdating(true); setUpdatingId(data._id); }}>Update</button>
                                        )}

                                        {!isUpdating && <button className="upDel-btn" onClick={() => handleDelete(data._id)}>Delete</button>}

                                    </li>
                                ))}
                            </ol>

                        </div>

                    </div>
                )}


            <div className="navigation-btn">
                <button onClick={handleRead}>{isLoading ? "Loading..." : "View"}</button>
                <button onClick={() => { setShowAdd(true); setShowRead(false); }}>Back </button>
            </div>
        </>
    );
}

export default ReadData;
