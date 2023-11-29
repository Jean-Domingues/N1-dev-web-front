import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { instance } from "../Config/axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCookie, setCookie } from "../utils/manageCookies";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de e-mail inválido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

const Login = () => {
  const navigate = useNavigate();
  const isAuth = getCookie("userToken");

  if (isAuth) {
    return <Navigate to="/admin" />;
  }

  async function fetchData(email, password) {
    const tokenUser = `Basic ${btoa(email + ":" + password)}`

    instance.get('/categories', {
      headers: {
        'Authorization': tokenUser
      }
    }).then(() => {
        setCookie("userToken", tokenUser);
        navigate("/admin");
      })
      .catch(() => {
        alert('Usuário não autorizado');
      });
  }

  const handleSubmit = async (values) => {
    await fetchData(values.email, values.password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9F3F3]">
      <div className="bg-white p-8 rounded shadow-md w-96 bg-[#696D7D]">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Digite seu email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Senha
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Digite sua senha"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2A2D34] text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Entrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
