package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/lordtarun2203/zocket/database"
	"github.com/lordtarun2203/zocket/routes"
	"github.com/lordtarun2203/zocket/websocket"
)

// CORS Middleware
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	// Initialize Database
	database.ConnectDB()

	// Setup Gin Router
	r := gin.Default()

	// Apply Middleware
	r.Use(CORSMiddleware())

	// Setup Routes
	routes.SetupRoutes(r)

	// Setup WebSocket
	websocket.SetupWebSocket(r)

	// Start Server
	port := ":8080"
	fmt.Println("🚀 Server running on http://localhost" + port)

	// Use Gin's built-in server runner
	if err := r.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
