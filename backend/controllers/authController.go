package controllers

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

// Define a User struct
type User struct {
    ID   int    `json:"id"`  // Ensure ID is an int (not a string)
    Name string `json:"name"`
}

// Dummy user data
var users = []User{
    {ID: 1, Name: "John Doe"},
    {ID: 2, Name: "Jane Smith"},
}

// GetUsers returns a list of all users
func GetUsers(c *gin.Context) {
    c.JSON(http.StatusOK, users)
}

// CreateUser creates a new user
func CreateUser(c *gin.Context) {
    var newUser User

    // Bind JSON input to the newUser object
    if err := c.ShouldBindJSON(&newUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    // Ensure a unique ID is assigned to the new user
    newUser.ID = len(users) + 1  // Incremental ID based on existing users count

    // Append the new user to the list
    users = append(users, newUser)

    // Return the created user with its ID
    c.JSON(http.StatusCreated, newUser)
}
