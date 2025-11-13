export enum FRUIT_TYPES {
  APPLE = "apple",
  BANANA = "banana",
  ORANGE = "orange",
  STRAWBERRY = "strawberry",
  WATERMELON = "watermelon",
  BOMB = "bomb",
}

export enum FRUIT_SCORES {
  APPLE = 10,
  BANANA = 10,
  ORANGE = 10,
  STRAWBERRY = 10,
  WATERMELON = 10,
  BOMB = -20,
}

export type Fruit = {
  id: string;
  x: number; // position x
  y: number; // position y
  vx: number; // velocity x
  vy: number; // velocity y
  r: number; // radius
  sliced?: boolean; // whether the fruit is sliced
  type: FRUIT_TYPES;
};

export type HistoryEntry = {
  timestamp: number;
  score: number;
};
