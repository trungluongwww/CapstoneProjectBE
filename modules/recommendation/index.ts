import { IRoomRecommendData } from "../../internal/interfaces/recommandation";
import helper from "./helper";

class KNN {
  k: number;
  data: Array<IRoomRecommendData>;

  constructor(k: number = 10, data: Array<IRoomRecommendData>) {
    this.k = k;
    this.data = data;
  }

  calculateDistance(room1: IRoomRecommendData, room2: IRoomRecommendData): number {
    const typeDiff = room1.type - room2.type;
    const priceDiff = room1.price - room2.price;
    const provinceDiff = room1.province - room2.province;
    const squareMeterDiff = room1.squareMeter - room2.squareMeter;

    const sum = typeDiff + priceDiff + provinceDiff + squareMeterDiff;

    const distance = Math.sqrt(typeDiff ** 2 + priceDiff ** 2 + provinceDiff ** 2 + squareMeterDiff ** 2);

    return distance;
  }

  calculateAverageDistance(room: IRoomRecommendData, rooms: IRoomRecommendData[]): number {
    let totalDistance = 0;

    for (const otherRoom of rooms) {
      const distance = this.calculateDistance(room, otherRoom);
      totalDistance += distance;
    }

    const averageDistance = totalDistance / rooms.length;
    return averageDistance;
  }

  predict(selectedRooms: Array<IRoomRecommendData>): Array<string> {
    const nearestNeighbors = this.data
      .map((dataPoint) => ({
        dataPoint,
        distance: this.calculateAverageDistance(dataPoint, selectedRooms),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, this.k);

    return nearestNeighbors.map((e) => e.dataPoint.id);
  }
}

let instance: KNN;

const init = async () => {
  const data = await helper.roomData();
  instance = new KNN(15, data);
};

const testInstance = () => {
  console.log(instance.data);
};

const getRecommend = (rooms: Array<IRoomRecommendData>): Array<string> => {
  console.log(rooms);
  return instance.predict(rooms);
};

export default {
  init,
  getRecommend,
  helper,
  testInstance,
};
