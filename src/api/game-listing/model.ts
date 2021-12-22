export interface GameImage {
  id: string;
  url: string;
  type: number;
  description: string;
}

export interface GameListing {
  id?: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  images: GameImage[];
  type: GameTypes;
  tags: string[];
  author: string;
  replayBundleUrlJson?: string;
  duration?: number;
  isDownloadable?: boolean;
  isStreamable?: boolean;
  version?: string;
}
export enum GameTypes {
  FPS = 1,
  RPG = 2,
  PLATFORM = 3,
  SIMULATION = 4,
}
