<script lang="ts">
  import RankRow from "./lib/RankRow.svelte";
  import { Rank } from "./model/Rank";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { ranks, colorScheme } from "./store/store";
  import type chroma from "chroma-js";
  import Plus from "svelte-icons/md/MdAdd.svelte";
  import { addRank } from "./store/updateRank";

  let ranksValue: Array<Rank> = [];
  let colorSchemeValue: chroma.Scale<chroma.Color>;
  let colors: Array<string> = [];
  let dragDisabled = true;

  ranks.subscribe((value) => {
    ranksValue = value;
    colors = colorSchemeValue?.colors(ranksValue.length);
  });

  colorScheme.subscribe((value) => {
    colorSchemeValue = value;
    colors = colorSchemeValue?.colors(ranksValue.length);
  });

  let handleSort = (e: CustomEvent<DndEvent<Rank>>) => {
    ranks.update(() => e.detail.items);
  };

  let handleSortFinalize = (e: CustomEvent<DndEvent<Rank>>) => {
    ranks.update(() => e.detail.items);
    dragDisabled = true;
  };

  let startDrag = (e: MouseEvent) => {
    dragDisabled = false;
  };

  let addRow = () => {
    let newRank = new Rank("New Rank", []);
    addRank(newRank);
  };
</script>

<div>
  <main>
    <div class="text-white flex justify-end">
      <div class="h-8 w-8 cursor-pointer" on:click={addRow}>
        <Plus />
      </div>
    </div>
    <div
      use:dndzone={{
        items: ranksValue,
        type: "rank",
        dropTargetStyle: {},
        dragDisabled,
      }}
      on:consider={handleSort}
      on:finalize={handleSortFinalize}
    >
      {#each ranksValue as rank, i (rank.id)}
        <RankRow {rank} color={colors[i]} {startDrag} {dragDisabled} />
      {/each}
    </div>
  </main>
</div>

<style>
</style>
