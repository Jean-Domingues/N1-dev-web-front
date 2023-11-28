import React from "react";

import { addBasicAuth } from "../Config/axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de e-mail inválido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

const Login = () => {
  async function fetchData(email, senha) {
    // Exemplo de uso da função helper
    const authenticatedInstance = addBasicAuth(email, senha);

    // Agora você pode usar a instância autenticada para fazer requisições
    authenticatedInstance.get('/categories')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
  }

  const handleSubmit = async (values) => {
    console.log("Formulário enviado:", values);
    await fetchData(values.email, values.senha);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9F3F3]">
      <div className="bg-white p-8 rounded shadow-md w-96 bg-[#696D7D]">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-sm font-semibold mb-2"
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
                className="block text-white text-sm font-semibold mb-2"
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
