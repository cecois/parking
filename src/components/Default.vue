<template>
<div>
<!-- menu if there are ever more than the atl set
<h5 class="is-size-5">{{ lotset() }}</h5>
-->
    <div id="lot">{{lot}}</div>
    <div id="map" class="map"></div>

</div>
</template>

<script>

  // Client ID and API key from the Developer Console
// const CLIENT_ID = '230137934084-ikbhaf92sv0g7i95gs74ojg2bahlsh24.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyBm5zyDSJlclRJv0ToTK2_r-DbYPveUam8';

const CLIENT_ID = process.env.G_CLIENT_ID;
const API_KEY = process.env.G_API_KEY;
// Array of API discovery doc URLs for APIs used by the quickstart
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// const SCOPES = 'https://www.googleapis.com/auth/calendar';

import { db } from '../main'

export default {
  name: 'Default',
  data () {
    return {
      // lotsets:[
      //   {"handle":"ATL","active":true}
      //   ,{"handle":"CLE","active":false}
      // ],
      lot:null
      ,map: null
  ,tileLayer: null
  ,layers: []
      ,"temp": {
  }

}
  },
  computed: {

    // a computed getter
  },
  watch: {
      // '$route': 'switchLot'
      'this.map.move':function(){console.log("map moved")}
    },
  // firestore () {
  //   return {
  //     appointments: db.collection('appointments')
  //     // ,agencies:db.collection('agencies')
  //   }
  // },
  created() {
    // console.log("created process.env.DEFAULTSET",process.env.DEFAULTSET)
    // this.gc_api = gapi;
    // this.handleClientLoad();
    // this.gc_api.load('client:auth2', this.initClient);

    // console.log("this.gc_api in created",this.gc_api);
  },
  mounted() {
    // console.log("mounted process.env.DEFAULTSET",process.env.DEFAULTSET)
    let lotin=(typeof this.$route.params.lot !== 'undefined')?this.$route.params.lot:null;
    this.switchLot(lotin);
    // let ns=(typeof this.$route.params.lotset !== 'undefined')?this.$route.params.lotset:process.env.DEFAULTSET
    // this.switchSet(ns);
this.initMap();
  this.initLayers();
  // console.log("this.map",this.map)
    // this.gc_authorized=this.gc_api.auth2.getAuthInstance().isSignedIn
    // console.log("this.gc_api",this.gc_api);
  // console.log("NE:",process.env.NODE_ENV)
  // console.log("process.env::",process.env)
},
  methods: {
    switchSet(N){
      console.log("switchSet N",N);
    }
  ,switchLot(L){
      console.log("switchLot L - later this will rerender the lots layer, unhighlighting and re-highlighting the right one null checks and all that shit",L);
    }
    // ,lotset(){
    //   let y = this.$_.findWhere(this.lotsets,{active:true});
    //   return y.handle
    // }
    ,fetchData() {
       axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.lot+'/')
       .then((resp) => {
         this.coin = resp.data[0]
         console.log(resp)
       })
       .catch((err) => {
         console.log(err)
       })
     }
     ,prepBbox(b){
       let a = b.split(",")
       if(a.length<4){return "invalid bbox string"}else{
         return [
           [a[1],a[0]]
           ,[a[3],a[2]]
         ]
       }
     }
    ,initMap() {
      let bbox =(typeof this.$route.params.bbox !== 'undefined')?this.prepBbox(this.$route.params.bbox):[[33.14675022877648,-86.71783447265626],[34.25494631082515,-81.91680908203126]]
      this.map = L.map('map').fitBounds(bbox);
this.tileLayer = L.tileLayer(
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }
);
this.tileLayer.addTo(this.map);
    },
  initLayers() {},
    add_client_addl(){
this.clients.related.push({})
    }
  ,test(){
}
  },//methods
  computed: {

}//computed
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app{
  color:green;
  height:15vh;
  padding:0;
  margin:0;
}
#lot{
  color:yellow;
  height:10vh;
  width:20%;
  background-color:brown;
  float: right;
}
#map{
  background-color:red;
  height:85vh;
  width:100%;
  margin:0;padding:0;
}
</style>
