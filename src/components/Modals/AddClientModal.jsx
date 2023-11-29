import {
  Card,
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { Formik, ErrorMessage } from "formik";

import * as Yup from "yup";

const formValidation = Yup.object().shape({
  firstName: Yup.string().required('O campo  "Nome" é obrigatório'),
  lastName: Yup.string().required('O campo "Sobreome" é obrigatório'),
  email: Yup.string()
    .email("Insira um endereço de e-mail válido")
    .required('O campo "E-mail" é obrigatório'),
  phone: Yup.string().required('O campo "Telefone" é obrigatório'),
});

export function AddClientModal({ open, handleConfirm, handleOpen }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Adicionar Cliente</DialogHeader>
      <DialogBody>
        <Card color="transparent" shadow={false} className="px-10">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            }}
            validationSchema={formValidation}
            onSubmit={(values) => {
              handleConfirm(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Nome
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="nome"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Sobrenome
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="sobrenome"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="email"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Telefone
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="telefone"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <ErrorMessage
                    name="phone"
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
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button variant="outlined" onClick={handleOpen} className="mr-1">
          <span>Fechar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
