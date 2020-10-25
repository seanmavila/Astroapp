function add_hydrogen() {
    var src = "https://www.ecosia.org/images?q=hydrogen+spectrum#id=422ABCF0FBBBEB4DF8C06D90F22258FEBA44F200";
    show_image("https://www.ecosia.org/images?q=hydrogen+spectrum#id=422ABCF0FBBBEB4DF8C06D90F22258FEBA44F200", 276,110, "hydrogen spectrum");
}

function add_helium() {
    var src = "http://planetfacts.org/wp-content/uploads/2011/04/Helium_spectrum.jpg";
    show_image("http://planetfacts.org/wp-content/uploads/2011/04/Helium_spectrum.jpg", 276,110, "hydrogen spectrum");
}

function add_mercury() {
    var src = "https://i.stack.imgur.com/onjhd.png";
    show_image("https://i.stack.imgur.com/onjhd.png", 276,110, "hydrogen spectrum");
}

function add_oxygen() {
    var src = "https://upload.wikimedia.org/wikipedia/commons/f/fe/Oxygen_spectrum_visible.png";
    show_image("https://upload.wikimedia.org/wikipedia/commons/f/fe/Oxygen_spectrum_visible.png", 276,110, "hydrogen spectrum");
}

function add_neon() {
    var src = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Visible_spectrum_of_neon.jpg";
    show_image("https://upload.wikimedia.org/wikipedia/commons/6/6c/Visible_spectrum_of_neon.jpg", 276,110, "hydrogen spectrum");
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.body.appendChild(img);
}

function main(){

    rand = Math.floor(Math.random() * 5); 
    guess = null;

    switch(rand) {
        case 0:
            guess = "hydrogen";
            add_hydrogen();
            break;
        case 1:
            guess = "helium";
            add_helium();
            break;
        case 2:
            guess = "mercury";
            add_mercury();
            break;
        case 3:
            guess = "oxygen";
            add_oxygen();
            break;
        case 4:
            guess = "neon";
            add_neon();
            break;
    }
}
