var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    if(output.value == 1)
        document.getElementById("img").src = "img1.png";
    else if (output.value == 2)
        document.getElementById("img").src = "img2.png";
    else if (output.value == 3)
        document.getElementById("img").src = "img3.png";
    else if (output.value == 4)
        document.getElementById("img").src = "img4.png";
    else if (output.value == 5)
        document.getElementById("img").src = "img5.png";
    else if (output.value == 6)
        document.getElementById("img").src = "img6.png";
    else if (output.value == 7)
        document.getElementById("img").src = "img7.png";
    else if (output.value == 8)
        document.getElementById("img").src = "img8.png";
    else if (output.value == 9)
        document.getElementById("img").src = "img9.png";
    else if (output.value == 10)
        document.getElementById("img").src = "img10.png";
    else if (output.value == 11)
        document.getElementById("img").src = "img11.png";
    else if (output.value == 12)
        document.getElementById("img").src = "img12.png";
    else if (output.value == 13)
        document.getElementById("img").src = "img13.png";
    else if (output.value == 14)
        document.getElementById("img").src = "img14.png";
    else if (output.value == 15)
        document.getElementById("img").src = "img15.png";
    else if (output.value == 16)
        document.getElementById("img").src = "img16.png";
    else if (output.value == 17)
        document.getElementById("img").src = "img17.png";
    else if (output.value == 18)
        document.getElementById("img").src = "img18.png";
    else if (output.value == 19)
        document.getElementById("img").src = "img19.png";
    else if (output.value == 20)
        document.getElementById("img").src = "img20.png";
    else if (output.value == 21)
        document.getElementById("img").src = "img21.png";
    else 
        alert("22")
        document.getElementById("img").src = "img22.png";
} 

    