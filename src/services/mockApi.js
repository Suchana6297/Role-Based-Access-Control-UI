import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";

// initialize axios mock adapter
const mock = new MockAdapter(axios, { delayResponse: 500 });

let users = [
  {
    id: uuidv4(),
    name: "Suchana",
    email: "suchana@gmail.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: uuidv4(),
    name: "Suprajit",
    email: "suprajit@gmail.com",
    role: "HR",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Pradip",
    email: "Pradip@gmail.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: uuidv4(),
    name: "Suchandra",
    email: "suchandra@gmail.com",
    role: "Backend Developer",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Srijon",
    email: "srijon@gmail.com",
    role: "Frontend Developer",
    status: "Inactive",
  },
  {
    id: uuidv4(),
    name: "Suman",
    email: "suman@gmail.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Soumen",
    email: "Soumen@gmail.com",
    role: "Tester",
    status: "Inactive",
  },
  {
    id: uuidv4(),
    name: "Bijaya",
    email: "bijaya@gmail.com",
    role: "Founder",
    status: "Active",
  },

];

let roles = [
  {
    id: "1",
    name: "Admin",
    permissions: ["Users:Read", "Users:Delete"],
  },
  { id: "2", name: "HR", permissions: ["Users:Read", "Users:Write", "Users:Delete"] },
  {
    id: "3",
    name: "Editor",
    permissions: ["Users:Read", "Users:Write", "Users:Delete"],
  },
  {
    id: "4",
    name: "Backend Developer",
    permissions: ["Users:Write", "Users:Read"],
  },
  {
    id: "5",
    name: "Frontend Developer",
    permissions: ["Users:Read", "Users:Delete"],
  },
  {
    id: "6",
    name: "Manager",
    permissions: ["Users:Read", "Users:Write", "Users:Delete"],
  },
  {
    id: "7",
    name: "Tester",
    permissions: ["Users:Read","User:Write", "Users:Delete"],
  },
  {
    id: "8",
    name: "HR",
    permissions: ["Users:Read","Users:Delete"],
  },
  {
    id: "9",
    name: "Founder",
    permissions: ["Users:Read", "Users:Write", "Users:Delete"],
  },
];

let permissions = [
  { id: "1", module: "Users", actions: ["Read", "Write", "Delete"] },
  { id: "2", module: "Orders", actions: ["Read", "Write", "Delete"] },
  { id: "3", module: "Products", actions: ["Read", "Write", "Delete"] },
  { id: "4", module: "Reports", actions: ["Read", "Write", "Delete"] },
];

//user endpoint
mock.onGet("/users").reply(200, users);

mock.onPost("/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = uuidv4();
  users.push(newUser);
  return [201, newUser];
});

mock.onPut(/\/users\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  const updatedUser = JSON.parse(config.data);
  users = users.map((user) => (user.id === id ? updatedUser : user));
  return [200, updatedUser];
});

mock.onDelete(/\/users\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  users = users.filter((user) => user.id !== id);
  return [204];
});

// roles endpoints
mock.onGet("/roles").reply(200, roles);

mock.onPost("/roles").reply((config) => {
  const newRole = JSON.parse(config.data);
  newRole.id = uuidv4();
  roles.push(newRole);
  return [201, newRole];
});

mock.onPut(/\/roles\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  const updatedRole = JSON.parse(config.data);
  roles = roles.map((role) => (role.id === id ? updatedRole : role));
  return [200, updatedRole];
});

mock.onDelete(/\/roles\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  roles = roles.filter((role) => role.id !== id);
  return [204];
});

//permission endpoint
mock.onGet("/permissions").reply(200, permissions);

export const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export default mock;
