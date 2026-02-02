package todo

type Todo struct {
	ID          int    `json:"id"`
	UserID      int    `json:"user_id"`
	Task        string `json:"task"`
	IsCompleted bool   `json:"is_completed"`
}

type ReqTodoPost struct {
	Task   string `json:"task"`
}

type ReqTodoPatch struct {
	Task        *string `json:"task"`
	IsCompleted *bool   `json:"is_completed"`
}
