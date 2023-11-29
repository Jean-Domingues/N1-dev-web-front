import {
  Card,
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input
} from "@material-tailwind/react";
import { Formik } from "formik";

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
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
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
