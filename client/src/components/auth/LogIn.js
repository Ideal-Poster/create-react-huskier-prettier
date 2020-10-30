import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { login } from "../../requests";
import styles from "./Auth.module.css";

const initialFormState = {
  username: "",
  password: "",
};

function Auth(props) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

  const onSubmit = async () => {
    const res = await login(form);

    if (!res.errors) {
      localStorage.setItem("token", res.data.token);
      props.history.push("/");
    }
  };

  return (
    <div className={styles.background}>
      <Row className={styles.form__container}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form.Group className={styles.form__group}>
            {Object.keys(form).map((formName) => (
              <Row key={formName}>
                <Form.Control
                  type={formName === "password" ? "password" : "text"}
                  name={formName}
                  placeholder={formName}
                  value={form[formName]}
                  onChange={handleChange}
                  className={styles.form}
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

export default Auth;
