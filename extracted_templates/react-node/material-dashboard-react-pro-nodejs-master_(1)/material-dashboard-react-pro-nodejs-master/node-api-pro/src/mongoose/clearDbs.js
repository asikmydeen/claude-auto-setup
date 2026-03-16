import mongoose from "mongoose";
import { dbConnect } from "./index.js";

import { userModel } from "../schemas/user.schema.js";
import { roleModel } from "../schemas/role.schema.js";
import { permissionModel } from "../schemas/permission.schema.js";
import { tagModel } from "../schemas/tag.schema.js";
import { categoryModel } from "../schemas/category.schema.js";
import { itemModel } from "../schemas/item.schema.js";

async function clear() {
  dbConnect();
  await roleModel.deleteMany({});
  await permissionModel.deleteMany({});
  await userModel.deleteMany({});
  await tagModel.deleteMany({});
  await categoryModel.deleteMany({});
  await itemModel.deleteMany({});
  console.log("DB cleared");
}

clear().then(() => {
  mongoose.connection.close();
});
