<template>
<div>

<div id="notmap" class="columns">
  <div id="brand" class="column is-one-fifth">
    <!-- I'm a Lot -->
  </div>
  <div id="brand" class="column is-one-fifth"></div>
</div>

<div class="has-text-right is-pulled-right" id="bio" v-bind:class="{'is-invisible':(!bio)}">
    {{bio}}
  </div>
      <div id="map" class="map"></div>
<ul id="map-menu" class="columns is-one-third">
  <li v-for="map in this.basemaps" class="column">
    <div v-tooltip="{
  content: map.nom,
  placement: 'top-center',
  classes: ['info'],
  targetClasses: ['it-has-a-tooltip'],
  offset: 10,
  delay: {
    show:0,
    hide: 50,
  },
}" class="map-menu-item" v-bind:class="{'active':(map.active)}" style='background-image: url("../assets/dark_all.png");'></div>
    </li>
</ul>
</div>
</template>

<script>
const MODE=process.env.MODE

export default {
  name: 'Default',
  data () {
    return {
      basemaps:[
      {source:"carto.com",key:"dark_all",nom:"Carto Dark",uri:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",active:true}
      ,{source:"carto.com",key:"light_all",nom:"Carto Light",uri:"http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",active:false}
      ,{source:"esri",key:"esri_gray_dark",nom:"Esri Gray Dark",uri:"http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",active:false}
      ,{source:"esri",key:"esri_gray_light",nom:"Esri Gray Light",uri:"http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",active:false}
      ,{source:"esri",key:"esri_natgeo",nom:"Esri National Geographic",uri:"http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",active:false}
      ,{source:"wmflabs.org",key:"mapnik_bw",nom:"Mapnik B/W",uri:"http://a.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",active:false}
      ,{source:"stamen.com",key:"stamen_toner",nom:"Stamen Toner",uri:"http://tile.stamen.com/toner/{z}/{x}/{y}.png",active:false}
      ,{source:"stamen.com",key:"stamen_toner_lite",nom:"Stamen Toner Light",uri:"http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png",active:false}
      ,{source:"stamen.com",key:"stamen_watercolor",nom:"Stamen Watercolor",uri:"http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",active:false}
      ,{source:"waze.com",key:"waze_us",nom:"Waze US",uri:"https://livemap-tiles3.waze.com/tiles/{z}/{x}/{y}.png",active:false}
      ,{source:"yandex.net",key:"yandex",nom:"Yandex",uri:"http://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}",active:false}
      ],
      color_default:'white',
      color_active:null,
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
basemap:function(){
  // return this.basemaps[0];
  return this.$_.findWhere(this.basemaps, {active:true});
}
  },
  watch: {
    lot: function() {this.routize();this.lrender();}
  ,slug: function() {this.routize();}
  ,supply: function() {this.lrender();}
    },
  created() {
    // this.basemap=(typeof this.$route.params.basemap !== 'undefined')?this.switchMap(this.$route.params.basemap):this.$_.findWhere(this.basemaps, {active:true});
  },
  mounted() {
    if(typeof this.$route.params.map !== 'undefined' && this.$route.params.map!==null){this.switchMap(this.$route.params.map)}else{this.$_.findWhere(this.basemaps, {active:true});}
    this.color_active=(typeof this.$route.params.hue !== 'undefined')?this.$route.params.hue:'yellow';
this.lot=(typeof this.$route.params.lot !== 'undefined')?this.$route.params.lot:null;
    this.slug=(typeof this.$route.params.slug !== 'undefined')?this.$route.params.slug:null;

    this.initMap();
    this.initLayers();
    this.substyle();
},
  methods: {
    switchMap(n){
      this.$_.each(this.basemaps,(b)=>{
        if(b.key==n){b.active=true}else{b.active=false}
      })

    },
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
      this.$router.push({ params:{bbox:this.map.getBounds().toBBoxString(),lot:this.lot,slug:this.slug,basemap:this.basemap,hue:this.color_active }})
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
  this.$_.findWhere(this.basemaps, {active:true}).uri,
  {
    maxZoom: 18,
    isBaseMap:true,
    attribution: '&copy; data:<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; basemap:'+this.basemap.source
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
#map-menu{
  height:5vh;
  /*width:30%;*/
  position:absolute;
  /*margin:0;padding:0 2%;*/
  margin:0;
  padding:.5% .5%;
  bottom:0;
  background-color:rgba(255,255,255,.5);
  z-index:-98;
}

#map-menu > li{padding:0 3px;}

  #map-menu > li > .map-menu-item{
    background-color:white;
    padding: 0px;
/* line-height: 34px; */
border-radius:50%;
    /* margin-right:1%; */
    border-color:white;
    border-style: solid;
    border-width:1px;
    height:34px;
    width:34px;
  }
  #map-menu > li > .map-menu-item:hover{
    border-color:black;
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, .2)
  }
    #map-menu > li > .map-menu-item.active{
      border-color:black;
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, .8)
    }
#notmap{
  background-color:white;
  height:15vh;
  z-index:0;
  position:relative;
  width:100%;
  margin:0;padding:0;
}
/** --------------------------------------------- tooltip ----------------- **/
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  opacity: .5;
  color: white;
  border-radius: 3px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  opacity:.5;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
/** ------------------------- /tooltip ----------------- **/

</style>
