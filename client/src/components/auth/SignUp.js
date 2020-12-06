import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

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

// Component starts here
// =============================================================================

function SignUp(props) {
  const [form, setForm] = useState(initialFormState);
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [state, dispatch] = React.useReducer(validationReducer, validationObj);

  useEffect(() => {
    const doPasswordsMatch = () => {
      return form.password === form.passwordConfirmation;
    };
    const updatePasswordMatchState = () => {
      // passwords match and are not black
      if (doPasswordsMatch() && form.password.length > 0) {
        setpasswordMatch(true);
      } else {
        setpasswordMatch(false);
      }
    };
    updatePasswordMatchState();
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If in password field start validating password
    if (e.target.name === "password") validate(value);
    // update form state
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

    return (
      checkLength &&
      checkUpperCase &&
      checkLowerCase &&
      checkNumber &&
      passwordMatch
    );
  };

  const isValidated = () => {
    return Object.values(state).every((val) => val === true) && passwordMatch;
  };

  const ValidationIcon = ({ isDone }) => {
    return isDone ? (
      <svg
        className="validation-icon"
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

  const ValidationItems = () => (
    <div className={styles.validation__box}>
      <ul className={styles.validation__list}>
        {validationNames.map((item, i) => (
          <li
            key={i}
            style={state[item.id] ? { color: "grey" } : { color: "black" }}
          >
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate(form.password)) {
      const res = await signUp(form);
      res.errors ? alert(res.errors) : acceptLogin(res);
    }
  };

  const acceptLogin = (res) => {
    localStorage.setItem("user", res.user);
    localStorage.setItem("token", res.token);
    props.history.push("/");
  };

  return (
    <div className={styles.background}>
      <Row className={styles.sign__up}>
        <Col md={{ span: 4, offset: 4 }} style={{ padding: "0px" }}>
          <ValidationItems />
          <Form.Group className={styles.form__group}>
            {Object.keys(form).map((formName) => (
              <Row key={formName}>
                <Form.Control
                  type={formName === "username" ? "text" : "password"}
                  name={formName}
                  placeholder={formName}
                  value={form[formName]}
                  onChange={handleChange}
                  className={`${styles.form}  ${styles.formName}`}
                />
              </Row>
            ))}
            <Row>
              <Button
                disabled={!isValidated()}
                className={styles.submit__button}
                onClick={onSubmit}
              >
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
