import LoginRegistro from '@/components/LoginRegistro'
import Perfiles from '@/components/Perfiles'
import { eventBus } from '../../Events/events_bus';

export default {
  name: 'principal',
  components: {'LoginRegistro':LoginRegistro,
  'Perfiles':Perfiles}, 
  props: [],
  data () {
    return {
      blIsLoggedUser:this.props_blIsLoggedIn
    }
  },
  created: function(){
 
  },
  computed: {

  },
  mounted () {
    eventBus.$on('loginregister_userstatechanged', blestado => {
      this.blIsLoggedUser=blestado
    });

  },
  methods: {

  }
}
