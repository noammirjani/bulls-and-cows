package hac.javareact;
import java.io.*;
import java.util.ArrayList;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.Collections;
import java.util.Comparator;

/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")

public class ApiServlet extends HttpServlet {

    private String realPath;
    private static final String SCORES  = "scores.dat";


    private ArrayList<User>read(){
        ArrayList<User> userList = new ArrayList<>();

        try (FileInputStream fileIn = new FileInputStream(SCORES);
             ObjectInputStream objIn = new ObjectInputStream(fileIn)) {

            while (true) {
                try {
                    User user = (User) objIn.readObject();
                    userList.add(user);
                } catch (EOFException e) {
                    // End of file reached
                    break;
                }
            }
        }
        catch(Exception  e){
            System.out.println("read failed");
        }

        return userList;
    }

    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // prepare the response
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

       try{
            ArrayList<User> userList = read();
            userList.sort(Comparator.comparingInt(User::getScore));

            response.setStatus(HttpServletResponse.SC_OK);
            Gson gson = new Gson();
           ArrayList<User> retArr = userList.size() < 5 ? userList : (ArrayList<User>) userList.subList(0,5);
            String json = gson.toJson(retArr);
            response.getWriter().write(json);

        } catch (IOException e) {

            System.out.println(e.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Gson gson = new Gson();
            String json = gson.toJson(e.getMessage());
            response.getWriter().write(json);
        }
    }

    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        ArrayList<User> userList = read();

        // Writing to scores.dat file
        try (FileOutputStream fileOutputStream = new FileOutputStream(SCORES);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {

            String username = request.getParameter("username");
            int score = Integer.parseInt(request.getParameter("score"));

            User newUser = new User();
           // newUser.validateUser(username, score);
            newUser.setName(username);
            newUser.setScore(score);
            userList.add(newUser);

            // write the object to the output stream
            objectOutputStream.writeObject(userList);
            objectOutputStream.flush();
            objectOutputStream.close();

            response.setStatus(HttpServletResponse.SC_OK);
            Gson gson = new Gson();
            String json = gson.toJson("added player, update db! ");
            response.getWriter().write(json);
        }
        catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Gson gson = new Gson();
            String json = gson.toJson(e.getMessage());
            response.getWriter().write(json);
            System.out.println(e.getMessage());
        }

    }

    @Override
    public void init() {

        this.realPath = getServletContext().getRealPath(".");

//        try (FileOutputStream fileOutputStream = new FileOutputStream(SCORES);
//             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
//
//            for (int i =0 ; i < 4 ; i++ ){
//                User newUser = new User();
//                //newUser.validateUser(username, score);
//                newUser.setName("aaa");
//                newUser.setScore(i);
//                objectOutputStream.writeObject(newUser);
//
//            }
//            objectOutputStream.flush();
//        }
//        catch (IOException e) {
//            System.out.println(e.getMessage());
//        }
    }

    @Override
    public void destroy() {
    }
}
