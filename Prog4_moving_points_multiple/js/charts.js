// Define the initial and final datasets
const datasetA = [  { x1: 10, y1: 20,x2: 100, y2: 200},  { x1: 100, y1: 120,x2: 40, y2: 20   },  {x1: 305, y1: 200,x2: 80, y2: 10},  { x1: 90, y1: 20,x2: 110, y2: 200   }];



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
  .domain([0, 500])
  .range([0, width]);
const yScale = d3.scaleLinear()
  .domain([0, 500])
  .range([height, 0]);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Add the x and y axes to the SVG container
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
svg.append("g")
  .call(yAxis);

// Create circle elements for each point in datasetA
const circles = svg.selectAll("circle")
  .data(datasetA)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x1))
  .attr("cy", d => yScale(d.y1))
  .attr("r", 10)
  .style("fill", "red");

  var number_event=0;
  circles.on("click", function(d,i) {
    // Move all circle elements in datasetA to the corresponding positions in datasetB
    if (number_event==0)
    {
    circles.transition()
      .duration(1000)
      .attr("cx", d=>xScale(d.x2))
      .attr("cy", d=>yScale(d.y2));
      number_event=1;
    }
    else
    {
        circles.transition()
      .duration(1000)
      .attr("cx", d=>xScale(d.x1))
      .attr("cy", d=>yScale(d.y1));
      number_event=0;
    }
      
  });
