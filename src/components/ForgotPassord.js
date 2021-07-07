import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const initialFormValues = {
  email: "",
};

export default function ForgotPassord() {
  const { resetPassword } = useAuth();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState(initialFormValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = {
      ...values,
    };
    console.log(":DDD");
    console.log(finalFormData);

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(finalFormData.email);
      setMessage("Check inbox");
    } catch {
      setError("Failed to Log in");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        {message}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInputChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Forgot password
        </Button>
        {error && <h2>{error}</h2>}
      </form>
    </div>
  );
}
