import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import * as Yup from "yup";

import { Formik, ErrorMessage } from "formik";
import { instance } from "../Config/axios";
import { getCookie } from "../utils/manageCookies";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("Formato de e-mail inválido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export function Employee() {
  const userToken = getCookie("userToken");

  async function createNewUser(values) {
    await instance.post(
      "employee",
      { ...values },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );

    alert("Usuário criado!");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[50%]">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Adicionar Novo Funcionário
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              createNewUser(values);
            }}
            validationSchema={LoginSchema}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Login
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="login"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Senha
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="senha"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit">
                  Criar
                </Button>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}
