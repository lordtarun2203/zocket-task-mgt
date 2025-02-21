package models

type Task struct {
    ID          uint   `json:"id" gorm:"primaryKey"` // ✅ Ensure ID exists
    Title       string `json:"title"`
    Description string `json:"description"`
    Status      string `json:"status"`
}
