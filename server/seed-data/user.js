const bcrypt = require("bcryptjs");

module.exports = [
  {
    id: 1,
    first_name: "Mieko",
    last_name: "Tominaga",
    email: "mieko_t@gmail.com",
    password: bcrypt.hashSync("123abc"),
  },
  {
    id: 2,
    first_name: "Miriam",
    last_name: "Alyeshmerni",
    email: "miriam_a@gmail.com",
    password: bcrypt.hashSync("123abc"),
  },
  {
    id: 3,
    first_name: "Christine",
    last_name: "Sawyer",
    email: "christine_s@gmail.com",
    password: bcrypt.hashSync("123abc"),
  },
];
