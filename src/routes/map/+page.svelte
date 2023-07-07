<script lang="ts">

  import { afterUpdate, onMount } from "svelte";
  import * as topojson from "topojson-client";
  import { geoPath, geoAlbersUsa, geoMercator } from "d3-geo";
  import { draw, fade } from "svelte/transition";
  import { csv, scaleLinear, scaleOrdinal } from "d3";
  import myanmarGeoJson from "./myanmar.json";
  import populationGeoJson from "./citiestownpopulation2013.json";

  let width = 600;
  let height = 610;
  let mapBBox : any;
  const projection = geoMercator().center([96, 21]).scale(1200).fitSize([width, height], topojson.feature(
      myanmarGeoJson,
      myanmarGeoJson.objects.myanmar
    ));

  const path = geoPath(projection);

  let data: any[] = [];
  let populationData: any[] = [];

  let selected: any;
  //$: console.log({ selected })

  
//   const points = [{ lat: 38.421115245736, long: -82.44432596047203 }].map((p) =>
//     projection([p.long, p.lat])
//   );

  onMount(async () => {
    data = topojson.feature(
      myanmarGeoJson,
      myanmarGeoJson.objects.myanmar
    ).features;

    populationData = topojson.feature(
      populationGeoJson,
      populationGeoJson.objects.citiestownpopulation2013
    ).features;

    console.log(populationData[0]);
    
  });

  let defaultWidth = 600;
  $: pathScale = scaleLinear().domain([0, width]).range([0, width]);
  $: scale = pathScale(width) / defaultWidth;

  $: colorScale = scaleOrdinal<string>()
    //@ts-ignore
    .domain(data.map((d) => d))
    .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

$: center = width - mapBBox?.getBBox().width / 2 || 0;
    

</script>

<div
  class="w-full max-w-[600px] my-0 mx-auto bg-white shadow-lg"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg {height} {width}>
    <!-- State shapes -->
    <g fill="white" stroke="black" bind:this={mapBBox} >
      {#each data as feature, i}
        <path
          d={path(feature)}
          on:click={() => (selected = feature)}
          class="state"
          in:draw={{ delay: i * 50, duration: 1000 }}
          transform="scale({scale})"
          fill={colorScale(feature)}
          opacity={selected ? 0.5 : 1}
        />
      {/each}
    </g>

    <!-- Interior lines -->
    <!-- 	<path d={path(mesh)} fill="none" stroke="black" /> -->

    {#if selected}
      <path
        d={path(selected)}
        stroke="black"
        stroke-width={2}
        transform="scale({scale})"
        fill={colorScale(selected)}
      />
    {/if}

    {#each populationData as population}
      <!-- <circle r={5} fill="white" transform="translate({projection(population.geometry.coordinates)})"/> -->
      <text
      x={projection(population?.geometry?.coordinates)[0]}
      y={projection(population?.geometry?.coordinates)[1]}
      text-anchor="middle"
      alignment-baseline="middle"
      font-size="10"
    >
      &#x1F4CD;
    </text>
    {/each}

    <text class="selectedName" x={width / 2} y={40}>{selected?.properties.name ?? ""}</text>
  </svg>

</div>

<style>
  .selectedName {
    text-align: center;
    margin-top: 8px;
    font-size: 1.5rem;
  }
</style>
