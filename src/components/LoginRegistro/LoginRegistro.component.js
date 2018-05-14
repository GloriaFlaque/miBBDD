import firebase from 'firebase';
import { eventBus } from '../../Events/events_bus';



export default {
  name: 'login-registro',
  components: {}, 
  props: [],
  data () {
    return {
      blLoginVisible: true,
      sRegisterEmail: '',
      sRegisterPassword: '',
      sLoginEmail: '',
      sLoginPassword: ''
    }
   // sTitulo:"Login!!!"
  },

  created: function(){
    firebase.auth().onAuthStateChanged((user) => {
      this.props_objuser = user
      if (user){
        this.props_blIsLoggedIn = true
        console.log(user.uid+"!!!!")
        var docRef = firebase.firestore().collection("Perfiles").doc(user.uid+"");
        docRef.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              //this.props_objperfil = doc.data()
              this.setPerfil(doc.id, doc.data())
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      
      }
      else{
        this.props_blIsLoggedIn = false
      }
      eventBus.$emit('loginregister_userstatechanged',this.props_blIsLoggedIn)
    });
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    btnRegistrar1: function (event) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
      this.blLoginVisible=false;
      // body...
    },
     btnCancelar: function (event) {
      this.blLoginVisible=true;
      // body...
    },
    btnRegistrarse: function (event) {
      alert(this.sRegisterEmail+"---------"+this.sRegisterPassword)
      firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail,this.sRegisterPassword).then(
        function(user){
          var docRef = firebase.firestore().collection("Perfiles")
          docRef.doc(user.uid+"").set({Nombre: "Gloria"})
          //alert("Tu cuenta fue creada!!!" + user.name);
        },
        function(err){
          alert("Erreor en la creación de cuenta!!!"+ err);
        }
      );

      // body...
    },
    btnLogin: function (event) {
      console.log(this.sLoginEmail+"    !!!!!!!!!!!!!!!!!!!!!!!!      "+this.sLoginPassword)
      firebase.auth().signInWithEmailAndPassword(this.sLoginEmail,this.sLoginPassword).then(
        function(user){
          alert("Estas en tu cuenta!!!" + user.name);
        },
        function(err){
          alert("Erreor al entrar!!!"+ err);
        }
      );

      // body...
    },
    btnRegistrarGoogle: function (event){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
 
        var docRef = firebase.firestore().collection("Perfiles")
        docRef.doc(user.uid+"").set({email: user.email, nombre:"Gloria"})
        alert("Bienvenido!! "+ user.email);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
 
 btnRegistrarFacebook: function (event){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
 
        var docRef = firebase.firestore().collection("Perfiles")
        docRef.doc(user.uid+"").set({email: user.email, nombre:"Gloria"})
        alert("Bienvenido!! "+ user.email);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
    logout: function (event) {
      firebase.auth.singOut()
    },

    /*clickDeBotonRegistrarse:function(event) {
      this.blLoginVisible=false;
      this.sTitulo="Register!!!";
      console.log("Print que tal??");
      // body...
    },*/
    /*clickDeBotonAceptarRegistro:function(event) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error)){

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("---------- ")
      }

    });*/

  }
}
