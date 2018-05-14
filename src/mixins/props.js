class Perfil{
    constructor(id, datos){
      this.id=id
      this.name = datos.Nombre
      console.log("NOMBRE PERFIL: "+this.name)
    }
  }

export default{
    computed:{
        setPerfil (id, datosPerfil){
            props_objperfil = new Perfil(id, datosPerfil)
        }
    },
    data(){
        return {
            props_blIsLoggedIn:false,
            props_objuser: {},
            props_objperfil: {}
        }
    },
}