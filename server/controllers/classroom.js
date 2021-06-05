const axios = require("axios")

class ClassroomController {
  static getCourses(req, res) {
    axios({
      method: "get",
      url: "https://classroom.googleapis.com/v1/courses",
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    })
      .then(({ data }) => {
        res.json(data.courses)
      })
      .catch(err => axiosErrorHandler(err, res))
  }
  static getCourseData(req, res) {
    const courseId = req.params.courseId

    let courseWorkRequest = axios({
      method: "get",
      url: `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    })

    let topicRequest = axios({
      method: "get",
      url: `https://classroom.googleapis.com/v1/courses/${courseId}/topics`,
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    })


    let studentsRequest = axios({
      method: "get",
      url: `https://classroom.googleapis.com/v1/courses/${courseId}/students`,
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      }
    })

    Promise.all([courseWorkRequest, topicRequest, studentsRequest])
      .then(result => {
        let courseWorks = result[0].data.courseWork
        let topics = result[1].data.topic
        let students = result[2].data.students

        res.json({
          classWorks: courseWorks,
          topics,
          students
        })
      })
      .catch(err => axiosErrorHandler(err, res))

  }

  static createClassworks(req, res, next) {
    let courseId = req.params.courseId
    let newData = req.body

    let requests = newData.map(data => {
      return axios({
        method: "post",
        url: `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
        headers: {
          'Authorization': `Bearer ${req.accessToken}`
        },
        data
      })
    })

    Promise.all(requests)
      .then(responses => {
        let results = responses.map(response => response.data)

        res.status(201).json(results)
      })
      .catch(err => axiosErrorHandler(err, res))

  }

  static createTopics(req, res, next) {

    const { courseId } = req.params
    const { name } = req.body

    axios({
      method: "post",
      url: `https://classroom.googleapis.com/v1/courses/${courseId}/topics`,
      headers: {
        'Authorization': `Bearer ${req.accessToken}`
      },
      data: {
        name
      }
    }).then(({ data }) => {
      res.json(data)
    })
      .catch(err => axiosErrorHandler(err, res))

  }


}

function axiosErrorHandler(error, res) {
  if (error.response) {
    // Request made and server responded
    const errorData = error.response.data
    const errorStatus = error.response.status
    console.log(errorData);
    console.log(errorStatus);

    res.status(errorStatus).json({
      message: (errorData.error && errorData.error.message) || "Something wrong",
      error: errorData
    })
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    res.status(500).json({
      message: "Internal Server Error"
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(error.config)
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

module.exports = ClassroomController