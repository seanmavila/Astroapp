# Astroapp

Astronomy simulations for SHSU physics dept

1. Download node.js (includes npm)
2. Go to github and make an account
3. Go to https://github.com/seanmavila/Astroapp
4. Click green button labeled "Code" and download zip
5. Install and open visual studio code
6. Navigate to File > Open Folder > Where ever your Astroapp folder is
7. Navigate to Terminal > new terminal
8. Type command: npm install nodemon express express-session mysql pug bcrypt util.promisify
9. Run command: npm start
10. Open browser and go to localhost:3000
11. Admin login:
    user: admin
    pass: root
    
    User login:
    user: user3
    pass: pass

---For DB---

1. Download, install, and configure (dont forget to create a username and password during the install wizard) mysql
2. Navigate to pool.js
3. change the current user and password to your own mysql user and pass
4. Make sure the mysql service is running. Windows: window key + R > services,msc > find Mysql > start
5. Launch Mysql Workbench
6. Navigate to: Server > Data Import
7. Change the file path in the import options to the location of the astrop.sql file in your Astroapp folder (core)
8. Select the the astrop.sql database
9. Click start import
