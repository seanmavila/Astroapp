const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

// Event listeners for dragging and dropping
draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

droppableElements.forEach(elem =>{
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

// Drag and drop functionality
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.style.color);    
}

function dragOver(event) {
    if (!event.target.classList.contains("dropped")){
        event.preventDefault();
    }
}


function dragEnter(event) {
    if (!event.target.classList.contains("dropped")){
        event.target.classList.add("droppable-hover");
    }
}

function dragLeave(event) {
    if (!event.target.classList.contains("dropped")){
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    const draggableElementData = event.dataTransfer.getData("text");
    const draggableElementData = event.target.getAttribute("data-draggable-id");
    if (draggableElementData === droppableElementData) {
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);
        event.target.style.backgroundColor = DraggableElement.style.color;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
    }
}