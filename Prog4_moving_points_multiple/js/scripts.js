// Define the initial and final positions of the circle
const x1 = 50;
const y1 = 50;
const x2 = 200;
const y2 = 200;

const x3=75;
const y3=100;

// Define the margins and dimensions of the SVG container
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create an SVG container
const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the x and y scales and axes
const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width]);
const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Add the x and y axes to the SVG container
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
svg.append("g")
  .call(yAxis);

// Create a circle element at the initial position
const circle = svg.append("circle")
  .attr("cx", x1)
  .attr("cy", y1)
  .attr("r", 10)
  .style("fill", "red");

var event_number=0;
// Add a click event listener to the circle
circle.on("click", function() {
  // Move the circle to the final position
  if (event_number==0)
  {
  circle.transition()
    .duration(1000)
    .attr("cx", x2)
    .attr("cy", y2);
    event_number=event_number+1
  }
  else if (event_number==1)
  {
    circle.transition()
    .duration(1000)
    .attr("cx", x3)
    .attr("cy", y3);
    event_number=2
  }
  else if (event_number==2)
  {
    circle.transition()
    .duration(1000)
    .attr("cx", x1)
    .attr("cy", y1);
    event_number=0
  }
});
