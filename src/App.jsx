import { useState } from "react";
import "./App.css";

const App = () => {
  // add placeholder text for the title
  // we'll use the form to update this state by the end of this lesson
  const [title, setTitle] = useState("The full name will appear here.");
  const [formData, setName] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });

  // we only need the target property from the event,
  // so we'll destructure it from the event parameter
  const checkErrors = ({ target }) => {
    if (target.name === "firstName") {
      setErrors({
        ...errors,
        firstName:
          target.value.length < 3
            ? "Your first name must be at least three characters long."
            : "",
      });
    }
    if (target.name === "lastName") {
      setErrors({
        ...errors,
        lastName:
          target.value.length < 2
            ? "Your last name must be at least two characters long."
            : "",
      });
    }
    if (target.name === "password") {
      setErrors({
        ...errors,
        password:
          target.value.length < 6
            ? "Your password must be at least six characters long."
            : "",
        passwordConfirmation:
          formData.passwordConfirmation !== target.value
            ? "The passwords do not match."
            : "",
      });
    }
    if (target.name === "passwordConfirmation") {
      setErrors({
        ...errors,
        passwordConfirmation:
          formData.password !== target.value
            ? "The passwords do not match."
            : "",
      });
    }
  };

  const handleFormChange = (event) => {
    setName({ ...formData, [event.target.name]: event.target.value });
    // Invoke helper function, passing it the event
    checkErrors(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTitle(`Your name is: ${formData.firstName} ${formData.lastName}`);
    setName({
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  // src/App.jsx

  const formIsInvalid = Object.values(errors).some(Boolean);
  const formHasMissingData = !Object.values(formData).every(Boolean);

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleFormChange}
          />
          {errors.passwordConfirmation && (
            <p className="error">{errors.passwordConfirmation}</p>
          )}
        </div>

        <button type="submit" disabled={formIsInvalid || formHasMissingData}>
          Submit your name
        </button>
      </form>
    </>
  );
};

export default App;
