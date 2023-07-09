import cron from "node-cron";
import recommendation from "../../../modules/recommendation";

const refreshRecommendation = async () => {
  cron.schedule("0 3 * * *", async () => {
    await recommendation.init();
    console.log("*** cronjob refresh model recommendation");
  });
};

export default {
  refreshRecommendation,
};
