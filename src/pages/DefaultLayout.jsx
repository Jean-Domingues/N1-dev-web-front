import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Outlet, Link, Navigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/manageCookies";

export function DefaultLayout() {
  const userToken = getCookie("userToken");

  if (!userToken) {
    return <Navigate to="/" />;
  }

  function handleLogout() {
    deleteCookie("userToken");
  }

  return (
    <div>
      <Card className="h-[100vh] w-full max-w-[15rem] rounded-none bg-[#696D7D] fixed">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Typography variant="h5" color="white">
            Menu
          </Typography>
        </div>
        <List className="text-white w-full">
          <Link to="/admin">
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <Link to="/admin/movies">
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Filmes
            </ListItem>
          </Link>
          <Link to="/admin/rentals">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Aluguéis
            </ListItem>
          </Link>
          <Link to="/admin/clients">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Clientes
            </ListItem>
          </Link>
          <Link to="/admin/employee">
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Adicionar Funcionário
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sair
            </ListItem>
          </Link>
        </List>
      </Card>
      <div className="bg-[#F9F3F3] flex-1 ml-[15rem] min-h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
}
