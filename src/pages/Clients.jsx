import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AddClientModal } from "../components/Modals/AddClientModal";
import { getCookie } from "../utils/manageCookies";
import { instance } from "../Config/axios";

const TABLE_HEAD = ["Nome", "Email", "Telefone", "Criado em"];

const TABLE_ROWS = [
  {
    id: 1,
    firstName: "Norinho",
    lastName: "Mil grau",
    phone: "(16) 99996-8091",
    email: "email@gmail.com",
    createdAt: "2023-11-28T23:32:08.616525",
    updatedAt: "2023-11-28T23:32:08.616539",
  },
  {
    id: 1,
    firstName: "Norinho",
    lastName: "Mil grau",
    phone: "(16) 99996-8091",
    email: "email@gmail.com",
    createdAt: "2023-11-28T23:32:08.616525",
    updatedAt: "2023-11-28T23:32:08.616539",
  },
  {
    id: 1,
    firstName: "Norinho",
    lastName: "Mil grau",
    phone: "(16) 99996-8091",
    email: "email@gmail.com",
    createdAt: "2023-11-28T23:32:08.616525",
    updatedAt: "2023-11-28T23:32:08.616539",
  },
  {
    id: 1,
    firstName: "Norinho",
    lastName: "Mil grau",
    phone: "(16) 99996-8091",
    email: "email@gmail.com",
    createdAt: "2023-11-28T23:32:08.616525",
    updatedAt: "2023-11-28T23:32:08.616539",
  },
  {
    id: 1,
    firstName: "Norinho",
    lastName: "Mil grau",
    phone: "(16) 99996-8091",
    email: "email@gmail.com",
    createdAt: "2023-11-28T23:32:08.616525",
    updatedAt: "2023-11-28T23:32:08.616539",
  },
];

export function Clients() {
  const userToken = getCookie("userToken");

  const [clientAddOpen, setClientAddOpen] = useState(false);
  const [clients, setClients] = useState(null);

  const handleClientAddOpen = () => {
    setClientAddOpen(!clientAddOpen);
  };

  async function getClients() {
    try {
      const result = await instance.get("/customers", {
        headers: {
          Authorization: userToken,
        },
      });

      setClients(result.data);
    } catch (error) {
      alert("Erro ao buscar clientes");
    }
  }

  const addNewClient = async (values) => {
    await instance.post(
      `customers`,
      {
        ...values,
      },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );

    alert("Cliente cadastrado!");
    getClients();
    handleClientAddOpen();
  };

  useEffect(() => {
    getClients();
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
        onClick={handleClientAddOpen}
        className="fixed right-20 bottom-10 bg-green-500 z-50 text-white p-3 rounded-md hover:bg-green-700"
      >
        Adicionar cliente
      </button>

      <AddClientModal
        open={clientAddOpen}
        handleOpen={handleClientAddOpen}
        handleConfirm={addNewClient}
      />

      <div className="py-5 px-20 h-[80%] w-[80%] bg-[#fefefe] rounded-lg">
        <Typography variant="h1" className="mb-12">
          Clientes
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
              {clients?.map(
                ({ firstName, lastName, email, phone, createdAt }, index) => (
                  <tr key={firstName} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {firstName + " " + lastName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone}
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
