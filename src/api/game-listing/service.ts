import { processResponse } from "../helpers/process-response";
import { GAME_LISTING_API_URL } from "./const";
import { GameListing } from "./model";

export function getAllGames(): Promise<GameListing[]> {
  return fetch(`${GAME_LISTING_API_URL}/game-listings`).then(processResponse);
}

export function createGame(game: GameListing): Promise<GameListing> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  };
  return fetch(`${GAME_LISTING_API_URL}/game-listings`, requestOptions).then(
    processResponse
  );
}
