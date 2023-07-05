<script lang="ts">
  import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";

  const points = [
    { year: 1990, birthrate: 16.7 },
    { year: 1995, birthrate: 14.6 },
    { year: 2000, birthrate: 14.4 },
    { year: 2005, birthrate: 14 },
    { year: 2010, birthrate: 13 },
    { year: 2015, birthrate: 12.4 },
  ];

  const yTicks = [1990, 1995, 2000, 2005, 2010, 2015];
  const xTicks = [0, 5, 10, 15, 20];
  const padding = { top: 20, right: 15, bottom: 20, left:50 };

  let width = 500;
  let height = 200;

  function formatMobile(tick: any) {
    return "'" + tick.toString().slice(-2);
  }
  const BAR_PADDING = 0.3;
  $: yScale = 
  //scaleLinear()
  //@ts-ignore
    //.domain([0, yTicks.length])
    scaleBand()
    //@ts-ignore
    .domain(yTicks)
    .range([padding.bottom, height - padding.bottom, padding.top])
    .padding(BAR_PADDING);

  $: xScale = scaleLinear()
    .domain([0, Math.max.apply(null, xTicks)])
    .range([padding.left, width - padding.right]);

  $: colorScale = 
    scaleOrdinal<string>()
       //@ts-ignore
    .domain(yTicks)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"]);

  $: innerHeight = height - (padding.top + padding.bottom);
  $: barWidth = innerHeight / yTicks.length;

</script>

<h2 class="text-center">US birthrate by year</h2>

<div
  class="w-full max-w-[500px] my-0 mx-auto"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg {height} width="100%">
    <!-- x axis -->
    <g class="axis x-axis">
      {#each xTicks as tick}
        <g class="tick tick-{tick}" transform="translate({xScale(tick)}, {height})">
          <!-- <line x2="100%" stroke="#e2e2e2" stroke-dasharray={2} /> -->
          <text y="-4" fill="#ccc" text-anchor="start"
            >{tick} </text
          >
        </g>
      {/each}
    </g>

    <!-- y axis -->
    <g class="axis y-axis">
      {#each points as point, i}
        <g class="tick" >
          <text x={barWidth / 2} text-anchor="middle"  y={yScale(point.year) + yScale.bandwidth() / 2}
            >{width > 380 ? point.year : formatMobile(point.year)}</text
          >
        </g>
      {/each}
    </g>

    <g class="bars">
      {#each points as point, i}
        <rect
          fill={colorScale(`${i}`)}
          stroke="none"
          opacity={0.65}
          x={padding.left}
          y={yScale(point.year)}
          height={yScale.bandwidth()}
          width={xScale(point.birthrate)}
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .tick {
    font-family: Helvetica, Arial;
    font-size: 0.725em;
    font-weight: 200;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }

</style>
