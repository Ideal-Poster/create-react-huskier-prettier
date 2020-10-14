import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { login } from "../../requests";

const initialFormState = {
  username: "",
  password: "",
};

function Auth() {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

  const onSubmit = async () => {
    // console.log(form.username);
    login(form);
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <Form.Group>
          {Object.keys(form).map((formName) => (
            <Row>
              <Form.Control
                type="text"
                name={formName}
                placeholder={formName}
                value={form[formName]}
                onChange={handleChange}
              />
            </Row>
          ))}
          <Row>
            <Button onClick={onSubmit}>Submit</Button>
          </Row>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default Auth;
