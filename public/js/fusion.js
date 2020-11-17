window.onload = function(){

    //Canvas related references
    var canvas = document.getElementById("fusionCanvas");
    var ctx = canvas.getContext("2d");
    var boundingBox = canvas.getBoundingClientRect();
    var offsetX = boundingBox.left;
    var offsetY = boundingBox.top;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    //Keeps track of the current problem
    var currentProblem = 0;

    //Stores all of the problem configurations.
    //Each element is a seperate problem: [inputHeavy, inputLight, inputCharge, outputHeavy, outputLight, outputCharge]
    var problems = [[2, 0, 2, 1, -1, 1],
                    [2, 1, 2, 1, 0, 1]];

    //set up first problem
    var inputHeavyCount = problems[0][0];
    var inputLightCount = problems[0][1];
    var inputCharge = problems[0][2];
    var outputHeavyCount = problems[0][3];
    var outputLightCount = problems[0][4];
    var outputCharge = problems[0][5];

    //Particle visual data
    var heavyRadius = 30;
    var lightRadius = 15;
    var positiveColor = "#ff0000";
    var negativeColor = "#0080ff";
    var neutralColor = "#a7a7a7";
    var protonStartingX = 250;
    var protonStartingY = 50;
    var particleStartingSeperation = 100;
    var lockedParticleStartingX = -100;
    var lockedParticleStartingY = -100;

    //Saved to speed computation speed when drawing particle
    const pi2 = 2 * Math.PI;

    //Predefined inputBox coordinates
    var inputBoxX = 50;
    var inputBoxY = 150;
    var inputBoxWidth = 300;
    var inputBoxHeight = 300;
    var inputZone1X = inputBoxX + inputBoxWidth / 4;
    var inputZone1Y = inputBoxY + inputBoxHeight / 3;
    var inputZone2X = inputBoxX + inputBoxWidth / 2;
    var inputZone2Y = inputZone1Y;
    var inputZone3X = inputBoxX + inputBoxWidth / 4 * 3;
    var inputZone3Y = inputZone1Y;
    var inputZone4X = inputZone1X;
    var inputZone4Y = inputBoxY + inputBoxHeight / 3 * 2;
    var inputZone5X = inputZone2X;
    var inputZone5Y = inputZone4Y;
    var inputZone6X = inputZone3X;
    var inputZone6Y = inputZone4Y;

    //Predefined outputBox coordinates
    var outputBoxX = 450;
    var outputBoxY = 150;
    var outputBoxWidth = 300;
    var outputBoxHeight = 300;
    var outputBoxLowerY = outputBoxY + (outputBoxHeight / 2);
    var outputBoxLowerHeight = outputBoxHeight / 2;
    var outputZone1X = outputBoxX + outputBoxWidth / 6;
    var outputZone1Y = outputBoxLowerY + outputBoxLowerHeight / 3;
    var outputZone2X = outputBoxX + outputBoxWidth / 2;
    var outputZone2Y = outputZone1Y;
    var outputZone3X = outputBoxX + outputBoxWidth / 6 * 5;
    var outputZone3Y = outputZone1Y;
    var outputZone4X = outputBoxX + outputBoxWidth / 3;
    var outputZone4Y = outputBoxLowerY + outputBoxLowerHeight / 3 * 2;
    var outputZone5X = outputBoxX + outputBoxWidth / 3 * 2;
    var outputZone5Y = outputZone4Y;

    //Other coordinates
    var nextProblemButtonX = 800;
    var nextProblemButtonY = 300;
    var nextProblemButtonW = 140;
    var nextProblemButtonH = 30;
    var nextProblemButtonYCenter = nextProblemButtonY - nextProblemButtonH / 2;
    var nextProblemButtonYTextCenter = nextProblemButtonY + nextProblemButtonH / 4;
    
    //Draggable particle data
    var proton1 = {x: protonStartingX, y: protonStartingY, radius: heavyRadius, fill: positiveColor, isDragging: false};
    var neutron1 = {x: protonStartingX + particleStartingSeperation, y: protonStartingY, radius: heavyRadius, fill: neutralColor, isDragging: false};
    var electron1 = {x: protonStartingX + particleStartingSeperation * 2, y: protonStartingY, radius: lightRadius, fill: negativeColor, isDragging: false};
    var neutrino1 = {x: protonStartingX + particleStartingSeperation * 3, y: protonStartingY, radius: lightRadius, fill: neutralColor, isDragging: false};
    var positron1 = {x: protonStartingX + particleStartingSeperation * 4, y: protonStartingY, radius: lightRadius, fill: positiveColor, isDragging: false};
    var proton2 = {x: -5 * particleStartingSeperation, y: protonStartingY, radius: heavyRadius, fill: positiveColor, isDragging: false};
    var neutron2 = {x: -4 * particleStartingSeperation, y: protonStartingY, radius: heavyRadius, fill: neutralColor, isDragging: false};
    var electron2 = {x: -3 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: negativeColor, isDragging: false};
    var neutrino2 = {x: -2 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: neutralColor, isDragging: false};
    var positron2 = {x: -1 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: positiveColor, isDragging: false};
    var proton3 = {x: -5 * particleStartingSeperation, y: protonStartingY, radius: heavyRadius, fill: positiveColor, isDragging: false};
    var neutron3 = {x: -4 * particleStartingSeperation, y: protonStartingY, radius: heavyRadius, fill: neutralColor, isDragging: false};
    var electron3 = {x: -3 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: negativeColor, isDragging: false};
    var neutrino3 = {x: -2 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: neutralColor, isDragging: false};
    var positron3 = {x: -1 * particleStartingSeperation, y: protonStartingY, radius: lightRadius, fill: positiveColor, isDragging: false};

    var particles = [proton1, proton2, proton3,
        neutron1, neutron2, neutron3,
        electron1, electron2, electron3,
        neutrino1, neutrino2, neutrino3,
        positron1, positron2, positron3];

    //Locked particle data
    var lockedProton1 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedProton2 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedProton3 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedProton4 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedProton5 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedProton6 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: positiveColor}
    var lockedNeutron1 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedNeutron2 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedNeutron3 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedNeutron4 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedNeutron5 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedNeutron6 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: heavyRadius, fill: neutralColor}
    var lockedElectron1 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedElectron2 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedElectron3 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedElectron4 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedElectron5 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedElectron6 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: negativeColor}
    var lockedNeutrino1 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedNeutrino2 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedNeutrino3 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedNeutrino4 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedNeutrino5 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedNeutrino6 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: neutralColor}
    var lockedPositron1 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}
    var lockedPositron2 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}
    var lockedPositron3 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}
    var lockedPositron4 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}
    var lockedPositron5 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}
    var lockedPositron6 = {x: lockedParticleStartingX, y: lockedParticleStartingY, radius: lightRadius, fill: positiveColor}

    var lockedParticles = [lockedProton1, lockedProton2, lockedProton3, lockedProton4, lockedProton5, lockedProton6,
        lockedNeutron1, lockedNeutron2, lockedNeutron3, lockedNeutron4, lockedNeutron5, lockedNeutron6, 
        lockedElectron1, lockedElectron2, lockedElectron3, lockedElectron4, lockedElectron5, lockedElectron6, 
        lockedNeutrino1, lockedNeutrino2, lockedNeutrino3, lockedNeutrino4, lockedNeutrino5, lockedNeutrino6, 
        lockedPositron1, lockedPositron2, lockedPositron3, lockedPositron4, lockedPositron5, lockedPositron6];
    
    //Drag variables
    var draggingInProgress = false;
    var prevMouseX = 0;
    var prevMouseY = 0;

    //Conditionals used for displaying feedback when dragging over the wrong box
    var particleOverInput = false;
    var particleOverLowerOutput = false;

    //Used to keep track of wether the current problem is in a balanced state or not
    var problemComplete = false;



    //Setup problems particles and values
    setupCurrentProblem();

    //Initial call to draw the scene
    draw();

    //Draws a rectangle with given thickness. For efficiency, accomplished by drawing 2 differently sized, overlapping rectangles.
    function drawBorder(x, y, w, h, thickness, interiorColor, borderColor) {
        ctx.fillStyle = borderColor;
        ctx.fillRect(x - thickness, y - thickness, w + thickness * 2, h + thickness * 2);
        ctx.fillStyle = interiorColor;
        ctx.fillRect(x, y, w, h);
    }

    //Draw a single particle
    function drawParticle(x, y, r, thickness, interiorColor, borderColor) {
        ctx.lineWidth = thickness;
        ctx.strokeStyle = borderColor;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, pi2);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = interiorColor;
        ctx.fill();
    }
    
    //Clear the canvas
    function clear() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    
    //Draws the input box text, the input box, and the input box status text
    function drawInputBox(x, y, w, h, thickness) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Input", x, y - 10);

        drawBorder(x, y, w, h, thickness, "#ffffff", "#000000");

        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText("Heavy: " + inputHeavyCount + "\t  Light: " + inputLightCount + "\t  Charge: " + inputCharge, x, y + h + 25);
    }

    //Draws the output box text, the output box, the line splitting the output box, and the output box status text
    function drawOutputBox(x, y, w, h, thickness) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Output", x, y - 10);

        drawBorder(x, y, w, h, thickness, "#ffffff", "#000000");

        ctx.beginPath();
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.lineWidth = thickness / 2;
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText("Heavy: " + outputHeavyCount + "\t  Light: " + outputLightCount + "\t  Charge: " + outputCharge, x, y + h + 25);
    }

    //Draws the next problem button
    function drawProblemButton() {
        
        if (currentProblem == problems.length - 1) {
            drawBorder(nextProblemButtonX, nextProblemButtonYCenter, nextProblemButtonW + 40, nextProblemButtonH, 3, "#7f7f7f", "#000000");
            ctx.fillStyle = "#000000";
            ctx.font = "20px Arial";
            ctx.fillText("Module Complete", nextProblemButtonX + 10, nextProblemButtonYTextCenter);
        } else {
            drawBorder(nextProblemButtonX, nextProblemButtonYCenter, nextProblemButtonW, nextProblemButtonH, 3, "#7f7f7f", "#000000");
            ctx.fillStyle = "#000000";
            ctx.font = "20px Arial";
            ctx.fillText("Next problem", nextProblemButtonX + 10, nextProblemButtonYTextCenter);
        }
    }

    //Draws the "details" under the draggable particles
    function drawParticlesDetails() {
        ctx.fillStyle = "#000000";
        ctx.font = "15px Arial";
        var text = "";
        for (var i = 0; i < 5; i++) {
            if (i == 0) {
                text = "Heavy: 1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 45);
                text = "Charge: +1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 60);
            } else if (i == 1) {
                text = "Heavy: 1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 45);
                text = "Charge: 0";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 60);
            } else if (i == 2) {
                text = "Light: 1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 45);
                text = "Charge: -1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 60);
            } else if (i == 3) {
                text = "Light: 1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 45);
                text = "Charge: 0";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 60);
            } else {
                text = "Light: -1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 45);
                text = "Charge: +1";
                ctx.fillText(text, protonStartingX - 25 + i * particleStartingSeperation, protonStartingY + 60);
            }
            
            
        }
    }

    //Draws all particles that can be dragged
    function drawDraggableParticles() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            drawParticle(p.x, p.y, p.radius, 2, p.fill, "#000000");
        }
    }

    //Draws all particles that are "locked", unable ot be dragged by the user. These particles are used to visualize the current problem
    function drawLockedParticles() {
        for (var i = 0; i < lockedParticles.length; i++) {
            var p = lockedParticles[i];
            drawParticle(p.x, p.y, p.radius, 2, p.fill, "#000000");
        }
    }

    //Draws grey diaganol lines over a given plane
    function drawDiagonals(x, y, w, h, numberOfDiags, thickness, color) {
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        for (var i = 0; i < numberOfDiags; i++){
            ctx.beginPath();
            ctx.moveTo(x + w / numberOfDiags * i, y);
            ctx.lineTo(x, y + h / numberOfDiags * i);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x + w, y + h / numberOfDiags * i);
            ctx.lineTo(x + w / numberOfDiags * i, y + h);
            ctx.stroke();
            ctx.closePath();
        }
    }

    //Places the locked particles into the appropriate positions for the given problem
    function setupCurrentProblem(){
        for (var i = 0; i < lockedParticles.length; i++) {
            var p = lockedParticles[i];
            p.x = lockedParticleStartingX;
        }
        if (currentProblem == 0) {
            lockedProton1.x = inputZone1X;
            lockedProton1.y = inputZone1Y;
            lockedProton2.x = inputZone2X;
            lockedProton2.y = inputZone2Y;
            lockedNeutron1.x = outputZone1X;
            lockedNeutron1.y = outputZone1Y;
            lockedPositron1.x = outputZone2X;
            lockedPositron1.y = outputZone2Y;
        } else if (currentProblem == 1) {
            lockedProton1.x = inputZone1X;
            lockedProton1.y = inputZone1Y;
            lockedProton2.x = inputZone2X;
            lockedProton2.y = inputZone2Y;
            lockedNeutron1.x = outputZone1X;
            lockedNeutron1.y = outputZone1Y;
            lockedPositron1.x = outputZone2X;
            lockedPositron1.y = outputZone2Y;
            lockedNeutrino1.x = outputZone3X;
            lockedNeutrino1.y = outputZone3Y;
            lockedNeutrino2.x = inputZone3X;
            lockedNeutrino2.y = inputZone3Y;
        }

        inputHeavyCount = problems[currentProblem][0];
        inputLightCount = problems[currentProblem][1];
        inputCharge = problems[currentProblem][2];
        outputHeavyCount = problems[currentProblem][3];
        outputLightCount = problems[currentProblem][4];
        outputCharge = problems[currentProblem][5];
    }

    //Reset the locations of all draggable particles
    function resetDraggables() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.y = protonStartingY;
            /*
            if (i % 3 == 0) {
                p.x = protonStartingX + particleStartingSeperation * (i / 3);
            } else {
                if (i == 1 || i == 2) {
                    p.x =  -5 * particleStartingSeperation;
                } else if (i == 4 || i == 5) {
                    p.x =  -4 * particleStartingSeperation;
                } else if (i == 7 || i == 8) {
                    p.x =  -3 * particleStartingSeperation;
                } else if (i == 12 || i == 11) {
                    p.x =  -2 * particleStartingSeperation;
                } else if (i == 13 || i == 14) {
                    p.x =  -1 * particleStartingSeperation;
                }
            }
            */
        }

        proton1.x = protonStartingX;
        neutron1.x = protonStartingX + particleStartingSeperation;
        electron1.x = protonStartingX + particleStartingSeperation * 2;
        neutrino1.x = protonStartingX + particleStartingSeperation * 3;
        positron1.x = protonStartingX + particleStartingSeperation * 4;
        proton2.x = -5 * particleStartingSeperation;
        neutron2.x = -4 * particleStartingSeperation;
        electron2.x = -3 * particleStartingSeperation;
        neutrino2.x = -2 * particleStartingSeperation;
        positron2.x = -1 * particleStartingSeperation;
        proton3.x = -5 * particleStartingSeperation;
        neutron3.x = -4 * particleStartingSeperation;
        electron3.x = -3 * particleStartingSeperation;
        neutrino3.x = -2 * particleStartingSeperation;
        positron3.x = -1 * particleStartingSeperation;
    }

    //Draw the entire canvas
    function draw() {
        clear();
        drawInputBox(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight, 3);
        drawOutputBox(outputBoxX, outputBoxY, outputBoxWidth, outputBoxHeight, 3);
        drawLockedParticles();

        if (particleOverInput == true) {
            drawDiagonals(inputBoxX, inputBoxY, inputBoxWidth, inputBoxHeight, 8, 3, "#7f7f7f");
        }
        if (particleOverLowerOutput == true) {
            drawDiagonals(outputBoxX, outputBoxY + outputBoxHeight / 2, outputBoxWidth, outputBoxHeight / 2, 5, 3, "#7f7f7f");
        }
        if (inputHeavyCount == outputHeavyCount && inputCharge == outputCharge && inputLightCount == outputLightCount) {
            problemComplete = true;
            drawProblemButton();
        }
        drawParticlesDetails();
        
        drawDraggableParticles();
    }



    //Canvas mousedown events
    canvas.onmousedown = function myDown(e) {
        //Tell browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();
    
        //Get current mouse position
        var currentMouseX = e.clientX - offsetX;
        var currentMouseY = e.clientY - offsetY;
        
        //Test if button is being clicked
        if (problemComplete == true) {
            if (currentMouseX > nextProblemButtonX && currentMouseX < nextProblemButtonX + nextProblemButtonW && currentMouseY > nextProblemButtonYCenter && currentMouseY < nextProblemButtonYCenter + nextProblemButtonH) {
                if (currentProblem < problems.length - 1) {
                    resetDraggables();
                    currentProblem = currentProblem + 1;
                    setupCurrentProblem();
                    problemComplete = false;
                }
            }
        }

        //Test each particle to see if mouse is above it
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            if (currentMouseX > p.x - p.radius && currentMouseX < p.x + p.radius && currentMouseY > p.y - p.radius && currentMouseY < p.y + p.radius) {
                draggingInProgress = true;
                p.isDragging = true;
            }
        }

        //Save current mouse position
        prevMouseX = currentMouseX;
        prevMouseY = currentMouseY;
    }
    
    
    //Canvas mouseup events
    canvas.onmouseup = function myUp(e) {  
        //Tell browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();
    
        //Clear all dragging flags
        draggingInProgress = false;
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            
            //If we drop a particle in the upper output box, then move in the next particle of that type
            if (p.isDragging == true && i < particles.length - 1) {
                if (p.x > outputBoxX && p.x < outputBoxX + outputBoxWidth && p.y > outputBoxY && p.y < outputBoxY + outputBoxHeight / 2) {
                    if (i % 3 != 2 && particles[i + 1].x < 0) {
                        particles[i + 1].x += 750;
                    }
                }
            }
            p.isDragging = false;
        }

        //Redraw the scene
        draw();
    }
    
    
    //Canvas mouse moves events
    canvas.onmousemove = function myMove(e) {
        if (draggingInProgress == true) {
    
            //Tell browser we're handling this mouse event
            e.preventDefault();
            e.stopPropagation();
    
            //Get current mouse position
            var currentMouseX = e.clientX - offsetX;
            var currentMouseY = e.clientY - offsetY;
    
            //Calculate distance mouse has moved since last mousemove
            var distanceX = currentMouseX - prevMouseX;
            var distanceY = currentMouseY - prevMouseY;
    
            //Reset problem and display data
            particleOverInput = false;
            particleOverLowerOutput = false;
            outputHeavyCount = problems[currentProblem][3];
            outputLightCount = problems[currentProblem][4];
            outputCharge = problems[currentProblem][5];

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                //Move each particle with isDragging by the distance that the mouse has moved since last mousemove
                if (p.isDragging == true) {
                    p.x += distanceX;
                    p.y += distanceY;
                }

                //Check if particle is over input box
                if (p.x > inputBoxX && p.x < inputBoxX + inputBoxWidth && p.y > inputBoxY && p.y < inputBoxY + inputBoxHeight) {
                    particleOverInput = true;
                }

                //Check if particle is over lower output box
                if (p.x > outputBoxX && p.x < outputBoxX + outputBoxWidth && p.y > outputBoxY + outputBoxHeight / 2 && p.y < outputBoxY + outputBoxHeight) {
                    particleOverLowerOutput = true;
                }
                
                //If particle is over the upper output box then update output counters
                if (p.x > outputBoxX && p.x < outputBoxX + outputBoxWidth && p.y > outputBoxY && p.y < outputBoxY + outputBoxHeight / 2) {
                    if (p.radius == heavyRadius) {
                        //Protons/Neutrons
                        outputHeavyCount += 1;
                    }else{
                        if (p.fill == positiveColor) {
                            //Electrons
                            outputLightCount -= 1;
                        }else{
                            //Neutrinos/Positrons
                            outputLightCount += 1;
                        }
                    }

                    if (p.fill == positiveColor) {
                        //Protons/Positrons
                        outputCharge += 1;
                    }else if (p.fill == negativeColor) {
                        //Electrons
                        outputCharge -= 1;
                    }
                }
            }
    
            //Redraw scene with new particle positions
            draw();
    
            //Reset the starting mouse position for next mousemove
            prevMouseX = currentMouseX;
            prevMouseY = currentMouseY;
        }
    }
}