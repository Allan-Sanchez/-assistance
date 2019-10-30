<template>
<div>
   <v-row id="courses">
        <v-spacer></v-spacer >
      <v-col :sm="11" :lg="8"  class="d-sm-flex justify-center align-center">
              <img class="d-block mx-sm-auto mx-md-0" src="../assets/man.png" alt="" width="200px">
              <div class="mx-10">
                <h2 class="text-center">Teacher</h2>
                <p class="text-center">{{currentUser}}</p>

                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <v-btn class="py-6"   color="teal darken-2" dark block v-on="on">
                        New Course
                        <v-icon right dark>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">New Course</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" >
                              <v-text-field disabled  prepend-icon="mdi-qrcode" label="Course ID" required v-model="idCourse"></v-text-field>
                            </v-col>

                            <v-col cols="12" >
                              <v-text-field label="Course Name*" prepend-icon="mdi-notebook" autofocus required v-model="nameCourse"></v-text-field>
                            </v-col>

                              <v-col cols="12">
                                <v-menu
                                  ref="menu"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :return-value.sync="date"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="date"
                                      label="Picker in menu"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-col>
                            
                            <v-col cols="12">
                               <v-textarea label="Course Description*" prepend-icon="mdi-comment-text" auto-grow outlined
                                  rows="3" row-height="25" v-model="descriptionCourse"></v-textarea>
                            </v-col>
                            
                           </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="addCourse()">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </div>
      </v-col>
      <v-spacer></v-spacer>

   </v-row>

   <v-row v-if="showQrCode" class="my-10">
     <v-spacer></v-spacer>
     <v-col lg="6">
       <h1 class="text-center">QR Code Generated</h1>
       <!-- <div class="mx-auto"> -->
         <qr-code class="d-flex justify-center align-center" :text="QrcodeCourse"></qr-code>
       <!-- </div> -->
     </v-col>
     <v-spacer></v-spacer>
   </v-row>

   <v-row class="mx-10">
    
     <v-spacer ></v-spacer>
     <!-- <div> -->
       <template v-if="course">
         
        <v-col v-for="itemCourse in course_key" :key="itemCourse" :sm="12" :md="6" :lg="3">
           <v-card class="mx-auto" max-width="300" >

          <div @click="openQrDialog()" style="cursor: pointer;" class="img-height">
              <svg class="img-height" id="Layer_5" enable-background="new 0 0 64 64"  viewBox="0 0 64 64" width="100%"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="32" x2="32" y1="63" y2=".999"><stop offset="0" stop-color="#9f2fff"/><stop offset="1" stop-color="#0bb1d3"/></linearGradient><path d="m5 40h2v6h-2zm0 10h2v-2h-2zm19-45h-2v4h2zm-2 12h2v-6h-8v2h6zm4 2h-4v2h6v-4h-2zm4-8h-4v4h2v-2h2zm0-6h-2v2h-2v2h4zm26.185 22h1.815c2.757 0 5 2.243 5 5v26c0 2.757-2.243 5-5 5h-52c-2.757 0-5-2.243-5-5v-26c0-2.757 2.243-5 5-5h34.216l-.136-1.225c-.299-.247-.582-.508-.856-.775h-27.224v-24h28v3.311c2.069-1.747 4.633-2.917 7.411-3.223 4.039-.446 7.921.79 10.926 3.48 2.964 2.655 4.663 6.456 4.663 10.432 0 5.093-2.739 9.55-6.815 12zm-19.056-13.789c-.432 2.995.253 5.906 1.831 8.315 1.218-2.752 3.497-4.852 6.274-5.862-1.361-1.1-2.234-2.781-2.234-4.664 0-3.309 2.691-6 6-6s6 2.691 6 6c0 1.883-.873 3.564-2.235 4.665 2.782 1.011 5.065 3.117 6.281 5.877 1.232-1.884 1.954-4.129 1.954-6.542 0-3.408-1.457-6.667-3.997-8.942-2.229-1.997-5.025-3.059-7.987-3.059-.458 0-.92.025-1.385.077-5.321.587-9.738 4.849-10.502 10.135zm11.871 1.789c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm-35-12v4h4v-4zm0 20h4v-4h-4zm23.514 0c-.861-1.225-1.512-2.574-1.935-4h-3.579v2h-2v-4h5.146c-.093-.657-.142-1.325-.141-2h-3.005v-2h3.141c.003-.025.005-.05.008-.075.095-.658.248-1.298.436-1.925h-3.585v-2h2v-2h-2v-2h4v4.814c.5-1.239 1.179-2.391 2-3.431v-3.383h-18v6h-6v8h6v6zm7.694 11.113c-.471.564-1.161.887-1.895.887-1.191 0-2.189-.849-2.412-2h-29.901v24h42v-24h-6.864zm12.792-5.113h-8.531l-1.666 2h5.197c1.103 0 2 .897 2 2v24c0 1.103-.897 2-2 2h-42c-1.103 0-2-.897-2-2v-24c0-1.103.897-2 2-2h29.661l-.222-2h-34.439c-1.654 0-3 1.346-3 3v26c0 1.654 1.346 3 3 3h52c1.654 0 3-1.346 3-3v-26c0-1.654-1.346-3-3-3zm-.411-5.637c-1.151-3.77-4.607-6.363-8.589-6.363s-7.439 2.594-8.589 6.365c.382.389.791.757 1.232 1.1l.333.259.873 7.861c.042.374.581.535.824.247l4.859-5.832h.468c3.366 0 6.407-1.397 8.589-3.637zm1.411 17.637h-2v8h2zm-23 4c0 2.206-1.794 4-4 4s-4-1.794-4-4 1.794-4 4-4 4 1.794 4 4zm-2 0c0-1.103-.897-2-2-2s-2 .897-2 2 .897 2 2 2 2-.897 2-2zm9-8h4v4h2v-6h-5.687-.313zm4 16h-4v2h6v-6h-2zm-30-4h-2v6h6v-2h-4zm-2-8h2v-4h4v-2h-6z" fill="url(#SVGID_1_)"/>
              </svg>
          </div>

          <v-card-text class="text--primary text-center">
            <div  class=" font-weight-bold title">{{itemCourse}}</div>

          </v-card-text>

          <v-card-actions class="d-flex justify-center align-center">
            <v-btn raised color="teal darken-2" dark >
              Assistence
              <v-icon right dark>mdi-playlist-check</v-icon>
            </v-btn>

            <v-btn color="red darken-2" raised dark >
              Delete
                <v-icon right dark>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
           </v-card>

            
        </v-col>

          <v-dialog v-model="dialogQR" persistent  max-width="450">
              <v-card>
                <v-card-title class="headline">Do you Want generete QR code?</v-card-title>
        
                <v-card-text>
                  <v-container>
                          <v-row>
                            <v-col cols="12" >
                              <v-text-field disabled  prepend-icon="mdi-qrcode" label="Course ID" required v-model="idCourse"></v-text-field>
                            </v-col>

                            <v-col cols="12" >
                               <v-select class="courseQrID" v-model="courseSelect" :items="course_key" prepend-icon="mdi-notebook" label="Course Select" ></v-select>
                            </v-col>

                              <v-col cols="12">
                                <v-menu
                                  ref="menu"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :return-value.sync="dateN"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="dateN"
                                      label="Picker in menu"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="dateN" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(dateN)">OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-col>
                            
                          </v-row>
                  </v-container>

                </v-card-text>  
        
                <v-card-actions>
                  <v-spacer></v-spacer>
        
                  <v-btn
                    color="red darken-2"
                    flat="flat" dark
                    @click="dialogQR = false"
                  >
                    Cancel
                  </v-btn>
        
                  <v-btn
                    color="green darken-2"
                    flat="flat" dark
                    @click="generateQR()"
                  >
                    Generate
                  </v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
       </template>
     <!-- </div> -->
     <v-col v-else class="mt-10 text-center">
       <h2>No hay cursos para mostrar</h2>
     </v-col>
  
     <v-spacer></v-spacer>
   </v-row>
