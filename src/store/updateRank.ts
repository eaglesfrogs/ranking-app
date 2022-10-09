import type { Rank } from "src/model/Rank";
import type { RankItem } from "src/model/RankItem";
import { ranks } from "./store";

export const updateRankOrder = (rankId: string, rankItems: Array<RankItem>) => {
  ranks.update((r: Array<Rank>) => {
    let copy = [...r];

    copy.forEach((element) => {
      if (element.id == rankId) {
        element.rankItems = rankItems;
      }
    });

    return copy;
  });
};

export const updateRankDetails = (
  rankId: string,
  updatedName: string,
  updatedColor: string
) => {
  ranks.update((r: Array<Rank>) => {
    let copy = [...r];

    copy.forEach((element) => {
      if (element.id == rankId) {
        element.name = updatedName;
        element.color = updatedColor;
      }
    });

    return copy;
  });
};

export const addRank = (newRank: Rank) => {
  ranks.update((r: Array<Rank>) => [newRank, ...r]);
};

export const deleteRank = (rankId: string) => {
  ranks.update((r: Array<Rank>) => {
    let copy = [...r];

    copy.forEach((element, i) => {
      if (element.id == rankId) {
        copy.splice(i, 1);
      }
    });

    return copy;
  });
};
