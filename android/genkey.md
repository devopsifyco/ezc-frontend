##  Genkey
keytool -genkey -v -keystore greenbee.keystore -alias greenbe -keyalg RSA -keysize 2048 -validity 10000

#Upload key to Github Secrets

cat greenbee.keystore | base64

openssl base64 < some_signing_key.jks | tr -d '\n' | tee some_signing_key.jks.base64.txt