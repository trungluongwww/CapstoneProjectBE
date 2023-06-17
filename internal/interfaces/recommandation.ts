interface IRoomRecommendData {
  id: string;
  type: number;
  price: number;
  province: number;

  squareMeter: number;
}

interface IRoomRecommendDataNormalization {
  id: string;
  type: number;
  price: number;
  province: number;
}

interface IRoomSupportRecommend {
  id: string;
  type: string;
  price: number;
  provinceCode: number;
  squareMeter: number;
}

export { IRoomRecommendData, IRoomSupportRecommend };
