/* ============================================================
   FIREBASE CONNECTION
   These values are safe to keep in a public repo — they only
   identify which Firebase project to talk to. Your data is
   protected by the Firestore security rules (which live only in
   your private Firebase console, NOT in this file).

   >>> WHERE IS THE COACH LIST? <<<
   It's NOT here anymore — on purpose, so no email is published.
   The approved coaches live only in your Firestore security
   RULES (Règles tab in the Firebase console). To add or remove
   a coach, edit the email list in those rules and click Publier.
   ============================================================ */

export const firebaseConfig = {
  apiKey: "AIzaSyDIdvictViYOyRC_rwuQsdyXEjHzC-r-rQ",
  authDomain: "rugby-planner-9773c.firebaseapp.com",
  projectId: "rugby-planner-9773c",
  storageBucket: "rugby-planner-9773c.firebasestorage.app",
  messagingSenderId: "7966874129",
  appId: "1:7966874129:web:f5041cc7530d4b24cb6fb0",
  measurementId: "G-4QLZPCQ45B"
};
