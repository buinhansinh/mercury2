const db = require("../connection");
const q = require("../query");
const logger = require("../../log");
const Permission = require("../../enum/permission");

module.exports = async () => {
  const admin = {
    name: "admin",
    display_name: "Administrator",
    password: "admin"
  };

  return await db.tx(async t => {
    // insert enums into tables
    Permission.enums.map(e => q(t).permission.insert(e.value, e.key));

    // insert default admin user
    const adminUserId = (await q(t).user.insert(admin)).id;

    // insert default admin group
    const adminGroupId = (await q(t).group.insert({
      name: "Admin"
    })).id;

    // grant all permissions to admin group
    Permission.enums.map(e => q(t).group.addPermission(adminGroupId, e.value));

    // add admin user to admin group
    return await q(t).group.addUser(adminGroupId, adminUserId);
  });
};
