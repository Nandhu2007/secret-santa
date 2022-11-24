  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getDatabase,set,ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2W2Ux6ddTuheos01zKIWi8GZ-4fe7xsg",
    authDomain: "secret-santa-d39bf.firebaseapp.com",
    databaseURL: "https://secret-santa-d39bf-default-rtdb.firebaseio.com",
    projectId: "secret-santa-d39bf",
    storageBucket: "secret-santa-d39bf.appspot.com",
    messagingSenderId: "772134151096",
    appId: "1:772134151096:web:4923aaba89cf9cedac254d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
signup.addEventListener('click' ,(e) =>{
  var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var firstname = document.getElementById("FNAME").value
    var lastname = document.getElementById("LNAME").value

    createUserWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
          email: email,
          FirstName : firstname,
          LastName:lastname,
          password:password
      })

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        errorMessage = "Password is weak"
    }
    else if(errorMessage == "Firebase: Error (auth/invalid-email)."){
        errorMessage = "Invalid Email"
    }
    else if(errorMessage == "Firebase: Error (auth/email-already-in-use)."){
        errorMessage = "Email already in use"
    }
   
    var error = document.getElementById('error');
    error.innerHTML = errorMessage;

    // ..
  });
})
