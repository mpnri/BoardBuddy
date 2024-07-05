package utils

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type JwtCustomClaims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

func GetJWTSecret() string {
	return os.Getenv("SECRET")
}

func GenerateJWT(UID uint) string {
	claims := JwtCustomClaims{
		UserID: UID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(GetJWTSecret()))
	if err != nil {
		panic(err)
	}

	return t
}

func GetUserIDFromToken(c echo.Context) uint {
	id, ok := c.Get("user_id").(uint)
	if !ok {
		return 0
	}
	return id
}
