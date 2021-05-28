<template>
  <v-card flat tile class="sign-in">
    <v-row class="ma-0">
      <v-col xl="3" lg="4" md="5" sm="8" class="mx-auto">
        <v-card flat class="pa-0 mx-auto mt-8">
          <div class="text-center text-uppercase text-caption text-overline primary--text mb-3">{{$t('Page.SignIn.Account')}}</div>
          <div class="text-h5 font-weight-bold mb-4 text-center">{{$t('Page.SignIn.SignInSiameseAdmin')}}</div>
          <v-form ref="signInForm" autocomplete="off" lazy-validation>
            <v-container>
              <div class="mb-4 text-right">
                <internationalization/>
                <theme/>
              </div>
              <v-text-field
                class="text-body-2 mb-3"
                prepend-inner-icon="mdi-account-outline"
                dense
                clearable
                :label="$t('Page.SignIn.UsernameOrPhoneNumber')"
                outlined
                v-model="signInForm.username"
                :rules="[value => !!value || $t('Page.SignIn.UsernameRequiredTip')]"/>
              <v-text-field
                class="text-body-2"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                clearable
                dense
                :label="$t('Page.SignIn.Password')"
                :type="showPassword ? 'text' : 'password'"
                outlined
                :error="wrongPassword"
                :error-messages="errorMessage"
                v-model="signInForm.password"
                @click:append="showPassword = !showPassword"
                :rules="[value => !!value || $t('Page.SignIn.PasswordRequiredTip')]"/>
              <v-btn
                  elevation="0"
                  large
                  block
                  color="primary"
                  class="text-body-1 text-none mb-5"
                  @click="signIn"
                  :loading="loading">
                {{$t('Page.SignIn.SignIn')}}
              </v-btn>
              <div class="text-center text-body-2"><a href="">{{$t('Page.SignIn.ForgotPassword')}}</a></div>
              <div class="d-flex my-4">
                <v-divider class="my-4"/>
                <div class="text-overline mx-3">{{$t('Page.SignIn.OrSignInWith')}}</div>
                <v-divider class="my-4"/>
              </div>
              <v-row>
                <v-col cols="4" v-for="(item, index) in signInItems" :key="index">
                  <v-btn elevation="0" outlined block color="primary">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <div class="text-center text-caption text-uppercase mt-12">{{$t('Page.SignIn.BySigningInYouAgreeToThe')}}</div>
              <div class="text-center text-caption text-uppercase">
                <a href="">{{$t('Page.SignIn.TermsOfService')}}</a>
                <div class="mx-3 d-inline-block">{{$t('Page.SignIn.AndSymbol')}}</div>
                <a href="">{{$t('Page.SignIn.PrivacyPolicy')}}</a>
              </div>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Internationalization from '../../../components/basic/Internationalization'
import Theme from '../../../components/basic/Theme'
import { postAPI } from '../../../api'
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  components: { Theme, Internationalization },
  data: () => ({
    loading: false,
    showPassword: false,
    wrongPassword: false,
    errorMessage: '',
    signInForm: {
      username: '',
      password: ''
    },
    signInItems: [
      { icon: 'mdi-wechat', path: '' },
      { icon: 'mdi-qqchat ', path: '' },
      { icon: 'mdi-github', path: '' }
    ]
  }),
  methods: {
    ...mapActions(['showSnackbar', 'switchTheme']),
    signIn () {
      const that = this
      if (that.$refs.signInForm.validate()) {
        that.loading = true
        postAPI('/siamese-auth/accredit', that.signInForm)
          .then(response => {
            that.loading = false
            if (response && response.data.code === 20000) {
              localStorage.setItem('token', response.data.data)
              setTimeout(function () {
                that.$router.push({ path: '/dashboard' })
              }, 1000)
            }
            if (response.data.code === 10001) {
              that.loading = false
              this.wrongPassword = true
              this.errorMessage = response.data.message
            }
          })
          .catch(() => {
            that.loading = false
          })
      }
    }
  },
  watch: {
    'signInForm.password' () {
      this.wrongPassword = false
      this.errorMessage = ''
    }
  }
}
</script>
