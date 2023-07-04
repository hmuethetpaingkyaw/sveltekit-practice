<script lang="ts">
    //@ts-ignore
  import * as d3 from "d3";
  import { data } from "./data";
//   import { onMount } from "svelte";

  let width = 800;
  let height = 600;

  const margin = { top: 20, right: 20, bottom: 20, left: 180 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [min, max] = d3.extent(data.map((d) => d.value));
  $: xScale = d3
    .scaleLinear()
    .domain([0, max || 10])
    .range([0, innerWidth]);

  const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
  $: yScale = d3
    .scaleBand()
    .domain(groups)
    .range([0, innerHeight])
    .padding(0.01);

//   let axiesRef: any;

  //   onMount(() => {
  //     const svgElement = d3.select(axiesRef.current);

  //     const xAxisGenerator = d3.axisBottom(xScale);

  //     svgElement
  //       .append("g")
  //       .attr("transform", "translate(0," + ( innerHeight) + ")")
  //       .call(xAxisGenerator);

  //     const yAxisGenerator = d3.axisLeft(yScale);
  //     svgElement.append("g").call(yAxisGenerator);
  //   });
</script>

<div class="flex items-center justify-center h-full bg-white">
  <svg {width} {height}>
    <g
      width={innerWidth}
      height={innerHeight}
      transform={`translate(${margin.left},${margin.top})`}
    >
      {#each data as d (d.name)}
        <text
          text-anchor="end"
          x="-3"
          dy=".3em"
          y={yScale(d.name) + yScale.bandwidth() / 2}
          fill="black"
        >
          {d.name}
        </text>
        <rect
          x={xScale(0)}
          y={yScale(d.name)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          opacity={0.7}
          stroke="#9d174d"
          fill="#9d174d"
          fill-opacity={0.5}
          rx={1}
        />
      {/each}
      <!-- <g 
      width={ innerWidth} height={ innerHeight}
      transform={`translate(${[innerWidth, innerHeight].join(",")})`}
      bind:this={axiesRef} /> -->
      {#each xScale.ticks() as tickValue}
        <g transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerHeight} stroke="black" />
          <text text-anchor="middle" dy=".7em" y={innerHeight + 3}>
            {tickValue}
          </text>
        </g>
      {/each}
    </g>
  </svg>
</div>
