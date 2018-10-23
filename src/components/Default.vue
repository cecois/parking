<template>
<div>

      <h5 class="is-size-5">{{ temp.lotset }}</h5>
      <p>{{ temp.lot }}</p>

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
      map: null
  ,tileLayer: null
  ,layers: []
      ,"temp": {
"lotset":null
  }
  
}
  },
  // firestore () {
  //   return {
  //     appointments: db.collection('appointments')
  //     // ,agencies:db.collection('agencies')
  //   }
  // },
  created() {
    console.log("created process.env.DEFAULTSET",process.env.DEFAULTSET)
    // this.gc_api = gapi;
    // this.handleClientLoad();
    // this.gc_api.load('client:auth2', this.initClient);
      
    // console.log("this.gc_api in created",this.gc_api);
  },
  mounted() {
    console.log("mounted process.env.DEFAULTSET",process.env.DEFAULTSET)
    this.temp.lotset=(typeof this.$route.params.lotset !== 'undefined')?this.$route.params.lotset:process.env.DEFAULTSET
// this.initMap();
//   this.initLayers();
  // console.log("this.map",this.map)
    // this.gc_authorized=this.gc_api.auth2.getAuthInstance().isSignedIn
    // console.log("this.gc_api",this.gc_api);
  // console.log("NE:",process.env.NODE_ENV)
  // console.log("process.env::",process.env)
},
  methods: {
//     initMap() {
//       this.map = L.map('map').setView([38.63, -90.23], 12);
// this.tileLayer = L.tileLayer(
//   'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
//   {
//     maxZoom: 18,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//   }
// );
// this.tileLayer.addTo(this.map);
//     },
  // initLayers() {},
//     add_client_addl(){
// this.clients.related.push({})
//     },
//     getAppointmentDate(){

// // NEEDS CONFIRM - some pro/self logic goes here
// let delaydays = (this.appointment.transpo=='professional')?7:0;

// // 1. call to gcal - whats the first hour during open hours of business on or after that date?
// // WE NEED here: open hours and a source of occasional/emergency closures

//     }
  test(){
// console.log("this.route",this.$route)
// console.log("this.map",this.map)
// console.log(this.$_.pluck(this.agencies,'name'))
}
// ,simpleSuggestionList() {
// let agencies = this.$_.uniq(this.$_.map(this.appointments,(apt)=>{
//   return apt.agency.agency_name;
// }));
// return agencies

//       },
    // addAppointment (name, image) {
    //   // const createdAt = new Date()

    //   // db.collection('appointments').add({ name, image, createdAt })
    // },
    // deleteAppointment (id) {
    //   // db.collection('appointments').doc(id).delete()
    // }
    // ,changeStatusRadio (which,truth){
    //   this.$_.each(this[which],(k)=>{
    //     console.log("k",k);
    //     k.status = (k.key!==truth)?false:true;
    //   })
    // }
//     ,prepKitchenArray (event) {
// this.appointment.needs.kitchen=this.$_.map(event.target.value.split(","),(e)=>{return e.trim();});
//     }
//     ,prepSmallArray (event) {
// this.appointment.needs.small=this.$_.map(event.target.value.split(","),(e)=>{return e.trim();});
//     }
    // ,testAppointment (referringAgencyName) {
    //   console.log(referringAgencyName)
    // }
//     ,onSuggestAgencySelect (s){
//       // we don't use ids for agencies (no point except to make specifically this easier)
// // 0. filter by that agency's appts
// // 1. reduce to id,date,address-on-file
// // 2. sort by date, take newest
// let this_agency_appts = this.$_.filter(this.appointments,(appt)=>{return appt.agency.agency_name==s});
// let most_recent_appt = this.$_.last(this.$_.sortBy(this_agency_appts,(a)=>{return a.appointment.appointment_date_final}))


// // 3. deposit data from newest into agency.* values
//       this.agency.agency_addressstreet = (typeof most_recent_appt.agency.agency_addressstreet == 'undefined' || most_recent_appt.agency.agency_addressstreet=='')?"no address on file - please type it here":most_recent_appt.agency.agency_addressstreet;
//       this.agency.agency_advocate_name = (typeof most_recent_appt.agency.agency_advocate_name == 'undefined' || most_recent_appt.agency.agency_advocate_name=='')?"no address on file - please type it here":most_recent_appt.agency.agency_advocate_name;
//       this.agency.agency_advocate_title = (typeof most_recent_appt.agency.agency_advocate_title == 'undefined' || most_recent_appt.agency.agency_advocate_title=='')?"no job title on file for this agent - please type it here":most_recent_appt.agency.agency_advocate_title;    this.agency.agency_advocate_phone = (typeof most_recent_appt.agency.agency_advocate_phone == 'undefined' || most_recent_appt.agency.agency_advocate_phone=='')?"no job title on file for this agent - please type it here":most_recent_appt.agency.agency_advocate_phone;


//     }
    // ,onComplete (){
    //   console.log(JSON.stringify(this))
    // }
//     ,similar () {

//       let names_extant = this.$_.uniq(this.$_.map(this.appointments,(appt)=>{
//         var names=[]
//         names.push(appt.clients.primary.client_name_last+", "+appt.clients.primary.client_name_first)

//         this.$_.each(appt.clients.related,(cr)=>{
//           if(cr.client_name_last.length>0 && cr.client_name_first.length>0){
//                     names.push(cr.client_name_last+", "+cr.client_name_first);}
//         })
//       return names
//             }))//map.uniq


//       var name_current = this.clients.primary.client_name_last+', '+this.clients.primary.client_name_first

//       let FLAGGED = this.$_.filter(this.$_.map(names_extant,(n)=>{
// if(this.$levenshtein(n, name_current)<10){console.log("n",n);console.log("nc",name_current)}
//               let t = {name:n,levenshtein:this.$levenshtein(n, name_current)}
//               console.log("t",t);
//               return t
//             }),(t)=>{
//         return t.levenshtein<=5;
//             });//flag
// console.log("FLAGGED",FLAGGED);
// if(FLAGGED.length>0){

//   this.flags=this.$_.uniq(this.flags).push({possible_duplicate_client:FLAGGED})
// }

//     }
//     ,validaterex (type) {

// let v = '';

// switch(type){
//   case 'address_street':
//   v=this.agency.agency_addressstreet;
//   break;
//   case 'dob':
//   v=this.clients.primary.client_dob;
//   break;
//   break;
//   case 'phone_agency':
//   v=this.agency.agency_advocate_phone;
//   break;
//   break;
//   case 'phone_client':
//   v=this.clients.primary.client_phone;
//   break;
//   default:
//   v='';
// }

// if(typeof v !== 'undefined'){
//   if(type=='phone_agency'||type=='phone_client'){
//     return (v.replace(/[^0-9]/g,"").length==10)?{success:true}:{success:"false",reason:"too few or too many digits"}
//   }
//   if(type=='dob'){

// let vm = this.$moment(v).format('YYYY.MM.DD');
// console.log("vm:",vm);

//   }
// if(type=='address_street'){
// let clauses = v.split(",")
// let re = {success:"false",reason:"missing address components"};

// switch (true) {
//   case clauses.length<2 || clauses[1].length<4:
//     re.success=false;
//     re.reason="missing most pieces";
//     break;
//       case (isNaN(clauses[0][0]) && clauses[0].split(" ")<=4):
//     re.success=false;
//     re.reason="missing at least a leading house number and/or street name (or they are out of place)";
//     break;
//   default:
//   re.success=true;
//   re.reason="looks legit"
// }
// return re;
// }//type=address_street
// }//if v
// else {
//   return false;
// }
//     }
    // ,swap_com_pref (event) {

    //   let nv = event.target.value.toLowerCase()
    //   this.appointment.communicatepref=nv
    // }
    // ,swap_lang_pref (event) {

    //   let nv = event.target.value.toLowerCase()
    //   this.appointment.english=nv
    // }
    // ,swap_stairs_pref (event) {

    //   let nv = event.target.value.toLowerCase()
    //   this.appointment.climbstairs=nv
    // }
    // ,swap_wheelchair_pref (event) {

    //   let nv = event.target.value.toLowerCase()
    //   this.appointment.wheelchair=nv
    // }

/** ---------------------------------------------------------- GCAL --------------- **/

/**
     *  On load, called to load the auth2 library and API client library.
     */
    // ,handleClientLoad() {
    //   this.gc_api.load('client:auth2', this.initClient);
    //   this.gc_authorized=this.gc_api.auth2.getAuthInstance().isSignedIn
    // }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    // ,initClient() {
    //   let vm = this;

    //   vm.gc_api.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     discoveryDocs: DISCOVERY_DOCS,
    //     scope: SCOPES
    //   }).then(_ => {
    //     // Listen for sign-in state changes.
    //     vm.gc_api.auth2.getAuthInstance().isSignedIn.listen(vm.gc_authorized);
    //     vm.gc_authorized=this.gc_api.auth2.getAuthInstance().isSignedIn;
    //   });
    // }

    /**
     *  Sign in the user upon button click.
     */
    // ,handleAuthClick(event) {
    //   Promise.resolve(this.gc_api.auth2.getAuthInstance().signIn())
    //     .then(_ => {
    //       this.gc_authorized = true;
    //     });
    // }

    /**
     *  Sign out the user upon button click.
     */
    // ,handleSignoutClick(event) {
    //   Promise.resolve(this.gc_api.auth2.getAuthInstance().signOut())
    //     .then(_ => {
    //       this.gc_authorized = false;
    //     });
    // }
//     ,createGCEvent(){

// let vm = this;

//       var event = {
//   'summary': 'Sample Event',
//   'status':'tentative',
//   'location': '800 Howard St., San Francisco, CA 94103',
//   'description': 'we will see - bring a jacket',
//   'start': {
//     'dateTime': '2018-09-10T09:00:00-07:00',
//     'timeZone': 'America/Los_Angeles'
//   },
//   'end': {
//     'dateTime': '2018-09-11T17:00:00-07:00',
//     'timeZone': 'America/Los_Angeles'
//   },
//   'recurrence': [
//     'RRULE:FREQ=DAILY;COUNT=1'
//   ],
//   'attendees': [],
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10}
//     ]
//   }
// };

