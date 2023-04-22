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
    private static final Object writeLock = new Object();

    public synchronized static List<User> readUsersFromFile() throws IOException, ClassNotFoundException {
        try (ObjectInputStream objIn = new ObjectInputStream(new FileInputStream(SCORES))) {
            return (List<User>) objIn.readObject();
        }
    }


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

            synchronized(this) {
                try (ObjectOutputStream objOut = new ObjectOutputStream(new FileOutputStream(SCORES))) {
                    objOut.writeObject(users);
                }
            }

            response(response, HttpServletResponse.SC_OK, "user added!");
        }
        catch(Exception e){
            response(response, HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }

    private void updateUsersData(User newUser, List<User> users) {
        boolean found = false;

        for (User user : users) {
            if (user.getName().equals(newUser.getName())) {
                if(user.getScore() > newUser.getScore()) user.setScore(newUser.getScore());
                found = true;
                break;
            }
        }

        if (!found) {
            users.add(newUser);
        }
    }

    private User getNewUser(HttpServletRequest request) {

        //get the data from body of the request
        String username = request.getParameter("username");
        int score = Integer.parseInt(request.getParameter("score"));

        //validation in setting
        User newUser = new User();
        newUser.setName(username);
        newUser.setScore(score);

        return newUser;
    }

    public void response(HttpServletResponse res, int code, Object data)  throws IOException{
        res.setContentType("application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setStatus(code);
        Gson gson = new Gson();
        String json = gson.toJson(data);
        res.getWriter().write(json);
    }

    @Override
    public void init() {
        this.realPath = getServletContext().getRealPath(".");
    }

    @Override
    public void destroy() {
    }
}
