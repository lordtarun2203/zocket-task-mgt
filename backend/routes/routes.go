package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/lordtarun2203/zocket/controllers" // Ensure this matches your project structure
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/users", controllers.GetUsers)
    router.POST("/users", controllers.CreateUser)

    // ✅ Add task routes
    router.GET("/tasks", controllers.GetTasks)      // Fetch tasks
    router.POST("/tasks", controllers.CreateTask)   // Create task
    router.PUT("/tasks/:id", controllers.UpdateTask) // Update task
    router.DELETE("/tasks/:id", controllers.DeleteTask) // Delete task
}
