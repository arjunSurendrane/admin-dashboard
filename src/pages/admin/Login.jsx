import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../api";
import Form from "../../components/Form";

export default function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminJwt");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/employees");
    }
  }, []);
  const submitData = async () => {
    setLoading(true);
    try {
      console.log(email, password);
      const res = await sendRequest({
        link: "adminLogin",
        data: { email, password },
        method: "post",
      });
      console.log(res);
      await localStorage.setItem("adminJwt", res?.data?.token);
      await localStorage.setItem("role", "admin");
      navigate("/");
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message;
      setError(message ?? "Something gone wrong");
      setTimeout(() => setError(""), 2000);
    }
    setLoading(false);
  };
  return (
    <div>
      <Form
        title={"Admin Login"}
        firstField={"Email address"}
        secondField={"Password"}
        button={"Sign in"}
        setFirstField={(data) => setEmail(data)}
        setSecondField={(data) => setPassword(data)}
        error={error}
        submitData={(role) => submitData(role)}
        loading={loading}
      />
    </div>
  );
}
