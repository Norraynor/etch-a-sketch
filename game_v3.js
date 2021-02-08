const body = document.querySelector("body");
const mainDiv=document.createElement("div");
const container=document.createElement("div");
let root = document.documentElement;
mainDiv.id = "main-div";
container.id = "container";
const maxSize = 100;
const button = document.createElement("button");

body.appendChild(mainDiv);
button.style.width = "100px";
button.style.height = "50px";
button.textContent = "RESET";
button.addEventListener("click",GenerateNewGrid)

mainDiv.appendChild(button);
mainDiv.appendChild(container);


//create 16x16 div grid
function createSquareGridDivs(gridSize=16){
    container.textContent = "";
    for(i=0;i<gridSize;i++){
        for(j=0;j<gridSize;j++){
            const div=document.createElement("div");
            div.classList.add("inner-squares");
            div.addEventListener("mouseenter",setColor);
            container.appendChild(div);
        }
    }
}
createSquareGridDivs();

function GenerateNewGrid(){
    let gridSize = parseInt(prompt("How big of grid do you want to make?"));
    if(gridSize > maxSize){
        gridSize = maxSize;
    }
    root.style.setProperty("--grid-size",gridSize);
    createSquareGridDivs(gridSize);
}

function setColor(e){    
    e.target.style.backgroundColor = HSLToRGB(IncreaseLight(RGBToHSL(getColor(e))));
    console.log(e.target.style.backgroundColor);
}
function getColor(object){
    let targetColor=object.target.style.backgroundColor;
    if(!targetColor.trim()){
        targetColor = "rgb(255,255,255)";
    }
    return targetColor;
}

function RGBToHSL(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    for (let R in rgb) {
      let r = rgb[R];
      if (r.indexOf("%") > -1) 
        rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
    }
  
    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
        h = 0;
        // Red is max
        else if (cmax == r)
        h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
        h = (b - r) / delta + 2;
        // Blue is max
        else
        h = (r - g) / delta + 4;
    
        h = Math.round(h * 60);
        
        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        
        return "hsl(" + h + "," + s + "%," + l + "%)";          
  }

function HSLToRGB(hsl) {
let sep = hsl.indexOf(",") > -1 ? "," : " ";
hsl = hsl.substr(4).split(")")[0].split(sep);

let h = hsl[0],
    s = hsl[1].substr(0,hsl[1].length - 1) / 100,
    l = hsl[2].substr(0,hsl[2].length - 1) / 100;

let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0,
    g = 0,
    b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;  
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return "rgb(" + r + "," + g + "," + b + ")";          
}

function IncreaseLight(hsl){
let sep = hsl.indexOf(",") > -1 ? "," : " ";
hsl = hsl.substr(4).split(")")[0].split(sep);

let h = hsl[0],
    s = hsl[1].substr(0,hsl[1].length - 1),
    l = hsl[2].substr(0,hsl[2].length - 1);
    if(l>100){
        l=100;
    }
    else if(l<0){
        l=0;
    }
    else{
        l-=10;
    }           
    
    console.log(l);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}