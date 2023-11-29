import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export function Employee() {
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
          <Input label="username" size="lg" />
          <Input label="senha" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
