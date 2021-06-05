import Vue from 'vue'
import Vuex from 'vuex'
import axios, {errorHandler} from "../config/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    courses : null

  },
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    }
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.isLogin = payload
    },
    SET_COURSE(state, payload){
      state.courses = payload
    },
    SET_COURSE_DATA(state, {courseId, classWorks, topics, students}){
      const course = state.courses.find(course => course.id ===courseId)
      course.classWorks = classWorks
      course.topics = topics
      course.students = students
    },
    INSERT_CLASSWORKS(state, {courseId, classWorks}){
      const course = state.courses.find(course => course.id ===courseId)
      course.classWorks = classWorks.concat(course.classWorks)
    },
    INSERT_TOPICS(state, {courseId, topics}){
      const course = state.courses.find(course => course.id ===courseId)
      course.topics = topics.concat(course.topics)
    }
  },
  actions: {
    isValid({ commit }){
      return axios({
        url: "/verify",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then( _=> {
        commit('SET_LOGIN', true)
        return true
      })
      .catch(errorHandler)
    },
    login( { commit }, code){
      return axios({
        url : "/login",
        method: "post",
        data : {
          code
        }
      })
      .then(({data}) => {
        commit('SET_LOGIN', true)
        localStorage.setItem("access_token", data.access_token)
      }) 
      .catch(errorHandler)
    },
    getCourses({ commit }){
      return axios({
        url : "/courses",
        method: "get",
        headers : {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        commit("SET_COURSE", data)
      }) 
      .catch(errorHandler) 
    },
    getCourseData({ commit }, courseId){
      return axios({
        url : `/classworks/${courseId}`,
        method: "get",
        headers : {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        commit("SET_COURSE_DATA", {...data, courseId})
    
      }) 
      .catch(errorHandler) 
    },
    createClassworks({commit}, payload){
      const {courseId, classWorks} = payload
      return axios({
        url : `/classworks/${courseId}`,
        method: "post",
        headers : {
          access_token: localStorage.getItem("access_token")
        },
        data: classWorks
      })
      .then(({data}) => {
        commit('INSERT_CLASSWORKS', {
          courseId,
          classWorks: data
        })
        return true
      }) 
      .catch(errorHandler) 
    },
    createTopic({commit}, {courseId, name}){
      return axios({
        url : `/topics/${courseId}`,
        method: "post",
        headers : {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          name
        }
      })
      .then(({data}) => {
        commit('INSERT_TOPICS', {
          courseId,
          topics: [data]
        })
    
      }) 
      .catch(errorHandler) 
    }

  }
})
