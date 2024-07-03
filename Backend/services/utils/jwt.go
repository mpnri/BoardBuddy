package utils

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JwtCustomClaims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

func GenerateJWT(UID uint) string {
	claims := &JwtCustomClaims{
		UserID: UID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		panic(err)
	}

	return t
}
