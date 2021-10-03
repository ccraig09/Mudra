import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from "../components/firebase";
// import * as Google from "expo-google-app-auth";
// import * as Facebook from "expo-facebook";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const db = firebase.firestore().collection("Members");
  const dbN = firebase.firestore().collection("Notifications");
  const dbME = firebase.firestore().collection("Members");

  const firebaseErrors = {
    "auth/app-deleted": "No se encontró la base de datos",
    "auth/expired-action-code": "El código de acción o el enlace ha caducado",
    "auth/invalid-action-code":
      "El código de acción no es válido. Esto puede suceder si el código está mal formado o ya se ha utilizado",
    "auth/user-disabled":
      "El usuario correspondiente a la credencial proporcionada ha sido deshabilitado",
    "auth/user-not-found": "El usuario no coincide con ninguna credencial",
    "auth/weak-password": "La contraseña es demasiado débil",
    "auth/email-already-in-use":
      "Ya tenía una cuenta con la dirección de correo electrónico proporcionada",
    "auth/invalid-email": "La dirección de correo electrónico no es válida",
    "auth/operation-not-allowed":
      "El tipo de cuenta correspondiente a esta credencial aún no está activado",
    "auth/account-exists-with-different-credential":
      "Correo electrónico ya asociado con otra cuenta",
    "auth/auth-domain-config-required":
      "No se ha proporcionado la configuración para la autenticación",
    "auth/credential-already-in-use":
      "Ya existe una cuenta para esta credencial",
    "auth/operation-not-supported-in-this-environment":
      "Esta operación no se admite en el entorno que se realiza. Asegúrese de que debe ser http o https",
    "auth/timeout":
      "Tiempo de respuesta excedido. Es posible que el dominio no esté autorizado para realizar operaciones",
    "auth/missing-android-pkg-name":
      "Se debe proporcionar un nombre de paquete para instalar la aplicación de Android",
    "auth/missing-continue-uri":
      "La siguiente URL debe proporcionarse en la solicitud",
    "auth/missing-ios-bundle-id":
      "Se debe proporcionar un nombre de paquete para instalar la aplicación iOS",
    "auth/invalid-continue-uri":
      "La siguiente URL proporcionada en la solicitud no es válida",
    "auth/unauthorized-continue-uri":
      "El dominio de la siguiente URL no está en la lista blanca",
    "auth/invalid-dynamic-link-domain":
      "El dominio de enlace dinámico proporcionado, no está autorizado o configurado en el proyecto actual",
    "auth/argument-error":
      "Verifique la configuración del enlace para la aplicación",
    "auth/invalid-persistence-type":
      "El tipo especificado para la persistencia de datos no es válido",
    "auth/unsupported-persistence-type":
      "El entorno actual no admite el tipo especificado para la persistencia de datos",
    "auth/invalid-credential": "La credencial ha caducado o está mal formada",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/invalid-verification-code":
      "El código de verificación de credencial no es válido",
    "auth/invalid-verification-id":
      "El ID de verificación de credencial no es válido",
    "auth/custom-token-mismatch":
      "El token es diferente del estándar solicitado",
    "auth/invalid-custom-token": "El token proporcionado no es válido",
    "auth/captcha-check-failed":
      "El token de respuesta reCAPTCHA no es válido, ha caducado o el dominio no está permitido",
    "auth/invalid-phone-number":
      "El número de teléfono está en un formato no válido (estándar E.164)",
    "auth/missing-phone-number": "El número de teléfono es obligatorio",
    "auth/quota-exceeded": "Se ha excedido la cuota de SMS",
    "auth/cancelled-popup-request":
      "Solo se permite una solicitud de ventana emergente a la vez",
    "auth/popup-blocked": "El navegador ha bloqueado la ventana emergente",
    "auth/popup-closed-by-user":
      "El usuario cerró la ventana emergente sin completar el inicio de sesión en el proveedor",
    "auth/unauthorized-domain":
      "El dominio de la aplicación no está autorizado para realizar operaciones",
    "auth/invalid-user-token": "El usuario actual no fue identificado",
    "auth/user-token-expired": "El token del usuario actual ha caducado",
    "auth/null-user": "El usuario actual es nulo",
    "auth/app-not-authorized":
      "Aplicación no autorizada para autenticarse con la clave dada",
    "auth/invalid-api-key": "La clave API proporcionada no es válida",
    "auth/network-request-failed": "Error al conectarse a la red",
    "auth/requires-recent-login":
      "El último tiempo de acceso del usuario no cumple con el límite de seguridad",
    "auth/too-many-requests":
      "Las solicitudes se bloquearon debido a una actividad inusual. Vuelva a intentarlo después de un tiempo",
    "auth/web-storage-unsupported":
      "El navegador no es compatible con el almacenamiento o si el usuario ha deshabilitado esta función",
    "auth/invalid-claims":
      "Los atributos de registro personalizados no son válidos",
    "auth/claims-too-large":
      "El tamaño de la solicitud excede el tamaño máximo permitido de 1 Megabyte",
    "auth/id-token-expired": "El token informado ha caducado",
    "auth/id-token-revoked": "El token informado ha caducado",
    "auth/invalid-argument":
      "Se proporcionó un argumento no válido a un método",
    "auth/invalid-creation-time":
      "La hora de creación debe ser una fecha UTC válida",
    "auth/invalid-disabled-field":
      "La propiedad para el usuario deshabilitado no es válida",
    "auth/invalid-display-name": "El nombre de usuario no es válido",
    "auth/invalid-email-verified": "El correo electrónico no es válido",
    "auth/invalid-hash-algorithm":
      "El algoritmo HASH no es compatible con la criptografía",
    "auth/invalid-hash-block-size": " El tamaño del bloque HASH no es válido ",
    "auth/invalid-hash-derived-key-length":
      "El tamaño de la clave derivada de HASH no es válido",
    "auth/invalid-hash-key":
      "La clave HASH debe tener un búfer de bytes válido",
    "auth/invalid-hash-memory-cost": "El costo de la memoria HASH no es válido",
    "auth/invalid-hash-parallelization": "La carga paralela HASH no es válida",
    "auth/invalid-hash-rounds": "El redondeo HASH no es válido",
    "auth/invalid-hash-salt-separator":
      "El campo separador SALT del algoritmo de generación HASH debe ser un búfer de bytes válido",
    "auth/invalid-id-token": "El código de token ingresado no es válido",
    "auth/invalid-last-sign-in-time":
      "La última hora de inicio de sesión debe ser una fecha UTC válida",
    "auth/invalid-page-token":
      "La siguiente URL proporcionada en la solicitud no es válida",
    "auth/invalid-password":
      "La contraseña no es válida, debe tener al menos 6 caracteres de longitud",
    "auth/invalid-password-hash": "La contraseña HASH no es válida",
    "auth/invalid-password-salt": "La contraseña SALT no es válida",
    "auth/invalid-photo-url": "La URL de la foto del usuario no es válida",
    "auth/invalid-provider-id":
      "El identificador del proveedor no es compatible",
    "auth/invalid-session-cookie-duration":
      "La duración de la COOKIE de la sesión debe ser un número válido en milisegundos, entre 5 minutos y 2 semanas",
    "auth/invalid-uid":
      "El identificador proporcionado debe tener un máximo de 128 caracteres",
    "auth/invalid-user-import":
      "El registro de usuario a importar no es válido",
    "auth/invalid-provider-data": "El proveedor de datos no es válido",
    "auth/maximum-user-count-exceeded":
      "Se ha excedido el número máximo permitido de usuarios a importar",
    "auth/missing-hash-algorithm":
      "Es necesario proporcionar el algoritmo de generación HASH y sus parámetros para importar usuarios",
    "auth/missing-uid": "Se requiere un identificador para la operación actual",
    "auth/reserved-claims":
      "Una o más propiedades personalizadas proporcionaron palabras reservadas usadas",
    "auth/session-cookie-revoked": "La sesión COOKIE ha expirado",
    "auth/uid-alread-exists": "El identificador proporcionado ya está en uso",
    "auth/email-already-exists":
      "El correo electrónico proporcionado ya está en uso",
    "auth/phone-number-already-exists":
      "El teléfono proporcionado ya está en uso",
    "auth/project-not-found": "No se encontraron proyectos",
    "auth/insufficient-permission":
      "La credencial utilizada no tiene acceso al recurso solicitado",
    "auth/internal-error":
      "El servidor de autenticación encontró un error inesperado al intentar procesar la solicitud",
  };

  //  const userId = firebase.auth().currentUser.uid;
  // KZhQMNuejvhZwAxtQeNBsdwmdep1

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
            console.log(e.code);
          }
        },
        register: async (fName, lName, email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                db.doc(firebase.auth().currentUser.uid).set({
                  userId: firebase.auth().currentUser.uid,
                  FirstName: fName,
                  LastName: lName,
                  Phone: "",
                  email: email,
                  plan: "",
                  startDate: "",
                  endDate: "",
                  goal: "",
                  points: "",
                  history: "",
                  sport: "",
                  Age: "",
                  Height: "",
                  Weight: "",
                  Gender: "",
                  BaseStartDate: "",
                  Imc: "",
                  Grasa: "",
                  Musculo: "",
                  Basal: "",
                  GoalBasal: "",
                  Agua: "",
                  Proteina: "",
                  Osea: "",
                  Metabolica: "",
                  Viseral: "",
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  userImg: null,
                });
              });
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
          try {
            await AsyncStorage.clear();
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        forgotPassword: async (email) => {
          try {
            await firebase.auth().sendPasswordResetEmail(email);
            Alert.alert("Correo Enviado");
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },

        // signInWithGoogle: async () => {
        //   const config = {
        //     iosClientId: `989650982349-lpv8mh9npj3grvvlt3etpm3904rkegcq.apps.googleusercontent.com`,
        //     androidClientId: `989650982349-9nkggscnb4a0jjji9ufani659rjkebvm.apps.googleusercontent.com`,
        //     scopes: ["profile", "email"],
        //   };

        //   Google.logInAsync(config)
        //     .then((logInResult) => {
        //       // const { type, user } = result;
        //       if (logInResult.type === "success") {
        //         const { idToken, accessToken } = logInResult;
        //         console.log("g2g", logInResult);
        //         const credential = firebase.auth.GoogleAuthProvider.credential(
        //           idToken,
        //           accessToken
        //         );

        //         return firebase.auth().signInWithCredential(credential);
        //         // Successful sign in is handled by firebase.auth().onAuthStateChanged
        //       } else {
        //         console.log("failed");
        //       }
        //     })
        //     .catch((error) => {
        //       const errorMes = firebaseErrors[error.code];
        //       alert(errorMes);
        //       console.log(errorMes);
        //     });
        // },
        // signUpWithGoogle: async () => {
        //   const config = {
        //     iosClientId: `989650982349-lpv8mh9npj3grvvlt3etpm3904rkegcq.apps.googleusercontent.com`,
        //     androidClientId: `989650982349-9nkggscnb4a0jjji9ufani659rjkebvm.apps.googleusercontent.com`,
        //     scopes: ["profile", "email"],
        //   };

        //   Google.logInAsync(config)
        //     .then((logInResult) => {
        //       // const { type, user } = result;
        //       if (logInResult.type === "success") {
        //         const { idToken, accessToken } = logInResult;

        //         AsyncStorage.setItem(
        //           "userData",
        //           JSON.stringify({
        //             // avatar: logInResult.user.avatar.toString(),
        //             // token: token,
        //             // userId: userId,
        //             givenName: logInResult.user.givenName.toString(),
        //           })
        //         );

        //         const credential = firebase.auth.GoogleAuthProvider.credential(
        //           idToken,
        //           accessToken
        //         );

        //         return firebase
        //           .auth()
        //           .signInWithCredential(credential)
        //           .then(() => {
        //             console.log(
        //               "loading current deets",
        //               firebase.auth().currentUser
        //             );
        //             db.doc(firebase.auth().currentUser.uid).set({
        //               userId: firebase.auth().currentUser.uid,
        //               FirstName: logInResult.user.givenName.toString(),
        //               LastName: logInResult.user.familyName.toString(),
        //               Phone: "",
        //               email: firebase.auth().currentUser.providerData[0].email,
        //               plan: "",
        //               startDate: "",
        //               endDate: "",
        //               goal: "",
        //               points: "",
        //               history: "",
        //               sport: "",
        //               Age: "",
        //               Height: "",
        //               Weight: "",
        //               Gender: "",
        //               BaseStartDate: "",
        //               Imc: "",
        //               Grasa: "",
        //               Musculo: "",
        //               Basal: "",
        //               GoalBasal: "",
        //               Agua: "",
        //               Proteina: "",
        //               Osea: "",
        //               Metabolica: "",
        //               Viseral: "",
        //               createdAt:
        //                 firebase.firestore.FieldValue.serverTimestamp(),
        //               userImg: logInResult.user.photoUrl.toString(),
        //             });
        //           });
        //         // Successful sign in is handled by firebase.auth().onAuthStateChanged
        //       } else {
        //         console.log("failed");
        //       }
        //     })
        //     .catch((error) => {
        //       const errorMes = firebaseErrors[e.code];
        //       alert(errorMes);
        //       console.log(errorMes);
        //     });
        // },

        // signInWithFacebook: async () => {
        //   // console.log("fb login1");
        //   try {
        //     await Facebook.initializeAsync({
        //       appId: "571053457413299",
        //       // appName: "rnNoExcusas",
        //     });
        //     const {
        //       type,
        //       token,
        //       expirationDate,
        //       permissions,
        //       declinedPermissions,
        //     } = await Facebook.logInWithReadPermissionsAsync({
        //       permissions: ["public_profile"],
        //     });

        //     if (type === "success") {
        //       console.log("good until here", token);
        //       const credential =
        //         firebase.auth.FacebookAuthProvider.credential(token);
        //       // const response = await fetch(
        //       //   // `https://graph.facebook.com/me?access_token=${token}`
        //       //   `https://graph.facebook.com/v6.0/me?access_token=${token}&fields=id,name,email,picture.height(961) `
        //       // ).then((response) => {
        //       //   response.json().then((json) => {
        //       //     // console.log(json.name);
        //       //     // console.log(json.picture.data.url);
        //       //   });
        //       // });
        //       await firebase
        //         .auth()
        //         .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        //       await firebase.auth().signInWithCredential(credential);

        //       firebase.auth().onAuthStateChanged(function (user) {});
        //     } else {
        //       return { cancelled: true };
        //     }
        //   } catch ({ message }) {
        //     alert(`Facebook Login Error:: ${message}`);
        //     console.log(message);
        //   }
        // },
        // signUpWithFacebook: async () => {
        //   // console.log("fb login1");
        //   try {
        //     await Facebook.initializeAsync({
        //       appId: "571053457413299",
        //       // appName: "rnNoExcusas",
        //     });
        //     const {
        //       type,
        //       token,
        //       expirationDate,
        //       permissions,
        //       declinedPermissions,
        //     } = await Facebook.logInWithReadPermissionsAsync({
        //       permissions: ["public_profile"],
        //     });

        //     if (type === "success") {
        //       const credential =
        //         firebase.auth.FacebookAuthProvider.credential(token);
        //       const response = await fetch(
        //         //   // `https://graph.facebook.com/me?access_token=${token}`
        //         `https://graph.facebook.com/v6.0/me?access_token=${token}&fields=id,name,email,picture.height(961) `
        //       ).then((response) => {
        //         response.json().then((json) => {
        //           var fullName = json.name.split(" ");
        //           var firstName = fullName[0];
        //           // console.log(json.picture.data.url);
        //           AsyncStorage.setItem(
        //             "userData",
        //             JSON.stringify({
        //               // avatar: logInResult.user.avatar.toString(),
        //               // token: token,
        //               // userId: userId,
        //               givenName: firstName,
        //             })
        //           );

        //           // await firebase
        //           //   .auth()
        //           //   .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        //           return firebase
        //             .auth()
        //             .signInWithCredential(credential)
        //             .then(() => {
        //               console.log(
        //                 "loading current deets",
        //                 firebase.auth().currentUser
        //               );
        //               db.doc(firebase.auth().currentUser.uid).set({
        //                 userId: firebase.auth().currentUser.uid,
        //                 FirstName: firstName,
        //                 LastName: "",
        //                 Phone: "",
        //                 email:
        //                   firebase.auth().currentUser.providerData[0].email,
        //                 plan: "",
        //                 startDate: "",
        //                 endDate: "",
        //                 goal: "",
        //                 points: "",
        //                 history: "",
        //                 sport: "",
        //                 Age: "",
        //                 Height: "",
        //                 Weight: "",
        //                 Gender: "",
        //                 BaseStartDate: "",
        //                 Imc: "",
        //                 Grasa: "",
        //                 Musculo: "",
        //                 Basal: "",
        //                 GoalBasal: "",
        //                 Agua: "",
        //                 Proteina: "",
        //                 Osea: "",
        //                 Metabolica: "",
        //                 Viseral: "",

        //                 createdAt:
        //                   firebase.firestore.FieldValue.serverTimestamp(),
        //                 userImg: json.picture.data.url,
        //               });
        //             });
        //         });
        //       });
        //       // firebase.auth().onAuthStateChanged(function (user) {
        //       //   if (user) {
        //       //     console.log("this is authstatechange user  ", user);
        //       //     const userRes = user.toJSON().stsTokenManager;
        //       //     // user.getIdToken().then(function (idToken) {
        //       //     var token = userRes.accessToken.toString();
        //       //     var userId = user.uid.toString();
        //       //     var givenName = user.displayName;
        //       //     // var time = userRes.expirationTime.toString();
        //       //     var avatar = user.photoURL + "?height=600";

        //       //     console.log("this is tkn", token);
        //       //     console.log("this is id", userId);
        //       //     console.log("this is pic", avatar);
        //       //     console.log("this is name", givenName);

        //       //     // dispatch(
        //       //     //   authActions.loginWithFacebook(userId, token, avatar, givenName)
        //       //     // );

        //       //     // dispatch(authenticate(userId, token));
        //       //   }
        //       // });
        //     }
        //   } catch ({ message }) {
        //     alert(`Facebook Login Error:: ${message}`);
        //     console.log(message);
        //   }
        // },

        deleteProduct: async (key) => {
          try {
            console.log("Firebase Delete product", key);
            await db
              .doc(user.uid)
              .collection("Member Products")
              .doc(key)
              .delete();
          } catch (e) {
            console.log(e);
          }
        },

        editProfile: async (userInfo, userImg) => {
          try {
            await db.doc(user.uid).set(
              {
                FirstName: userInfo.FirstName,
                LastName: userInfo.LastName,
                Phone: userInfo.Phone,
                email: userInfo.email,
                goal: userInfo.goal,
                history: userInfo.history,
                sport: userInfo.sport,
                Age: userInfo.Age,
                Height: userInfo.Height,
                Weight: userInfo.Weight,
                Gender: userInfo.Gender,
                BaseStartDate: userInfo.BaseStartDate,
                Imc: userInfo.Imc,
                Grasa: userInfo.Grasa,
                Musculo: userInfo.Musculo,
                Basal: userInfo.Basal,
                GoalBasal: userInfo.GoalBasal,
                Agua: userInfo.Agua,
                Proteina: userInfo.Proteina,
                Osea: userInfo.Osea,
                Metabolica: userInfo.Metabolica,
                Viseral: userInfo.Viseral,

                userImg,
              },
              { merge: true }
            );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log("error while uploading", e);
          }
        },
        newEval: async (title) => {
          console.log("creating new eval", title);
          try {
            await dbME.doc(user.uid).collection("Member Evals").doc().set(
              {
                title: title,
                ownerId: user.uid,
                Imc: "",
                Grasa: "",
                Musculo: "",
                Basal: "",
                GoalBasal: "",
                Agua: "",
                Proteina: "",
                Osea: "",
                Metabolica: "",
                Viseral: "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        addToken: async (expoPushToken) => {
          try {
            console.log("uploading expo token", expoPushToken);

            await dbME.doc(user.uid).set(
              {
                expoPushToken,

                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
            console.log(e);
          }
        },
        sendReservation: async (
          Title,
          plan,
          time,
          startDate,
          extraInfoData,
          extraInfoDataCelular,
          extraInfoDataGoals
        ) => {
          console.log(
            "creating new notification",
            Title,
            plan,
            time,
            startDate,
            extraInfoData,
            extraInfoDataCelular,
            extraInfoDataGoals
          );
          try {
            await dbN.doc().set(
              {
                Title: Title,
                Plan: plan,
                Time: time,
                startDate: startDate,
                extraInfo: extraInfoData,
                Cell: extraInfoDataCelular,
                Goals: extraInfoDataGoals,
                Status: "Pendiente",
                userId: user.uid,

                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        editEval: async (evalInfo, evalId) => {
          // console.log("creating new eval", title);
          try {
            await dbME.doc(user.uid).collection("Member Evals").doc(evalId).set(
              {
                Imc: evalInfo.Imc,
                Grasa: evalInfo.Grasa,
                Musculo: evalInfo.Musculo,
                Basal: evalInfo.Basal,
                GoalBasal: evalInfo.GoalBasal,
                Agua: evalInfo.Agua,
                Proteina: evalInfo.Proteina,
                Osea: evalInfo.Osea,
                Metabolica: evalInfo.Metabolica,
                Viseral: evalInfo.Viseral,

                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        deleteEval: async (docId) => {
          console.log("deleteing eval", docId);
          try {
            await dbME
              .doc(user.uid)
              .collection("Member Evals")
              .doc(docId)
              .delete();
          } catch (e) {
            console.log(e);
          }
        },
        deleteImage: async (type) => {
          console.log("Deleting Image", type);
          try {
            await firebase
              .storage()
              .ref()
              .child(`UserBaseImages/${user.uid}/${type}`)
              .delete()
              .then(
                dbME.doc(user.uid).update({
                  [type]: firebase.firestore.FieldValue.delete(),
                })
              );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
        deleteEvalImage: async (type, Eid, docId) => {
          console.log("Deleting Image", type);
          try {
            await firebase
              .storage()
              .ref()
              .child(`UserBaseImages/${user.uid}/${Eid}/${type}`)
              .delete()
              .then(
                dbME
                  .doc(user.uid)
                  .collection("Member Evals")
                  .doc(docId)
                  .update({
                    [type]: firebase.firestore.FieldValue.delete(),
                  })
              );
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
