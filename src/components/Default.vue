<template>
<div>
<!-- menu if there are ever more than the atl set
<h5 class="is-size-5">{{ lotset() }}</h5>
-->

<div id="notmap" class="columns">
  <div class="column is-four-fifths">is-four-fifths ({{temp.msg}})</div>
  <div class="column" id="lot">{{lot}}</div>
</div>
      <div id="map" class="map"></div>
</div>
</template>

<script>
// import { db } from '../main'
// const CLIENT_ID = process.env.G_CLIENT_ID;
// const API_KEY = process.env.G_API_KEY;

export default {
  name: 'Default',
  data () {
    return {
      lot: null,
      map: null,
  tileLayer: null,
  layers: [],
      "temp": {
        msg:""
  }
}
  },
  computed: {
  },
  watch: {
    'lot': function(){this.$router.push({ params:{bbox:this.map.getBounds().toBBoxString(),lot:this.lot }})}
    },
  created() {
  },
  mounted() {
    this.lot=(typeof this.$route.params.lot !== 'undefined')?this.$route.params.lot:null;
    this.initMap();
    this.initLayers();
},
  methods: {
    fetchData() {
       axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.map.getBounds().toBBoxString()+'/')
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
// a little of ye ol that=this
      var that=this
      this.map = L.map('map').fitBounds(bbox)
      .on('moveend',function(e){
that.$router.push({ params:{bbox:that.map.getBounds().toBBoxString(),lot:that.lot }})
// that.temp.msg="updated "+that.$moment().format('YYYY.mm.dd, h:mm:ss a')
      })

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
  }// methods
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
  background-color:brown;
  z-index:1;
}
#map{
  background-color:red;
  height:100%;
  z-index:-99;
  position:absolute;
  width:100%;
  margin:0;padding:0;
}
#notmap{
  background-color:yellow;
  height:15vh;
  z-index:0;
  position:relative;
  width:100%;
  margin:0;padding:0;
}
</style>
