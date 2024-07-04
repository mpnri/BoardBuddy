package middleware

import (
	"board-buddy/services/utils"
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type (
	JWTConfig struct {
		Skipper    Skipper
		SigningKey interface{}
	}
	Skipper      func(c echo.Context) bool
	jwtExtractor func(echo.Context) (string, error)
)

var (
	ErrJWTMissing = echo.NewHTTPError(http.StatusUnauthorized, "missing or malformed jwt")
	ErrJWTInvalid = echo.NewHTTPError(http.StatusForbidden, "invalid or expired jwt")
)

func JWTWithConfig(config JWTConfig) echo.MiddlewareFunc {
	// extractor := jwtFromHeader("Authorization", "Token")
	extractor := jwtFromCookie()
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			auth, err := extractor(c)
			if err != nil {
				if config.Skipper != nil {
					if config.Skipper(c) {
						return next(c)
					}
				}
				// return c.JSON(http.StatusUnauthorized, utils.NewError(err))
				return c.JSON(http.StatusUnauthorized, err)
			}
			token, err := jwt.ParseWithClaims(auth, &utils.JwtCustomClaims{},
				func(token *jwt.Token) (interface{}, error) {
					if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
						return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
					}
					return config.SigningKey, nil
				})

			if err != nil {
				// return c.JSON(http.StatusForbidden, utils.NewError(ErrJWTInvalid))
				return c.JSON(http.StatusForbidden, ErrJWTInvalid)
			}
			if claims, ok := token.Claims.(*utils.JwtCustomClaims); ok && token.Valid {
				userID := claims.UserID
				c.Set("user_id", userID)
				return next(c)
			}
			// return c.JSON(http.StatusForbidden, utils.NewError(ErrJWTInvalid))
			return c.JSON(http.StatusForbidden, ErrJWTInvalid)
		}
	}
}

// jwtFromHeader returns a `jwtExtractor` that extracts token from the request header.
func jwtFromHeader(header string, authScheme string) jwtExtractor {
	return func(c echo.Context) (string, error) {
		auth := c.Request().Header.Get(header)
		l := len(authScheme)
		if len(auth) > l+1 && auth[:l] == authScheme {
			return auth[l+1:], nil
		}
		return "", ErrJWTMissing
	}
}

func jwtFromCookie() jwtExtractor {
	return func(c echo.Context) (string, error) {
		auth, err := c.Cookie("jwt")
		if err != nil {
			return "", ErrJWTMissing
		}

		return auth.Value, nil

	}
}

func CreateDefaultTokenMiddleWare() echo.MiddlewareFunc {
	return JWTWithConfig(JWTConfig{
		SigningKey: []byte(utils.GetJWTSecret()),
	})
}
