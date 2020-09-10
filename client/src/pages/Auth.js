import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const initialFormState = {
  username: "",
  password: "",
};

const validationObj = {
  lowercase: false,
  uppercase: false,
  number: false,
  minChar: false,
};

const validationNames = [
  { id: "lowercase", name: "Lower-case" },
  { id: "uppercase", name: "Upper-case" },
  { id: "number", name: "Number" },
  { id: "minChar", name: "More than 8 characters" },
];

const validationReducer = (state, action) => {
  switch (action.type) {
    case "lowercase":
      return { ...state, lowercase: action.payload };
    case "uppercase":
      return { ...state, uppercase: action.payload };
    case "number":
      return { ...state, number: action.payload };
    case "minChar":
      return { ...state, minChar: action.payload };
    default:
      return state;
  }
};

function Auth() {
  const [form, setForm] = useState(initialFormState);
  const [state, dispatch] = React.useReducer(validationReducer, validationObj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(value);
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

  const isFormEmpty = ({ username, password }) => {
    return !username.length || !password.length;
  };

  const validationItems = () => (
    <ul className="validation-box">
      {validationNames.map((item) => (
        <li style={state[item.id] ? { color: "grey" } : { color: "black" }}>
          {item.name}
        </li>
      ))}
    </ul>
  );

  const validate = (value) => {
    const checkLength = value.length >= 8;
    const checkLowerCase = /[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value);
    const checkUpperCase = /[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value);
    const checkNumber = /[0-9]/.test(value);

    if (checkLength) {
      dispatch({ type: "minChar", payload: true });
    } else {
      dispatch({ type: "minChar", payload: false });
    }

    if (checkLowerCase) {
      dispatch({ type: "lowercase", payload: true });
    } else {
      dispatch({ type: "lowercase", payload: false });
    }

    if (checkUpperCase) {
      dispatch({ type: "uppercase", payload: true });
    } else {
      dispatch({ type: "uppercase", payload: false });
    }

    if (checkNumber) {
      dispatch({ type: "number", payload: true });
    } else {
      dispatch({ type: "number", payload: false });
    }

    return checkLength && checkUpperCase && checkLowerCase && checkNumber;
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <p>Login</p>
        {validationItems()}
        <Form.Group>
          <Row>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Form.Control
              type="text"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Button>Submit</Button>
          </Row>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default Auth;
