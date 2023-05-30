

// Define the initial and final datasets
const datasetA = [  { "name": "A", "x1": 246, "y1": 306, "x2": 10, "y2": 10, "x3": 136, "y3": 72 },  { "name": "B", "x1": 161, "y1": 118, "x2": 94, "y2": 661, "x3": 102, "y3": 46 },  { "name": "C", "x1": 333, "y1": 266, "x2": 774, "y2": 314, "x3": 10, "y3": 10 },  { "name": "D", "x1": 245, "y1": 212, "x2": 425, "y2": 310, "x3": 121, "y3": 107 },  { "name": "E", "x1": 362, "y1": 394, "x2": 623, "y2": 329, "x3": 175, "y3": 153 },  { "name": "F", "x1": 153, "y1": 103, "x2": 821, "y2": 293, "x3": 148, "y3": 37 },  { "name": "G", "x1": 467, "y1": 325, "x2": 937, "y2": 506, "x3": 49, "y3": 84 },  { "name": "H", "x1": 370, "y1": 424, "x2": 817, "y2": 321, "x3": 105, "y3": 162 },  { "name": "I", "x1": 235, "y1": 248, "x2": 820, "y2": 903, "x3": 161, "y3": 134 }]



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
let xScale = d3.scaleLinear()
  .domain([0, 1500])
  .range([0, width]);
let yScale = d3.scaleLinear()
  .domain([0, 1500])
  .range([height, 0]);
let xAxis = d3.axisBottom(xScale);
 yAxis = d3.axisLeft(yScale);

//slider per la velocita

var duration=50;


function updateAxes(){

  svg.select(".yAxis").transition().duration(updateTime).call(yAxis);
  svg.select(".xAxis").transition().duration(updateTime).call(xAxis);
}
function updateXaxis(data)
{
  
  xScale.domain(data);
}
function updateYaxis(data)
{
  
  yScale.domain(data);
}

// Add the x and y axes to the SVG container
svg.append("g")
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
svg.append("g")
  .attr("class", "yAxis")
  .call(yAxis);

const updateChart= (mixedValue)=>{
    d3.select("#testo").remove()
    svg.append("text")
    .attr("id","testo")
          .attr("font-size", 18)
          .attr("fill", '#000000')
          .attr("text-anchor", "middle")
          .text(mixedValue)
          };


// Create circle elements for each point in datasetA
const circles = svg.selectAll("circle")
  .data(datasetA)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x1))
  .attr("cy", d => yScale(d.y1))
  .attr("r", 10)
  .style("fill", "red");

  var number_event=1;
  circles.on("click", function(d,i) 
    // Move all circle elements in datasetA to the corresponding positions in datasetB
    {
     
      number_event++;
      if (number_event==4)
      {
        number_event=1;
      }
    circles.transition()
      .duration(duration)
      .attr("cx", d=>xScale(d["x"+number_event]))
      .attr("cy", d=>yScale(d["y"+number_event]));
      
      

  
    });
  
    
    updateChart(duration)
  d3.select("#mySlider").on("change", function(d){
    
    duration = this.value
updateChart(duration)
  })






