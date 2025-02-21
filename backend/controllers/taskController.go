package controllers

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv" // ✅ Needed for string-to-uint conversion
    "github.com/lordtarun2203/zocket/models" // Import Task model
)

var tasks = []models.Task{ // Temporary in-memory data
    {ID: 1, Title: "First Task", Description: "This is a sample task"},
}

// Get all tasks
func GetTasks(c *gin.Context) {
    c.JSON(http.StatusOK, tasks)
}

// Create a new task
func CreateTask(c *gin.Context) {
    var newTask models.Task
    if err := c.ShouldBindJSON(&newTask); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // ✅ Proper ID increment (use database-generated IDs in production)
    if len(tasks) > 0 {
        newTask.ID = tasks[len(tasks)-1].ID + 1
    } else {
        newTask.ID = 1
    }
    
    tasks = append(tasks, newTask)
    c.JSON(http.StatusCreated, newTask)
}

// Update task
func UpdateTask(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id")) // ✅ Convert string ID to int
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    for i, task := range tasks {
        if task.ID == uint(id) { // ✅ Correct uint comparison
            if err := c.ShouldBindJSON(&tasks[i]); err != nil {
                c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
                return
            }
            c.JSON(http.StatusOK, tasks[i])
            return
        }
    }

    c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

// Delete task
// Delete task
func DeleteTask(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id")) // ✅ Convert string ID to int
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    for i, task := range tasks {
        if task.ID == uint(id) { // ✅ Correct uint comparison
            tasks = append(tasks[:i], tasks[i+1:]...) // Remove task
            c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
            return
        }
    }

    c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
}

