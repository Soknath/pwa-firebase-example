import * as firebase from "firebase";
import axios from "axios";

export const initializeFirebase = () => {
  const config = {
    messagingSenderId: "938053603087"
  };
  firebase.initializeApp(config);
  // navigator.serviceWorker.register("/service-worker.js").then(registration => {
  //   firebase.messaging().useServiceWorker(registration);
  // });
};
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token :", token);
    localStorage.setItem("notification-token", token);
    fetch(
      "https://6e8e068474b8.ngrok.io/subscribers",{
        method: "POST",
        body: JSON.stringify(
          {
            empID: "50000658",
            subscription: token.toString()
          })
      }
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};
