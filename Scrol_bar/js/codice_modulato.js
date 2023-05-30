

// Define the margins and dimensions of the SVG container
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
var circles
var view = 1;
var old_view = 1;

var padding_axisX=20;
var padding_axisY=20;
var x_axis_elem;
var y_axis_elem;
var duration;


var absoluteScaling=true;
var scaledData;

// Create an SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Define the x and y scales and axes
var xScale = d3.scaleLinear()
    .domain([0, 800])
    .range([0, width]);
var yScale = d3.scaleLinear()
    .domain([0, 800])
    .range([height, 0]);

var xScale_test;
var yScale_test;




let xAxis = d3.axisBottom(xScale);

let yAxis = d3.axisLeft(yScale);

let yAxis_test;
let xAxist_test;


function updateXScaleDomain(data, view) {
    var values = data.map(function (d) { return d["x" + view] })
    var min = d3.min([...values, 0])
    var max = d3.max([...values, 0])
    xScale.domain(min, max);
    console.log(xScale);
    xAxis = d3.axisBottom(xScale);
    d3.select(".xAxis")
        .transition()
        .duration(duration)
        .call(xAxis);
}

function updateYScaleDomain(data, view) {
    var values = data.map(function (d) { return d["y" + view] })
    var min = d3.min([...values, 0])
    var max = d3.max([...values, 0])
    yScale.domain(min, max);
    

    yAxis = d3.axisLeft(yScale);
    d3.select(".yAxis")
        .transition()
        .duration(duration)
        .call(yAxis);
}
const updateSpeed = () => {
    d3.select("#testo").remove()
    svg.append("text")
        .attr("id", "testo")
        .attr("font-size", 18)
        .attr("fill", '#000000')
        .attr("text-anchor", "middle")
        .text(duration)
};

//disegno assi
function drawAxes(view) {
    
    

    //xAxis = d3.axisBottom(xScale_test);
    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    // Update and append the y-axis
    //var yAxis = d3.axisLeft(yScale_test);
    svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("class","labelY")
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("y"+view);

    //x
    svg.append("text")
        .attr("transform", "rotate(0)")
        .attr("y", height)
        .attr("x",width+10)
        .attr("class","labelX")
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("x"+view);

}

//aggiornamento assi
function updateAxesText(view)
{
    
    // Select the element with the class "labels"
    var elementX = d3.select(".labelX");

    // Update the text of the element
    elementX.text("x"+view);

    var elementY=d3.select(".labelY");
    elementY.text("y"+view);
}



function updateFlys(view) {
    //selezione delle componenti del canvas
    
    
    svg.selectAll(".circles")
        .attr("cx", d => (d["x" + old_view]))
        .attr("cy", d => (d["y" + old_view]))
        .transition()
        .duration(duration)
        .attr("cx", d => xScale(d["x" + view]))
        .attr("cy", d => yScale(d["y" + view]));
    

}

function updateDrawing(data, view) {
    
    
    //selezione delle componenti del canvas
    circles = svg.selectAll("circle").data(data)

    circles.exit().remove()

    circles.enter()
        .append("circle")
        .attr("class", "circles")

        .attr("r", 10)
        .style("fill", "red")

        .attr("cx", d => xScale(d["x" + view]))
        .attr("cy", d => yScale(d["y" + view]))
        .on("click", function (event, d) {
            old_view = view
            view = view + 1;
            if (view == 4) {
                view = 1
            }
        
            
            updateFlys(view);
            drawAxes(view,data);
            updateAxesText(view);
        });


}
function findMinAndMax(data,label)
{
    min=Infinity
    max=-Infinity
    data.forEach(function(d) {
        for (var key in d) {
          if (key.includes(label)) {
            var value = d[key];
            if (value < min) {
              min = value;
            }
            if (value > max) {
              max = value;
            }
          }
        }
      });
      return [min,max]
}
function absoluteScaleData(data)
{
    
    debugger;
    var out=data.map(function(d){
        return {
            "name":(d["name"]),
            "x1":xScale_test(d["x1"]),
            "x2":xScale_test(d["x2"]),
            "x3":xScale_test(d["x3"]),
            "y1":yScale_test(d["y1"]),
            "y2":yScale(d["y2"]),
            "y3":yScale(d["y3"]),
            
        };
    });
    return out;
}

function defineScale(data)
{
    var valuesX=findMinAndMax(data,"x");
    var valuesY=findMinAndMax(data,"y");
     
    console.log(valuesX);
    console.log(valuesY);
    xScale_test = d3.scaleLinear()
    .domain([valuesX[0],valuesX[1]+padding_axisX])
    .range([0, width]);

    yScale_test=d3.scaleLinear()
    .domain([valuesY[0],valuesY[1]+padding_axisY])
    .range([height, 0]);

    
}



d3.json("data/data.json")
    .then(function (data) {
        duration = 500;
        //var newData;
        if (absoluteScaling==true)
        {   
            //definizione della scala in base ai dati presenti nel json (scale unica per assi e coordinate)
            //defineScale(data);
            
            //newData=absoluteScaleData(data)
        }

        //listner sullo slider
        d3.select("#mySlider").on("change", function () {
            duration = this.value;
            updateSpeed(duration);
        });

        
        drawAxes(view);
        
        updateDrawing(data, view, duration);
        updateSpeed(duration);












    })
    .catch(function (error) {

        console.log(error); // Some error handling here
    });


