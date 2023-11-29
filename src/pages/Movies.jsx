import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AddFilmModal } from "../components/Modals/AddFilmModal";
import { EditInventoryModal } from "../components/Modals/EditInventoryModal";
import { getCookie } from "../utils/manageCookies";
import { instance } from "../Config/axios";

export function Movies() {
  const userToken = getCookie("userToken");

  const [inventaryOpen, setInventaryOpen] = useState(false);
  const [addFilmOpen, setAddFilmOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [catalogMovies, setCatalogMovies] = useState(null);

  const handleInventaryOpen = (film) => {
    setInventaryOpen(!inventaryOpen);
    setSelectedFilm(film);
  };

  const alterInventary = async (quantity) => {
    const filmId = selectedFilm?.id;
    await instance.patch(
      `movies/${filmId}/inventories`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );

    alert("Inventário alterado!");
    setInventaryOpen(!inventaryOpen);
  };

  const handleAddFilmOpen = () => {
    setAddFilmOpen(!addFilmOpen);
  };

  const addNewFilm = async (values) => {
    console.log('VALORES', values);

    const quantity = values.quantity;
    delete values.quantity;

    const result = await instance.post(
      "movies",
      { ...values },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );

    await instance.post(
      `movies/${result.data.id}/inventories`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );

    await getMovies();
    setAddFilmOpen(!addFilmOpen);
  };

  async function getMovies() {
    try {
      const result = await instance.get("/movies", {
        headers: {
          Authorization: userToken,
        },
      });

      setCatalogMovies(result.data);
    } catch (error) {
      alert("Erro ao buscar filmes");
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

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

      {catalogMovies?.map((item) => (
        <Card className="mt-6 w-96" key={item.id}>
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
