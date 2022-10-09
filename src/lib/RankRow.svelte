<script lang="ts">
  import type { Rank } from "../model/Rank";
  import {
    updateRankOrder,
    updateRankDetails,
    deleteRank,
  } from "../store/updateRank";
  import { dndzone } from "svelte-dnd-action";
  import RankRowItem from "./RankRowItem.svelte";
  import Arrows from "svelte-icons/fa/FaArrowsAlt.svelte";
  import Close from "svelte-icons/md/MdClose.svelte";
  import Pencil from "svelte-icons/fa/FaPencilAlt.svelte";
  import Save from "svelte-icons/md/MdSave.svelte";
  import Delete from "svelte-icons/md/MdDelete.svelte";

  export let rank: Rank;
  export let color: string;
  export let dragDisabled: boolean = true;
  export let startDrag: (e: MouseEvent) => void;

  let edit = false;
  let hover = false;
  let editName = "";
  let editColor = "";

  let handleSort = (e: CustomEvent<DndEvent<Rank>>) => {
    updateRankOrder(rank.id, e.detail.items);
  };

  let clickEdit = () => {
    edit = true;
    editName = rank.name;
    editColor = rank.color;
  };

  let clickCancelEdit = () => {
    edit = false;
    editName = "";
    editColor = "";
  };

  let clickSave = () => {
    updateRankDetails(rank.id, editName, editColor);
    editName = "";
    editColor = "";
    edit = false;
  };

  let clickDelete = () => {
    deleteRank(rank.id);
  };
</script>

<div
  class="flex mt-5 rounded-lg min-h-[208px]"
  style="background-color: {rank.bgColor ? rank.bgColor : 'white'};"
  on:focus={() => {}}
  on:blur={() => {}}
  on:mouseover={() => {
    hover = true;
  }}
  on:mouseout={() => {
    hover = false;
  }}
>
  <div
    class="flex w-48 min-w-[12rem] h-auto items-center justify-center rounded-l-lg relative"
    style="background-color: {rank.color ? rank.color : color};"
  >
    {#if edit}
      <div
        class="absolute top-1 right-6 h-4 w-4 cursor-pointer"
        on:click={clickSave}
      >
        <Save />
      </div>
      <div
        class="absolute top-1 right-1 h-4 w-4 cursor-pointer"
        on:click={clickCancelEdit}
      >
        <Close />
      </div>
      <div
        class="absolute bottom-1 right-1 h-4 w-4 cursor-pointer"
        on:click={clickDelete}
      >
        <Delete />
      </div>
      <div class="text-center w-max">
        <div class="ml-[10%] mr-[10%]">
          <label
            class="text-gray-700 text-sm font-bold mb-2 float-left"
            for="rankLabel"
          >
            Rank Label
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rankLabel"
            bind:value={editName}
          />
        </div>
      </div>
    {:else}
      <div
        class="absolute top-1 right-6 h-4 w-4 cursor-pointer {hover
          ? ''
          : 'hidden'}"
        on:click={clickEdit}
      >
        <Pencil />
      </div>
      <div
        class="absolute top-1 right-1 h-4 w-4 {hover ? '' : 'hidden'}"
        tabindex={dragDisabled ? 0 : -1}
        style={dragDisabled ? "cursor: grab" : "cursor: grabbing"}
        on:mousedown={startDrag}
      >
        <Arrows />
      </div>
      <div class="text-center">{rank.name}</div>
    {/if}
  </div>

  <div
    use:dndzone={{
      items: rank.rankItems,
      type: "rankItem",
      dropTargetStyle: {},
    }}
    on:consider={handleSort}
    on:finalize={handleSort}
    class="flex flex-wrap flex-row p-1 flex-grow"
  >
    {#each rank.rankItems as rankItem (rankItem.id)}
      <RankRowItem {rankItem} />
    {/each}
  </div>
</div>

<style>
</style>
