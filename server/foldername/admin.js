const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config({
  path: "./server/.env",
});

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

async function verifyToken(req, res, next) {
  var idToken = req.headers.authorization;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.body.uid = decodedToken.uid;
      return next();
    })
    .catch((e) => {
      return res.status(401).send("You are not authorized!");
    });
}
module.exports = {
  admin: admin,
  verifyToken: verifyToken,
};
