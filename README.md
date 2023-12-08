# 🐂 🐂 BULLS AND COWS 🐄🐄

![App Screenshot](react-client/public/assets/CowAndBull.jpg)

## Table of Contents

- [Authors](#authors)
- [About](#about)
- [Usage](#usage)
  - [Setup Instructions](#setup-instructions)
    - [Using IntelliJ IDEA](#using-intellij-idea)
    - [Using Visual Studio Code](#using-visual-studio-code)
- [Accessing the Application](#accessing-the-application)
- [Dependencies](#dependencies)
- [License](#license)

## Authors

- Noam Mirjani
- Ariel Amon

## About

The Bulls and Cows web-based game, inspired by Mastermind, challenges players to guess a four-digit number within seven tries. Players receive feedback in terms of "Bulls" (correct digits in the right position) and "Cows" (correct digits in the wrong position) for each guess.

## Usage

### Setup Instructions

To get started:

#### Using IntelliJ IDEA:

- Server Configuration:
  1. Go to `Run -> Edit Configurations`.
  2. Add a `Tomcat Server -> Local` configuration.
  3. Specify your local Tomcat installation path.
  4. Deploy the `java-react.war` file (located in the project's target folder) by clicking the "Fix" button.

- Initial Setup:
  - If encountering issues, close the project, delete the `.idea` folder, and reopen to recreate the run configuration.

- Dependencies:
  Ensure correct project dependencies:
  - Tomcat 9.0.45
  - Node.js v18.15.0 (npm 9.5.0)
  - Java SDK 19

#### Using Visual Studio Code:

- Deploying to Tomcat:
  1. Start your local Tomcat server manually:
     ```bash
     cd /path/to/tomcat
     chmod +x ./bin/startup.sh
     ./bin/startup.sh
     ```
  2. Copy the generated WAR file into the Tomcat `webapps` directory.

  3. To shut down the server after playing:
     ```bash
     cd /path/to/tomcat
     chmod +x ./bin/shutdown.sh 
     ./bin/shutdown.sh 
     ```

- Running the Client:
  - Open the terminal:
    ```bash
    cd react-client
    npm install
    npm start
    ```

## Accessing the Application

- React client: [http://localhost:3000](http://localhost:3000)
- Server API: [http://localhost:8080/api/highscores](http://localhost:8080/api/highscores)

## Dependencies

- Tomcat 9.0.45
- Node.js v18.15.0 (npm 9.5.0)
- Java SDK 19
- React (version X.X.X)

Ensure that the server endpoint is customized without hardcoding the host and port in the React code (use 'api/' instead of 'http://localhost:8080/api/'). Additionally, ensure proper implementation of REST API functionalities for the server to operate correctly.


## License
[API documentation](api/index.html)


Feel free to enhance and customize the game to suit your preferences. Happy gaming! 🎮