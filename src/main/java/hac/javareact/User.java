package hac.javareact;

import java.io.Serializable;

public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    private String name;
    private int score;



/*    public User(){
    }*/

    public void validateUser(String name, int score){

        if(score < 0)
            throw new IllegalArgumentException("score can not be negative!");

        if(!name.matches("^[a-zA-Z]+$"))
            throw new IllegalArgumentException("name can contains only letters!");
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setScore(int score) {
        this.score = score;
    }
}