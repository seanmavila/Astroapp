
var allItems = ["oneA", "oneB", "oneC", "oneD", "oneE", "twoA", "twoB", "twoC", "twoD", "twoE", "threeA", 
"threeB", "threeC", "threeD", "threeE", "fourA", "fourB", "fourC", "fourD", "fourE", "fiveA", "fiveB", "fiveC", "fiveD", "fiveE"];

// Randomly selects item from the array and moves it onto the screen.
function shiftItem() {
    if (allItems.length){
        var item = document.getElementById(allItems.splice(allItems.length * Math.random() | 0, 1)[0]);
        console.log(item.id);
        item.style.left = "47.5%";
    }else{
        console.log("no more items!");
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }                     
}

