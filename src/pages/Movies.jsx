import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { useState } from "react";
import { AddFilmModal } from "../components/Modals/AddFilmModal";
import { EditInventoryModal } from "../components/Modals/EditInventoryModal";

export function Movies() {
  const [inventaryOpen, setInventaryOpen] = useState(false);
  const [addFilmOpen, setAddFilmOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleInventaryOpen = (film) => {
    setInventaryOpen(!inventaryOpen);
    setSelectedFilm(film);
  };

  const alterInventary = (film) => {
    alert("Inventário Alterado!");
    setInventaryOpen(!inventaryOpen);
  };

  const handleAddFilmOpen = (film) => {
    setAddFilmOpen(!addFilmOpen);
  };

  const addNewFilm = (values) => {
    alert("Valores: ", values);
    setInventaryOpen(!inventaryOpen);
  };

  const movies = [
    {
      id: 1,
      category: {
        id: 2,
        name: "Ação",
      },
      title: "Os Vingadores - Ultimato",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos reprehenderit natus cumque qui odit",
      imageLink:
        "https://wp.ufpel.edu.br/empauta/files/2018/05/GuerraInfinitacartaz.jpg",
    },
    {
      id: 1,
      category: {
        id: 2,
        name: "Ação",
      },
      title: "Interstellar",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos reprehenderit natus cumque qui odit",
      imageLink:
        "https://m.media-amazon.com/images/I/91vIHsL-zjL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 1,
      category: {
        id: 2,
        name: "Comédia",
      },
      title: "Homem-Aranha 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos reprehenderit natus cumque qui odit",
      imageLink:
        "https://musicart.xboxlive.com/7/34fd4500-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 px-20 py-8">
      <button
        onClick={handleAddFilmOpen}
        className="fixed right-20 bottom-10 bg-green-500 z-50 text-white p-3 rounded-md hover:bg-green-700"
      >
        Adicionar filme +
      </button>

      <AddFilmModal
        open={addFilmOpen}
        handleOpen={handleAddFilmOpen}
        handleConfirm={addNewFilm}
      />

      <EditInventoryModal
        open={inventaryOpen}
        handleOpen={handleInventaryOpen}
        handleConfirm={alterInventary}
        selectedFilm={selectedFilm}
      />

      {movies.map((item) => (
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-80">
            <img src={item.imageLink} alt="card-image" className="max-h-fit" />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.title}
            </Typography>
            <Typography>{item.description}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={() => handleInventaryOpen(item)}>
              Inventário
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
