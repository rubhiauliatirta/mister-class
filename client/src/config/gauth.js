import Vue from "vue"
import { CLASS, COURSE, TOPIC } from "../helpers/scope";

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: `profile email ${CLASS} ${COURSE} ${TOPIC}`,
  access_type: "offline",
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)