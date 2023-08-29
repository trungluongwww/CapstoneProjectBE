import services from "../../server_app/services";

const init = async () => {
  await services.cronjob.refreshRecommendation();
};

export default {
  init,
};
