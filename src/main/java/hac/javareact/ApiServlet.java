package hac.javareact;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import com.google.gson.Gson;
import java.io.IOException;

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    private String realPath;
    private static final String SCORES  = "scores.dat";

    public static List<User> readUsersFromFile() throws IOException, ClassNotFoundException {
        try (ObjectInputStream objIn = new ObjectInputStream(new FileInputStream(SCORES))) {
            return (List<User>) objIn.readObject();
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");
        try {
            List<User> users = readUsersFromFile();
            users.sort((u1, u2) -> Integer.compare(u1.getScore(), u2.getScore())); // sort by score descending
            List<User> topFive = users.subList(0, Math.min(users.size(), 5)); // get top five users
            response.setStatus(HttpServletResponse.SC_OK);
            Gson gson = new Gson();
            String json = gson.toJson(topFive);
            response.getWriter().write(json);
        } catch (IOException | ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Gson gson = new Gson();
            String json = gson.toJson(e.getMessage());
            response.getWriter().write(json);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String username = request.getParameter("username");
        int score = Integer.parseInt(request.getParameter("score"));
        boolean found = false;

        User newUser = new User();
        newUser.setName(username);
        newUser.setScore(score);

        List<User> users;
        try {
            users = readUsersFromFile();
        } catch (IOException | ClassNotFoundException e) {
            users = new ArrayList<>();
        }

        for (User user : users) {
            if (user.getName().equals(username)) {
                if(user.getScore() > score) user.setScore(score);
                found = true;
                break;
            }
        }
        if (!found) {
            users.add(newUser);
        }

        //users.add(newUser);
        try (ObjectOutputStream objOut = new ObjectOutputStream(new FileOutputStream(SCORES))) {
            objOut.writeObject(users);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Gson gson = new Gson();
            String json = gson.toJson(e.getMessage());
            response.getWriter().write(json);
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        Gson gson = new Gson();
        String json = gson.toJson("added player !");
        response.getWriter().write(json);
    }

    @Override
    public void init() {
        this.realPath = getServletContext().getRealPath(".");
    }

    @Override
    public void destroy() {
    }
}
