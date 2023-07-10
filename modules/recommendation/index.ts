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
    if (room1.id === room2.id) {
      return 1;
    }
    const typeDiff = room1.type == room2.type ? 0 : 1;
    const priceDiff = room1.price - room2.price;
    const provinceDiff = room1.province == room2.province ? 0 : 1;
    const squareMeterDiff = room1.squareMeter - room2.squareMeter;

    const distance = Math.sqrt(
      (typeDiff * 0.15) ** 2 + (priceDiff * 0.2) ** 2 + (provinceDiff * 0.45) ** 2 + (squareMeterDiff * 0.2) ** 2
    );

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
  instance = new KNN(10, data);
  testInstance();
};

const getInstance = () => {
  return instance;
};

const testInstance = () => {
  console.log(`[Recommendation] size of model: ${JSON.stringify(getInstance()).length}`);
};

const getRecommend = (rooms: Array<IRoomRecommendData>): Array<string> => {
  return getInstance().predict(rooms);
};

export default {
  init,
  getRecommend,
  helper,
  testInstance,
};