// var request = gapi.client.calendar.events.insert({
//   'calendarId': 'primary',
//   'resource': event
// });


// request.execute(function(event,vue){
//   vue.appointment.appointment_calobj = event;
// })

//         // .then((event) => {
//         //   console.log("event in then:",event);
//         //   this.appointment_calobj = event;
//         // });

//     }
    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    // ,getGCEvents() {
    //   let vm = this;

    //   vm.gc_api.client.calendar.events.list({
    //     'calendarId': 'primary',
    //     'timeMin': (new Date()).toISOString(),
    //     'showDeleted': false,
    //     'singleEvents': true,
    //     'maxResults': 10,
    //     'orderBy': 'startTime'
    //   }).then(response => {
    //     vm.gc_items = this.syntaxHighlight(response.result.items);
    //     console.log(vm.gc_items);
    //   });
    // }

// ,syntaxHighlight(json) {
//       if (typeof json != 'string') {
//         json = JSON.stringify(json, undefined, 2);
//       }
//       json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//       return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
//         var cls = 'number';
//         if (/^"/.test(match)) {
//           if (/:$/.test(match)) {
//             cls = 'key';
//           } else {
//             cls = 'string';
//           }
//         } else if (/true|false/.test(match)) {
//           cls = 'boolean';
//         } else if (/null/.test(match)) {
//           cls = 'null';
//         }
//         return '<span class="' + cls + '">' + match + '</span>';
//       });
//     }


/** ---------------------------------------------------------- /GCAL --------------- **/

  },//methods
  computed: {

}//computed
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#map{
  color:green;
  height:100vh;
  width:100%;
}
</style>
