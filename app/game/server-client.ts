import { GameOption } from "./session-types";

export async function makeGameMatch(rules: GameOption[], userId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/matchmaking`,
      {
        method: "POST",
        body: JSON.stringify({
          rules,
          initiatingPlayer: userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
    const data = await (response.json() as Promise<{ gameId: string }>);
    return data.gameId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
