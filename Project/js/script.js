


//DICHIARAZIONE DELLE COSTANTI 
const plot_container=d3.selectAll("#plot");     //Componente dove verrà inserito il plot
const settings_container=d3.selectAll("#settings")  //Componente dove sono inserite i settaggi

const margin = { top: 10, right: 40, bottom: 50, left: 50 };    //Margini del canvas svg 

const width = 700;
const height = 400 - margin.top - margin.bottom;
const extra_space=200;          //spazio extra del canvas

const padding_axisX=2;
const padding_axisY=10;

//Dati relativi alle images delle mosche plottate
const imageAttributes = {

    width: 50, // width dell'image
    height: 50, // height dell' image
    xlinkHref: "images/mosca3.png" //path dell'image
  };


//DICHIARAZIONE DELLE VARIBAILI

var circles;        //variabile relativa ad i punti plottati (circles=flys)    
var view = 1;       //variabile che conta il numero di click dell'utente (parte da 1 fino a 3)

var x_axis_elem;    //asse x
var y_axis_elem;    //asse y
var duration;       //durata della transizione
var labels;         
var showlabels;

//Dichiarazione degli scale. Vengono istanziati al momento della lettura del dataset.
var xScale;
var yScale;
let xAxis; 
let yAxis; 




  



//DICHIARAZIONE DELLE FUNZIONI UTILIZZATE
  
// Creazione dell'svg container
const svg = d3.select("#plot")
    .append("svg")
    .attr("width", width+extra_space)
    .attr("height", height+extra_space)
    .attr("margin-top",-10)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 //Creazione della componente tooltip da mostrare on hoover dei punti
  var Tooltip = d3.select("body")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("position","absolute");

 // Funzioni relative alla logica di visualizzazione dei tooltip
 var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    console.log(view)
    Tooltip
      .html("ID: " + d["ID"] +"<br>" + "X:"+d["x"+view]+"<br>"+"Y:"+d["y"+view])
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }





//funzione di disegno degli assi x e y
function drawAxes() {

    yAxis= d3.axisLeft(yScale);
    xAxis= d3.axisBottom(xScale);
    // Add the x and y axes to the SVG container
    x_axis_elem = svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    y_axis_elem = svg.append("g")
        .attr("class", "yAxis")
        .call(yAxis);
    
    //Aggiunta di due labels per visionare quali coordinate si stanno visualizzando
    //y+"view"->y1,y2,y3 a seconda del valore di click dell'utente
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("class","labelY")
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("y"+view);

    //x+"view"->x1,x2,x3 a seconda del valore di click dell'utente
    svg.append("text")
        .attr("transform", "rotate(0)")
        .attr("y", height-10)
        .attr("x",width+10)
        .attr("class","labelX")
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text("x"+view);

}

//aggiornamento delle label nell'asse
function updateAxesText(view)
{
    
    
    var elementX = d3.select(".labelX");

    
    elementX.text("x"+view);

    var elementY=d3.select(".labelY");
    elementY.text("y"+view);
}



//funzione di aggiornamento delle mosche (invocata dall'evento on.click)
//la posizione delle mosche, per centrarla nel punto definito dagli attributi x,y deve essere scalata della grandezza dell'img/2
function updateFlys(view) {
    //selezione delle componenti del canvas
    
    svg.selectAll(".circles")
        
        .transition()
        .duration(duration)
        .attr("x", function(d){return xScale(d["x" + view])-imageAttributes.width/2})   
        .attr("y",function(d){return yScale(d["y" + view])-imageAttributes.height/2});
    
    
    

}

//aggiunta delle mosche nell'svg
function addFlys(data,view)

{
    //selezione delle componenti del canvas
    circles = svg.selectAll("image").data(data)

    circles.exit().remove()

    circles.enter()
    
        .append("image")
        .attr("class", "circles")
        .attr("x", function(d){return xScale(d["x"+view])-imageAttributes.width/2})
        .attr("y", function(d){return yScale(d["y"+view])-imageAttributes.height/2})
        .attr("width", imageAttributes.width)
        .attr("height", imageAttributes.height)
        .attr("xlink:href", imageAttributes.xlinkHref)
        
        .on("click", function (event, d) {
            old_view = view
            view = view + 1;
            if (view == 4) {
                view = 1
            }

            updateFlys(view);
            updateAxesText(view);
            
            
           
        })
        .on("mouseover", mouseover)
        .on("mousemove", function(d,i){
            
            Tooltip
              .html("ID: " + d["id"] +"<br>" + "X"+view+":"+d["x"+view]+"<br>"+"Y"+view+":"+d["y"+view])
              .style("left", (d3.mouse(this)[0]+70) + "px")
              .style("top", (d3.mouse(this)[1]) + "px")})
        .on("mouseleave", mouseleave);

       
        
}

//funzione di aggiornamento del disegno
function updateDrawing(data, view, labels) {
       
        addFlys(data,view);
        
        
       

    
        

}
//funzione di aggiornamento della velocità di transisizione da una view ad un'altra
const updateSpeed = (duration) => {
    var container=d3.selectAll("#testo")
        .text(duration)
};
//stampa del valore di velocità scelto
function showSpeed(duration)
{
    var container=d3.selectAll("#speed_Text")
    
    container.append("text")
        .attr("id", "testo")
        .attr("font-size", 18)
        .attr("fill", '#000000')
        .attr("text-anchor", "middle")
        .text(duration) 
}
//funzione di creazione dello slider che gestisce la velocità di transizione 
function create_slider()
{

var rangeInput = d3.select("#slider")
.append("input")
.attr("type", "range")
.attr("name", "mySlider")
.attr("id", "mySlider")
.attr("min", "100")
.attr("max", "1000")
.attr("value", "500")
.attr("y","200");
showSpeed(duration);



d3.select("#mySlider").on("change", function () {
    duration = this.value;
    updateSpeed(duration)

    
});
}
//funzione util per l'individuazione di valori massimo e minimo delle variabili (x[1,2,3] e y[1,2,3])
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

//inizializzazione degli scale in base ai valori massimi individuati nel dataset per le variabili x (x1,x2,x3) ed y(y1,y2,y3)
function defineScale(data)
{
    var valuesX=findMinAndMax(data,"x");
    var valuesY=findMinAndMax(data,"y");
    
    //Scale delle variabili x e y (il massimo valore presente nel dataset è 9.2 per x e 9.8 per y)
     xScale = d3.scaleLinear()
    .domain([0, valuesX[1]+padding_axisX])
    .range([0, width]);
     yScale = d3.scaleLinear()
    .domain([0, valuesY[1]+padding_axisY])
    .range([height, 0]);


    
    


}


//funzione principale
d3.json("data/data.json")
    .then(function (data) {
       
        defineScale(data);
        duration = 500;
        create_slider();
        
        //listner sullo slider
        

        drawAxes();
      
        updateDrawing(data, view, duration,showlabels);
        

    })
    .catch(function (error) {

        console.log(error); 
    });


