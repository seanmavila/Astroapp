# Astroapp

Astronomy simulations for SHSU physics dept

1. Download node.js (includes npm)
2. Go to github and make an account
3. Go to https://github.com/seanmavila/Astroapp
4. Click green button labeled "Code" and download zip
5. Open visual studio code and open Astroapp file
6. Press Ctrl + Shift + P to open terminal
7. Type command: npm install nodemon express express-session mysql pug bcrypt util.promisify
8. Run command: nodemon start
9. Open browser and go to localhost:3000

---For DB---

1. Download, install, and configure (dont forget to create a username and password during the install wizard) mysql
2. Navigate to pool.js
3. change the current user and password to your own mysql user and pass
4. Launch Mysql Workbench
5. Navigate to: Server > Data Import
6. Change the file path in the import options to the location of the astrop.sql file in your Astroapp folder (core)
7. Select the the astrop.sql database
8. Click start import
9. I think its something like that....? Gl homies
