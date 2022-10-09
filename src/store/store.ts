import { Rank } from "../model/Rank";
import { RankItem } from "../model/RankItem";
import { writable, type Writable } from "svelte/store";
import chroma from "chroma-js";

let defaultColorScheme = chroma.scale([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
]);
let ranksValue: Array<Rank> = [];
let tiers = ["S-Tier", "A-Tier", "B-Tier", "C-Tier", "D-Tier", "F-Tier"];

for (let i = 0; i < tiers.length; i++) {
  let rankItems: Array<RankItem> = [];

  for (let j = 0; j < Math.ceil(Math.random() * 10); j++) {
    rankItems.push(new RankItem(`${i}${j}`));
  }

  ranksValue.push(new Rank(tiers[i], rankItems));
}

export const ranks: Writable<Array<Rank>> = writable(ranksValue);
export const colorScheme: Writable<chroma.Scale<chroma.Color>> =
  writable(defaultColorScheme);
