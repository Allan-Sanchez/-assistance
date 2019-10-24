<template>
    <div>
        <v-row>
            <v-col>
                <v-card class="mx-auto mt-10" max-width="344">
                  <v-card-text>
                        <p class="display-1 text--primary text-center animated  rubberBand delay-0.5s">
                         Login 
                        </p>

                            <v-form @submit.prevent ="login()" ref="form" v-model="valid" lazy-validation >
                                <v-text-field
                                  v-model="email"
                                  prepend-icon="mdi-account"
                                  :rules="emailRules"
                                  label="E-mail"
                                  required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                     prepend-icon="mdi-lock"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Password"
                                    hint="At least 8 characters"
                                    counter
                                    @click:append="show1 = !show1">
                                </v-text-field>
                            <div class="mt-10 d-flex justify-center">
                              <v-btn type="submit"
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                              >
                                Login
                                <v-icon dark right>mdi-check</v-icon>
                              </v-btn>
                              <v-btn color="error" class="mr-4" router to="/signin" >
                                  Sign In
                                <v-icon dark right>mdi-face</v-icon>
                              </v-btn>
                            </div>
                            </v-form>
                        
                  </v-card-text>
    
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
     data: () => ({
      valid: true,
      show1: false,
      password: '',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
     
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      lazy: false,
    }),
    methods: {
       login(){
                // console.log(`Esto son los campos user name ${this.user_name} , password ${this.password}`)
          firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                  .then( (user) => {
                    this.$swal({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          type: 'success',
                          title: 'success',
                          text: user.user.email,
                      });
                      // console.log(user.user.email)
                    
                    this.$router.push('/')
                  },err =>{
                      this.$swal({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 5000,
                          type: 'error',
                          title: 'Error',
                          text: err,
                      });
                  })

        }
    },
}
</script>