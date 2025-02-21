package database

import (
    "fmt"
    "log"
    

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "github.com/joho/godotenv"

    "github.com/lordtarun2203/zocket/models" // Import models, not itself
)

var DB *gorm.DB

func ConnectDB() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    dsn := "host=localhost user=postgres password=chikkubaby dbname=taskdb port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    DB = db
    fmt.Println("✅ Database connected successfully!")
}

func Migrate() {
    err := DB.AutoMigrate(&models.User{}, &models.Task{})
    if err != nil {
        log.Fatal("Migration failed:", err)
    }
    fmt.Println("✅ Database Migration Completed!")
}
