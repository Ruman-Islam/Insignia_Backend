import cloudinary from "../../middleware/cloudinary.js";
import { SystemConfig } from "./admin.model.js";

const bannerImageUpload = async (payload) => {
  // const systemConfig = await SystemConfig.create({
  //   systemConfigId: "system_config",
  //   banner1: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   banner2: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   banner3: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  // });  // need to create first time

  const updatedImages = [];

  const isExist = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  for (const item of payload) {
    await cloudinary.v2.uploader.destroy(isExist[item.bannerId].cloudinaryId);
  }

  for (const item of payload) {
    const result = await SystemConfig.findOneAndUpdate({
      systemConfigId: "system_config",
      [item.bannerId]: {
        cloudinaryId: item.cloudinaryId,
        cloudinaryUrl: item.cloudinaryUrl,
      },
    });

    updatedImages.push(result);
  }

  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

const windowImageUpload = async (payload) => {
  // const systemConfig = await SystemConfig.findOneAndUpdate({
  //   systemConfigId: "system_config",
  //   window1: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window2: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window3: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window4: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  // });  // need to create first time

  const updatedImages = [];

  const isExist = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  for (const item of payload) {
    await cloudinary.v2.uploader.destroy(isExist[item.windowId].cloudinaryId);
  }

  for (const item of payload) {
    const result = await SystemConfig.findOneAndUpdate({
      systemConfigId: "system_config",
      [item.windowId]: {
        cloudinaryId: item.cloudinaryId,
        cloudinaryUrl: item.cloudinaryUrl,
      },
    });

    updatedImages.push(result);
  }

  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

const bannerTitleUpdate = async (payload) => {
  const updatedSystemConfig = await SystemConfig.findOneAndUpdate(
    {
      systemConfigId: "system_config",
    },
    { bannerTitle: payload },
    { new: true }
  );

  return updatedSystemConfig;
};

const getSystemConfig = async () => {
  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

export const AdminService = {
  bannerImageUpload,
  windowImageUpload,
  bannerTitleUpdate,
  getSystemConfig,
};
