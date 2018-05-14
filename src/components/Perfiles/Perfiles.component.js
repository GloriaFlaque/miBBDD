import firebase, { firestore } from 'firebase';
import { eventBus } from '../../Events/events_bus';


class Perfil{
  constructor(id, datos){
    this.id=id
    this.name = datos.Nombre
    console.log("NOMBRE PERFIL: "+this.name)
  }
}



export default {
  name: 'perfiles',
  components: {}, 
  props: [],
  data () {
    return {
      perfiles: []
    }
  },
  computed: {

  },
  mounted () {
    eventBus.$on('loginregister_userstatechanged', blestado => {
      //this.blIsLoggedUser=blestado
      if (blestado) {
        this.descargarPerfiles()
      }
    });
  },
  methods: {
    descargarPerfiles: function(){
      var that=this
      /*firebase.firestore().collection("Perfiles").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            that.perfiles.push(new Perfil(doc.id,doc.data()))
          });
    });*/
    firebase.firestore().collection("Perfiles").onSnapshot(function(querySnapshot) {
      that.perfiles = []
      querySnapshot.forEach(function(doc) {
        
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          that.perfiles.push(new Perfil(doc.id,doc.data()))
        });
  });
    }
  }
}
