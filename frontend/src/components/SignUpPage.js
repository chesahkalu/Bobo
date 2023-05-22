import React, { useState } from "react";
import axios from "axios";

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        password1: "",
        password2: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/signup/", formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} placeholder="Username" />
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password1" type="password" onChange={handleChange} placeholder="Password" />
            <input name="password2" type="password" onChange={handleChange} placeholder="Confirm Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpPage;

