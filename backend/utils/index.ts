import type { MatchDataResponse, TransformedMatchData } from '../types';

export const transformMatchDataResponse = (
  matchDataResponse: MatchDataResponse,
) => {
  const matchList = matchDataResponse.result;

  const transformedMatchData: TransformedMatchData[] = matchList.map(
    (match) => {
      const participants = match.match2opponents.map((opponent) => ({
        playerId: opponent.id,
        playerName: opponent.name,
        score: opponent.score,
        flag: opponent.match2players[0].flag,
        race: opponent.match2players[0].extradata.faction,
      }));
      const games = match.match2games
        .filter((game) => game.winner)
        .map((game) => ({
          gameNumber: game.match2gameid,
          map: game.map,
          winnerId: Number(game.winner),
          walkover: game.walkover,
        }));

      return {
        matchId: match.match2id,
        winnerId: Number(match.winner),
        walkover: match.walkover,
        stage: match.section,
        date: match.date,
        participants,
        games,
      };
    },
  );

  return transformedMatchData;
};
