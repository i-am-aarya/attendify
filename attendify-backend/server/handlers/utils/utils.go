package utils

import (
	"crypto/sha512"
	"encoding/hex"
)

// utility functions (that will be used in many places, defined here to reuse)

func HashSha512(stringToHash string) string {
	hasher := sha512.New()
	hasher.Write([]byte(stringToHash))
	hashBytes := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashBytes)
	return hashedPassword
}