</div>
</template>

<script>
import firebase from 'firebase';
import db from '../components/firebaseInit';
export default {
    name:'courses',
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        dateN: new Date().toISOString().substr(0, 10),
        menu: false,
        dialog: false,
        dialogQR: false,
        idCourse:false,
        descriptionCourse:'',
        nameCourse:'',
        currentUser: false,
        course: false,
        course_key: [],
        showQrCode:false,
        QrcodeCourse :'test',
        courseSelect: false

      }
    },
    created(){
      if (firebase.auth().currentUser) {

        this.currentUser = firebase.auth().currentUser.email;
        this.idCourse = firebase.auth().currentUser.email;

       

        db.collection("courses").doc(this.currentUser).get().then((querySnapshot) => {
          var arrayData = querySnapshot.data().course;

            arrayData.forEach(doc => {
                this.course_key.push(doc)
            });
                this.course = true
               
          }).catch(function(error) {
            console.log("Error getting document:", error);
        });
            
  
      }

    },
   methods: {
     addCourse(){

        db.collection("courses").doc(this.idCourse)
          .collection(this.nameCourse.toUpperCase()).doc(this.nameCourse.toLowerCase()).set({
            description: this.descriptionCourse,
            fecha :this.date
          })
          .then(function() {
                  console.log("Document successfully add!");
              });


           db.collection("courses").doc(this.currentUser).get().then((querySnapshot) => {
              if (querySnapshot.data()) {
                  console.log("llege no estaba vacio")
                  db.collection("courses").doc(this.currentUser).update({
                    course: firebase.firestore.FieldValue.arrayUnion(this.nameCourse.toLowerCase())
                    }).then(function() {
                          console.log("Docu   ment successfully updated!");
                      });
              }else{
                console.log("llege esta vacio")
                  db.collection("courses").doc(this.currentUser).set({
                       course:[this.nameCourse.toLowerCase()]
                     }).then(function() {
                        console.log("Document successfully written!");
                    })
              }

               db.collection("courses").doc(this.currentUser).get().then((querySnapshot) => {
                this.course_key = []
                var arrayData = querySnapshot.data().course;

                  arrayData.forEach(doc => {
                      this.course_key.push(doc)
                  });
                      this.course = true

                }).catch(function(error) {
                  console.log("Error getting document:", error);
              });

               this.nameCourse = '';
              this.descriptionCourse ='';
            });
       
       this.dialog = false;
  
     },
     openQrDialog(){
      this.dialogQR = true;
     },
     generateQR(){
        if (this.currentUser != '' || this.courseSelect != '' ||this.dateN != '' ) {
        let data = this.currentUser.concat('/',this.courseSelect,'/',this.dateN);
        this.showQrCode = true
        this.QrcodeCourse = data
        this.dialogQR = false
        }

     },
     
   },
}
</script>

<style>
.img-height{
  max-height:150px;
}
</style>