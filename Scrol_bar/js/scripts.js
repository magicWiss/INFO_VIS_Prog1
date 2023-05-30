

// Define the margins and dimensions of the SVG container
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
var circles
var view = 1;
var old_view = 1;
var x_axis_elem;
var y_axis_elem;
var duration;

// Create an SVG container
const svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Define the x and y scales and axes
var xScale = d3.scaleLinear()
    .domain([0, 900])
    .range([0, width]);
var yScale = d3.scaleLinear()
    .domain([0, 900])
    .range([height, 0]);
let xAxis = d3.axisBottom(xScale);
let yAxis = d3.axisLeft(yScale);


function updateXScaleDomain(data, view) {
    var values = data.map(function (d) { return d["x" + view] })
    var min = d3.min([...values, 0])
    var max = d3.max([...values, 0])
    xScale.domain(min, max);
    xAxis = d3.axisBottom(xScale);
    x_axis_elem.call(xAxis);
}

function updateYScaleDomain(data, view) {
    var values = data.map(function (d) { return d["y" + view] })
    var min = d3.min([...values, 0])
    var max = d3.max([...values, 0])
    yScale.domain(min, max);
    yAxis = d3.axisLeft(yScale);
    x_axis_elem.call(yAxis);
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
function drawAxes() {

    debugger;
    // Add the x and y axes to the SVG container
    x_axis_elem = svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    y_axis_elem = svg.append("g")
        .attr("class", "yAxis")
        .call(yAxis);
    
    //y label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("class","labelY")
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("y"+view);

    //x label
    svg.append("text")
        .attr("transform", "rotate(0)")
        .attr("y", height-10)
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




function updateBalls(view) {
    //selezione delle componenti del canvas

    svg.selectAll(".circles")
        .attr("cx", d => xScale(d["x" + old_view]))
        .attr("cy", d => yScale(d["y" + old_view]))
        .transition()
        .duration(duration)
        .attr("cx", d => xScale(d["x" + view]))
        .attr("cy", d => yScale(d["y" + view]))

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

            updateBalls(view);
            updateAxesText(view);
        });
        

}

function redraw(data, view) {
    updateXScaleDomain(data, view);
    updateYScaleDomain(data, view);
    //updateAxes();
    updateDrawing(data, view);
}
debugger;
d3.json("data/data.json")
    .then(function (data) {
       debugger;
        duration = 500;
        //listner sullo slider
        d3.select("#mySlider").on("change", function () {
            duration = this.value;
            updateSpeed(duration);
        });

        drawAxes();
        updateDrawing(data, view, duration);
        updateSpeed(duration);












    })
    .catch(function (error) {

        console.log(error); // Some error handling here
    });


