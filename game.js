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
            div.addEventListener("mouseover",()=> div.classList.add("color-blue"));
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