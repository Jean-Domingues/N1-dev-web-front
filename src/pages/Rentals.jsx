import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AddClientModal } from "../components/Modals/AddClientModal";
import { getCookie } from "../utils/manageCookies";
import { instance } from "../Config/axios";
import { AddNewRental } from "../components/Modals/AddNewRental";

const TABLE_HEAD = [
  "Filme",
  "Cliente",
  "Vencimento",
  "Quantidade",
  "Criado Em",
];

const TABLE_ROWS = [
  {
    id: 1,
    quantity: 2,
    movie: {
      id: 2,
      title: "Matrix",
    },
    customer: {
      id: 1,
      firstName: "Gabriel",
      lastName: "Nori",
    },
    dueDate: "2023-12-29",
    createdAt: "2023-11-29T16:10:25.728636",
  },
  {
    id: 1,
    quantity: 2,
    movie: {
      id: 2,
      title: "Matrix",
    },
    customer: {
      id: 1,
      firstName: "Gabriel",
      lastName: "Nori",
    },
    dueDate: "2023-12-29",
    createdAt: "2023-11-29T16:10:25.728636",
  },
];

export function Rentals() {
  const userToken = getCookie("userToken");

  const [addRentalOpen, setAddRentalOpen] = useState(false);
  const [clientRentals, setClientRentals] = useState(null);

  const handleAddRentalsOpen = () => {
    setAddRentalOpen(!addRentalOpen);
  };

  async function getRentals() {
    try {
      const result = await instance.get("/rentals", {
        headers: {
          Authorization: userToken,
        },
      });

      setClientRentals(result.data);
    } catch (error) {
      alert("Erro ao buscar aluguéis");
    }
  }

  const addNewRental = async (values) => {
    try {
      await instance.post(
        `rentals`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
  
      alert("Alguel cadastrado!");
      getRentals();
      handleAddRentalsOpen();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getRentals();
  }, []);

  function formatData(date) {
    const data = new Date(date);

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Os meses começam do zero
    const dia = data.getDate().toString().padStart(2, "0");

    return `${ano}/${mes}/${dia}`;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleAddRentalsOpen}
        className="fixed right-20 bottom-10 bg-green-500 z-50 text-white p-3 rounded-md hover:bg-green-700"
      >
        Novo Aluguel
      </button>

      <AddNewRental
        open={addRentalOpen}
        handleOpen={handleAddRentalsOpen}
        handleConfirm={addNewRental}
      />

      <div className="py-5 px-20 h-[80%] w-[80%] bg-[#fefefe] rounded-lg">
        <Typography variant="h1" className="mb-12">
          Aluguéis
        </Typography>
        <Card className="w-full max-h-[80%] overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientRentals?.map(
                ({ customer, movie, quantity, dueDate, createdAt, id }) => (
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {movie.title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {customer.firstName + " " + customer.lastName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatData(dueDate)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-center"
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {formatData(createdAt)}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
