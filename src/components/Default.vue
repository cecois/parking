<template>
<div>

<div id="notmap" class="columns">
  <div id="brand" class="column is-one-fifth">I'm a Lot</div>
  <div id="brand" class="column is-one-fifth"></div>
</div>

<div class="has-text-right is-pulled-right" id="bio" v-bind:class="{'is-invisible':(!bio)}">
    {{bio}}
  </div>
      <div id="map" class="map"></div>

            <div class="modal"  v-bind:class="{'is-active':(slug)}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div id="copy" class="">copy</div>
  </div>
  <button class="modal-close is-large" aria-label="close" v-on:click="slug=null"></button>
</div>

</div>
</template>

<script>
const MODE=process.env.MODE

export default {
  name: 'Default',
  data () {
    return {
      color_default:'white',
      color_active:'yellow',
      lot: null,
      bio: null,
      slug: null,
      supply:null,
      map: null,
  tileLayer: null,
  lots: null,
      "temp": {
        msg:""
  }
}
  },
  computed: {
  },
  watch: {
    lot: function() {this.routize();this.lrender();}
  ,slug: function() {this.routize();}
  ,supply: function() {this.lrender();}
    },
  created() {
  },
  mounted() {
    this.lot=(typeof this.$route.params.lot !== 'undefined')?this.$route.params.lot:null;
    this.slug=(typeof this.$route.params.slug !== 'undefined')?this.$route.params.slug:null;
    this.initMap();
    this.initLayers();
    this.substyle();
},
  methods: {
    defaultStyle(){
var that=this;
return {
      fill:true
      ,color:that.color_default
      ,fillColor:that.color_default
      ,fillOpacity:.5
      ,opacity:.5
            }
    },
    activeStyle(){
var that=this;
return  {
      fill:true
      ,color:that.color_active
      ,fillColor:that.color_active
      ,fillOpacity:.7
            }
    },
    substyle(){
var that = this;
this.lots.eachLayer(function (layergrouplayer) {

layergrouplayer.eachLayer(function(f){

  if(f.feature.properties.objectid==that.lot){
      console.log("f.feature.properties.objectid v that.log")
  console.log(f.feature.properties.objectid,that.lot)
    f.setStyle(
     that.activeStyle()
      )
    that.bio=f.feature.properties.bio
    that.map.fitBounds(f.getBounds())
  } else {
    f.setStyle(that.defaultStyle())
  }
  f.bindPopup(f.feature.properties.siteaddres+", "+f.feature.properties.sitecity);
  f.on('click',function(e){
    that.lot=e.sourceTarget.feature.properties.objectid
  })
})
});

    },
    routize(){
      this.$router.push({ params:{bbox:this.map.getBounds().toBBoxString(),lot:this.lot,slug:this.slug }})
    },
    lrender(){
this.lots.clearLayers();
this.lots.addLayer(L.geoJson(this.supply, {style:this.defaultStyle()}));

this.substyle();
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
      let bbox =(typeof this.$route.params.bbox !== 'undefined')?this.prepBbox(this.$route.params.bbox):[[33.64197541854496,-84.84937816858294],[33.86519744005887,-83.85168224573135]]
// a little of ye ol that=this
      var that=this
      this.map = L.map('map').fitBounds(bbox)
      .on('moveend',function(e){
that.routize()
      })

this.tileLayer = L.tileLayer(
  'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
  {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }
);

this.lots = L.layerGroup(null).addTo(this.map)

this.tileLayer.addTo(this.map);

axios.get('https://cecmcgee.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM atl_tax_parcel_parking')
    .then(response => {
      // JSON responses are automatically parsed.
      this.supply = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
// }


    },
  initLayers() {},
    add_client_addl(){
this.clients.related.push({})
    }
  ,test(){
    console.info("test method")
}
  }// methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#brand{
  font-size:2.6em;
  font-weight:800;
  font-family: 'Slabo 27px', serif;
  letter-spacing:0px;
    padding:.5% 3%;
}
#app{
  padding:0;
  margin:0;
}
#lot{
  color:yellow;
}
#bio{
  padding:.5% 3%;
  background-color:rgba(255,255,255,.9);
  letter-spacing: -2px;
  font-size:2em;
  height:100%;
  width:90%;
}
#copy{
  color:yellow;
  font-weight:800;
}
#map{
  height:85vh;
  width:100%;
  position:absolute;
  margin:0;padding:0;
  z-index:-99;
}
#notmap{
  background-color:white;
  height:15vh;
  z-index:0;
  position:relative;
  width:100%;
  margin:0;padding:0;
}
</style>
