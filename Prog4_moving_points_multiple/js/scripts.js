


// Define the dataset of points
const dataset = [
  { x: 50, y: 50 },
  { x: 100, y: 100 },
  { x: 150, y: 50 },
  { x: 200, y: 100 },
];
svg=d3.select('body').append('svg');
// Create a fly-shaped point for each point in the dataset
svg.selectAll("g")
  .data(dataset)
  .enter()
  .append("g")
  .attr("transform", d => `translate(${d.x},${d.y})`)
  .append("circle")
  .attr("r", 10)
  .style("fill", "black")
  .style("stroke", "white")
  .style("stroke-width", 2);

svg.selectAll("g")
  .append("path")
  .attr("d", "M0 0 L-5 -5 L-8 -15 Q-10 -20 0 -25 Q10 -20 8 -15 L5 -5 Z")
  .style("fill", "white")
  .style("stroke", "none");

svg.selectAll("g")
  .append("path")
  .attr("d", "M-3 -3 L-6 -12 Q-8 -15 -6 -18 L-3 -22 Q-1 -25 1 -22 L4 -18 Q6 -15 4 -12 L1 -3 Z")
  .style("fill", "white")
  .style("stroke", "none");
