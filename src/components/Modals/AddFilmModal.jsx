import {
  Card,
  Checkbox,
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik } from "formik";

export function AddFilmModal({ open, handleConfirm, handleOpen }) {

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Adicionar Filme</DialogHeader>
      <DialogBody className="overflow-y-auto h-96">
        <Card color="transparent" shadow={false} className="px-10">
          <Formik
            initialValues={{
              title: "",
              description: "",
              categoryId: "",
              imageLink: "",
              quantity: 1
            }}
            onSubmit={(values) => {
              values.genre = "genre";
              values.ageRating = "16";
              values.director = "none";

              handleConfirm(values);
              alert("Filme adicionado!");
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Título
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="título"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Descrição
                  </Typography>
                  <Textarea
                    placeholder="descrição"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Categoria
                  </Typography>
                  <Select
                    label="Selecione uma categoria"
                    name="categoryId"
                    onChange={(event) => setFieldValue('categoryId', event)}
                    onBlur={handleBlur}
                    value={values.categoryId}
                  >
                    <Option value="1">Comédia</Option>
                    <Option value="2">Terror</Option>
                    <Option value="3">Drama</Option>
                    <Option value="4">Documentário</Option>
                    <Option value="5">Romance</Option>
                    <Option value="6">Ação</Option>
                    <Option value="7">Suspense</Option>
                  </Select>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Link para imagem
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="link"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="imageLink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imageLink}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Quantidade no estoque
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
