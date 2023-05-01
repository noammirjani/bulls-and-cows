package hac.javareact;

import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import com.google.gson.Gson;
import java.io.IOException;


/**
 * ApiServlet is a servlet that provides API endpoints for managing high scores of a game. It receives GET and POST requests
 * and returns data in JSON format. It stores and reads high score data from a file.
 */
@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    //private String realPath;
    private static final String SCORES = "scores.dat";
    private static File file;


    /**
     * opens a file with the current path and create it
     * @return file
     */
    private File createFile() throws Exception {

        String path = getServletContext().getRealPath(".") + File.separator + SCORES;
        File file = new File(path);

        if(!file.exists()){
            boolean created = file.createNewFile();
            if(!created) throw new Exception("could not create file");
        }

        return file;
    }


    /**
     * Reads the high score data from a file.
     *
     * @return a list of User objects containing the high score data.
     * @throws IOException            if there was an error reading from the file.
     * @throws ClassNotFoundException if the class of the serialized object cannot be found.
     */
    public synchronized List<User> readUsersFromFile() throws IOException, ClassNotFoundException {
        try (ObjectInputStream objIn = new ObjectInputStream(Files.newInputStream(file.toPath()))){
            return (List<User>) objIn.readObject();
        }
    }

    /**
     * Handles GET requests to the API endpoint. Returns the top five high scores.
     *
     * @param request  the HTTP request object.
     * @param response the HTTP response object.
     * @throws IOException if there was an error writing to the response.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            List<User> users = readUsersFromFile();
            users.sort((u1, u2) -> Integer.compare(u1.getScore(), u2.getScore())); // sort by score descending
            List<User> topFive = users.subList(0, Math.min(users.size(), 5)); // get top five users
            response(response, HttpServletResponse.SC_OK, topFive);

        } catch (IOException | ClassNotFoundException e) {
            response(response, HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Handles POST requests to the API endpoint. Adds a new high score to the list of high scores.
     *
     * @param request  the HTTP request object.
     * @param response the HTTP response object.
     * @throws IOException if there was an error writing to the response.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            User newUser = getNewUser(request);

            List<User> users;
            try {
                users = readUsersFromFile();
            } catch (IOException | ClassNotFoundException e) {
                users = new ArrayList<>();
            }

            updateUsersData(newUser, users);

            synchronized (this) {
                try (ObjectOutputStream objOut = new ObjectOutputStream(Files.newOutputStream(file.toPath()))) {
                    objOut.writeObject(users);
                }
            }

            response(response, HttpServletResponse.SC_OK, "user added!");
        } catch (Exception e) {
            response(response, HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Updates the list of high scores with a new user's data.
     *
     * @param newUser the User object containing the new user's data.
     * @param users   the list of User objects containing the high score data.
     */
    private void updateUsersData(User newUser, List<User> users) {
        boolean found = false;

        for (User user : users) {
            if (user.getName().equals(newUser.getName())) {
                if (user.getScore() > newUser.getScore()) user.setScore(newUser.getScore());
                found = true;
                break;
            }
        }

        if (!found) {
            users.add(newUser);
        }
    }

    /**
     * Extracts a new user's data from the request object.
     *
     * @return a User object containing the new user's data.
     */
    private User getNewUser(HttpServletRequest request) {
        //get the data from body of the request
        String username = request.getParameter("username");
        String scoreParam = request.getParameter("score");

        if (username == null || scoreParam == null) {
            throw new IllegalArgumentException("Missing username or score parameter");
        }

        int score = Integer.parseInt(scoreParam);

        //validation in setting
        User newUser = new User();
        newUser.setName(username);
        newUser.setScore(score);

        return newUser;
    }

    /**
     * Sends an HTTP response containing JSON data.
     *
     * @param res  the HTTP response object.
     * @param code the HTTP status code of the response.
     * @param data the data to be sent in the response body.
     * @throws IOException if there was an error writing to the response.
     */
    public void response(HttpServletResponse res, int code, Object data) throws IOException {
        res.setContentType("application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setStatus(code);
        Gson gson = new Gson();
        String json = gson.toJson(data);
        res.getWriter().write(json);
    }

    /**
     * Initializes the servlet.
     */
    @Override
    public void init() {
        try{file = createFile();}
        catch(Exception e){System.out.println(e.getMessage());}
    }

    /**
     * Cleans up resources used by the servlet.
     */
    @Override
    public void destroy() {}

}
