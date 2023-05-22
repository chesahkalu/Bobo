import React from "react";
import axios from "axios";

function DeleteAccountPage() {
    const handleDelete = async () => {
        try {
            const response = await axios.delete("/api/delete_account/");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={handleDelete}>Delete Account</button>;
}

export default DeleteAccountPage;

