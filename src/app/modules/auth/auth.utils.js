import Admin from "../admin/admin.model.js";
import User from "../user/user.model.js";

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}).sort({ createdAt: -1 }).lean();
  return lastUser?.userId ? lastUser.userId.substring(4) : undefined;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, "0");
  incrementedId = `${new Date().getFullYear()}${incrementedId}`;

  return incrementedId;
};

export const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne({}).sort({ createdAt: -1 }).lean();
  return lastAdmin?.userId ? lastAdmin.userId.substring(6) : undefined;
};

export const generateAdminId = async () => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, "0");
  
  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, "0");
  incrementedId = `A-${new Date().getFullYear()}${incrementedId}`;

  return incrementedId;
};
