import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Checkmark } from "react-checkmark";

import { signUp } from "../../requests";
import styles from "./Auth.module.css";

const initialFormState = {
  username: "",
  password: "",
  passwordConfirmation: "",
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

function SignUp() {
  const [form, setForm] = useState(initialFormState);
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [state, dispatch] = React.useReducer(validationReducer, validationObj);

  useEffect(() => {
    console.log(form.password.length > 0);
    if (doPasswordsMatch() && form.password.length > 0) {
      setpasswordMatch(true);
    } else {
      setpasswordMatch(false);
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === "password") validate(value);
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

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

  const ValidationIcon = ({ isDone }) => {
    return isDone ? (
      <svg
        class="validation-icon"
        width="14"
        height="12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          className="check"
          points="1,7 5,11 13,1"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2px"
          strokeLinecap="round"
        />
      </svg>
    ) : null;
  };

  const validationItems = () => (
    <div className={styles.validation__box}>
      <ul className={styles.validation__list}>
        {validationNames.map((item) => (
          <li style={state[item.id] ? { color: "grey" } : { color: "black" }}>
            <span className="validation-icon">
              <ValidationIcon isDone={state[item.id]} />
              {item.name}
            </span>
          </li>
        ))}
        <li style={passwordMatch ? { color: "grey" } : { color: "black" }}>
          <span className="validation-icon">
            <ValidationIcon isDone={passwordMatch} />
            Passwords match
          </span>
        </li>
      </ul>
    </div>
  );

  const doPasswordsMatch = () => {
    return form.password === form.passwordConfirmation;
  };

  const onSubmit = () => {
    signUp(form);
  };

  return (
    <div className={styles.background}>
      <Row className={styles.sign__up}>
        <Col md={{ span: 4, offset: 4 }} style={{ padding: "0px" }}>
          {validationItems()}
          <Form.Group className={styles.form__group}>
            {Object.keys(form).map((formName) => (
              <Row>
                <Form.Control
                  type="text"
                  name={formName}
                  placeholder={formName}
                  value={form[formName]}
                  onChange={handleChange}
                  className={`${styles.form}  ${styles.formName}`}
                />
              </Row>
            ))}
            <Row>
              <Button className={styles.submit__button} onClick={onSubmit}>
                Submit
              </Button>
            </Row>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
