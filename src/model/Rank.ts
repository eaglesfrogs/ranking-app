import type { RankItem } from "./RankItem";
import { v4 as uuidv4 } from "uuid";

export class Rank {
  id: string;
  name: string;
  rankItems: Array<RankItem> = [];
  color: string;
  bgColor: string;

  constructor(name: string, rankItems: Array<RankItem>) {
    this.id = uuidv4();
    this.name = name;
    this.rankItems = rankItems;
  }
}
