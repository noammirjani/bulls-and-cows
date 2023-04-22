package hac.javareact;

import java.io.Serializable;

/**
 * User class represents a user who has played the Bulls and Cows game. It contains the user's name and score.
 *
 * @version 1.0
 * @since 2023-04-22
 */
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    private String username;
    private int score;

    /**
     * Sets the name of the user. The name must contain only letters.
     *
     * @param name {String}  - The name of the user.
     * @throws IllegalArgumentException if the name contains characters other than letters.
     */
    public void setName(String name) {

        if(!name.matches("^[a-zA-Z]+$"))
            throw new IllegalArgumentException("name can contains only letters!");

        this.username = name;

    }

    /**
     * Sets the score of the user. The score must be a non-negative integer.
     *
     * @param score {int}  - The score of the user.
     * @throws IllegalArgumentException if the score is negative.
     */
    public void setScore(int score) {

        if(score < 0)
            throw new IllegalArgumentException("score can not be negative!");

        this.score = score;
    }

    /**
     * Returns the score of the user.
     *
     * @return the score of the user.
     */
    public int getScore() {return this.score;}

    /**
     * Returns the name of the user.
     *
     * @return the name of the user.
     */
    public String getName() {return this.username;}
}
