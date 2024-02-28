##  Genkey
keytool -genkey -v -keystore greenbee.keystore -alias greenbee -keyalg RSA -keysize 2048 -validity 10000

Owner: CN=EZC, OU=GreenBee, O=PNV, L=Da Nang, ST=DN, C=VN

#Upload key to Github Secrets
cat greenbee.keystore|base64

