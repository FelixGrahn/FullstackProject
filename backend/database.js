var admin = require("firebase-admin");

// var serviceAccount = require("./my-project-test-private-key.json");
let privatekey;
if (process.env.PRIVATE_KEY) {
	privatekey = JSON.parse(process.env.PRIVATE_KEY);
}
else {
	privatekey = require("./my-project-test-private-key.json");
}

admin.initializeApp({
  credential: admin.credential.cert(privatekey)
});


function getdatabase() {
  return admin.firestore()
}

module.exports = getdatabase
