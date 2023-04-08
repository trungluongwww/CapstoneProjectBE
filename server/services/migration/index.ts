import locations from "../../../external_node/data_crawl/locations";
import {District, Province, Ward} from "../../../modules/database/entities";
import dao from "../../dao";

const migrationLocations = async () => {
  let err: Error | null = null;

  err = await provinces();
  if (err) {
    return;
  }
  console.log("done provinces");
  err = await districts();
  if (err) {
    return;
  }
  console.log("done districts");

  err = await wards();
  if (err) {
    console.log(err);
    return;
  }
  console.log("done wardss");

  return;
};

const provinces = async (): Promise<Error | null> => {
  const provinces = locations.getLocationProvince();
  let model: Array<Province> = [];

  for (let pro of provinces) {
    let item = new Province();
    item.id = pro.id;
    item.name = pro.name;
    item.code = pro.code;
    item.updatedAt = pro.updatedAt;
    item.createdAt = pro.createdAt;

    model.push(item);
  }

  return await dao.location.create.manyProvinces(model);
};

const districts = async (): Promise<Error | null> => {
  const ds = locations.getLocationDistrict();
  let model: Array<District> = [];

  for (let d of ds) {
    let item = new District();
    item.id = d.id;
    item.name = d.name;
    item.code = d.code;
    item.provinceId = d.province_id;
    item.updatedAt = d.updatedAt;
    item.createdAt = d.createdAt;

    model.push(item);
  }

  return await dao.location.create.manyDistricts(model);
};

const wards = async (): Promise<Error | null> => {
  const ws = locations.getLocationWard();
  let model: Array<Ward> = [];
  let count = 0;
  let err: Error | null = null;

  for (let w of ws) {
    count = count + 1
    if (
        w.id &&
        w.name &&
        w.code &&
        w.districts_id &&
        w.createdAt &&
        w.updatedAt
    ) {
      let item = new Ward();
      item.id = w.id;
      item.name = w.name;
      item.code = w.code;
      item.districtId = w.districts_id;
      item.updatedAt = w.updatedAt;
      item.createdAt = w.createdAt;
      model.push(item);
    }

    if (count == 500) {
      err = await dao.location.create.manyWards(model);
      model = []
      count = 0
    }

    if (err) {
      return err
    }
  }

  if (count > 0) {
    err = await dao.location.create.manyWards(model)
  }

  return err
};

export default {
  migrationLocations,
};
