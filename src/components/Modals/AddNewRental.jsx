import {
  Card,
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { instance } from "../../Config/axios";
import { getCookie } from "../../utils/manageCookies";

const modalValidation = Yup.object().shape({
  movieId: Yup.string().required("O campo de Filme é obrigatório"),
  customerId: Yup.string().required("O campo de Cliente é obrigatório"),
  dueDate: Yup.date()
    .nullable()
    .required("O campo de data é obrigatório")
    .min(new Date(), 'A data deve ser maior que o dia de hoje')
    .test(
      "is-valid-date",
      "A data deve ser inferior a 15 dias a partir de hoje",
      function (value) {

        if (!value) {
          return false;
        }
        const currentDate = new Date();
        const maxDate = new Date();
        maxDate.setDate(currentDate.getDate() + 15);

        return value < maxDate;
      }
    ),
  quantity: Yup.number()
    .min(1, "A quantidade deve ser no mínimo 1")
    .required('O campo "Quantidade" é obrigatório'),
});

export function AddNewRental({ open, handleConfirm, handleOpen }) {
  const userToken = getCookie("userToken");

  const [movies, setMovies] = useState([]);
  const [clients, setClients] = useState([]);

  async function getData() {
    try {
      const clientsData = await instance.get("/customers", {
        headers: {
          Authorization: userToken,
        },
      });

      const moviesData = await instance.get("/movies", {
        headers: {
          Authorization: userToken,
        },
      });

      setClients(clientsData.data);
      setMovies(moviesData.data);
    } catch (error) {
      alert("Erro ao buscar filmes e clientes");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Adicionar novo aluguel</DialogHeader>
      <DialogBody className="overflow-y-auto h-96">
        <Card color="transparent" shadow={false} className="px-10">
          <Formik
            initialValues={{
              movieId: "",
              customerId: "",
              dueDate: "",
              quantity: 1,
            }}
            validationSchema={modalValidation}
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
                    Filme a ser alugado
                  </Typography>
                  <Select
                    label="Selecione um flime"
                    name="movieId"
                    onChange={(event) => setFieldValue("movieId", event)}
                    onBlur={handleBlur}
                    value={values.movieId}
                  >
                    {movies?.map((item) => (
                      <Option value={item.id}>{item.title}</Option>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="movieId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Cliente
                  </Typography>
                  <Select
                    label="Selecione um cliente"
                    name="customerId"
                    onChange={(event) => setFieldValue("customerId", event)}
                    onBlur={handleBlur}
                    value={values.customerId}
                  >
                    {clients?.map((item) => (
                      <Option value={item.id}>
                        {item.firstName + " " + item.lastName}
                      </Option>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="customerId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Data para devolução
                  </Typography>
                  <Input
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="dueDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dueDate}
                    type="date"
                  />
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Quantidade
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="quantidade"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.quantity}
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit">
                  Alugar
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
