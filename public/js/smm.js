
let btn = document.getElementById("btn")
let output = document.getElementById("outputtext");

let number = [Math.floor(Math.random() * 5)]

function randomImg(){
    var randomNumber = Math.floor(Math.random() * 5);
    var imgName = "img_" + randomNumber + ".jpg";
    document.getElementById("imageid").src= images + "/" + imgName ;
}

btn.addEventListener('click', function(){

    let input = document.getElementById('userInput').value;

    output.innerHTML = 'Your guess was ${input}'
    
});
