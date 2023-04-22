package hac.javareact;

import java.io.Serializable;

public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    private String username;
    private int score;

    public void setName(String name) {

        if(!name.matches("^[a-zA-Z]+$"))
            throw new IllegalArgumentException("name can contains only letters!");

        this.username = name;

    }
    public void setScore(int score) {

        if(score < 0)
            throw new IllegalArgumentException("score can not be negative!");

        this.score = score;
    }
    public int getScore() {return this.score;}
    public String getName() {return this.username;}
}