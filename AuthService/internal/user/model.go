package user

type User struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type ReqUserRegister struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type ReqUserLogin struct {
	Email string `json:"email"`
	Password string `json:"password"`
}