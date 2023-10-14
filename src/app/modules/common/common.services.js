import { SystemConfig } from "../admin/admin.model.js";

const getSystemConfig = async () => {
  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

export const CommonService = {
  getSystemConfig,
};
