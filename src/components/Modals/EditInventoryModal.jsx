import {
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { getCookie } from "../../utils/manageCookies";
import { useEffect, useState } from "react";
import { instance } from "../../Config/axios";

export function EditInventoryModal({
  open,
  handleConfirm,
  handleOpen,
  selectedFilm,
}) {
  const userToken = getCookie("userToken");
  const [inventary, setInventary] = useState("");
  const [quantity, setQuantity] = useState(0);

  async function getInventary() {
    try {
      if (!selectedFilm?.id) {
        return;
      }

      const filmId = selectedFilm?.id;
      const { data } = await instance.get(`/movies/${filmId}/inventories`, {
        headers: {
          Authorization: userToken,
        },
      });

      const myFilm = data.filter((item) => item.id === filmId)[0];
      setInventary(myFilm?.quantity);
      setQuantity(myFilm?.quantity);
    } catch (error) {
      alert("Erro ao buscar inventário");
    }
  }

  async function handleSubmit () {
    handleConfirm(quantity);
    setInventary(quantity);
    setQuantity(quantity);
  }

  useEffect(() => {
    getInventary();
  }, [selectedFilm]);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Adicionar Filme</DialogHeader>
      <DialogBody>
        <div className="flex flex-col px-5 gap-5 items-start">
          <Typography variant="h4">
            {selectedFilm?.title} : {inventary ?? 0}
          </Typography>
          <div className="w-72">
            <Input
              label="quantidade"
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
              name="quantity"
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSubmit}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
