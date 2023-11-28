import {
  Button,
  Typography,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";

export function EditInventoryModal({ open, handleConfirm, handleOpen, selectedFilm }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Adicionar Filme</DialogHeader>
      <DialogBody>
        <div className="flex flex-col px-5 gap-5 items-start">
          <Typography variant="h4">{selectedFilm?.title}</Typography>
          <div className="w-72">
            <Input label="quantidade" />
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
        <Button variant="gradient" color="green" onClick={handleConfirm}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
