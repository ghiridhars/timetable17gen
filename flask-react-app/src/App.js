import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'

export default class SemesterInput extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedSmester: 'S1/S2',
      subjectList: [],
      teacherList: [],
      teacherIdList: [],
      subjectCount: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectedSubject: {},
      selectedTeacher: {}
    }
  }

  semesterHandler = ({ target: { value } }) => {

    console.log(value)
    this.setState({
      selectedSmester: value
    })
    if (value === 'S7/S8')
      this.setState({ subjectCount: [1, 2, 3, 4, 5] })
  }

  formSubmitted = async (event) => {
    event.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {

      let result = await axios.post('/result', { 'semester': this.state.selectedSmester }, config)

      const { sem1, teach, teachid } = result.data
      console.log(sem1, teach, teachid)

      this.setState({
        subjectList: sem1,
        teacherList: teach,
        teacherIdList: teachid
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  handleTeachlist = ({ target }) => {
    const { name, value } = target
    this.setState({
      selectedTeacher: {
        ...this.state.selectedTeacher,
        [name]: value
      }
    })
  }

  handleSublist = ({ target }) => {
    const { name, value } = target
    this.setState({
      selectedSubject: {
        ...this.state.selectedSubject,
        [name]: value
      }
    })
  }

  render() {

    return (
      <Container component="main" maxWidth="xs">
        <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography component="h1" variant="h2" style={{ fontFamily: "Cambria" }}>Timetable Generator</Typography>
          <form noValidate style={{ alignItems: "center", marginTop: 5 }} onSubmit={this.formSubmitted}>
            <InputLabel >Semester</InputLabel>
            <select name='Sem' onChange={this.semesterHandler} style={{ width: '100%', fontSize: 20, alignSelf: 'auto', textAlignLast: 'center' }}>
              <option value='S1'>S1</option>
              <option value='S2'>S2</option>
              <option value='S3'>S3</option>
              <option value='S4'>S4</option>
              <option value='S5'>S5</option>
              <option value='S6'>S6</option>
              <option value='S7'>S7</option>
              <option value='S8'>S8</option>
            </select>

            <h3>Subject Selection</h3>

            <div style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', width: '100%', textAlignLast: 'center',paddingRight:20}}>
                {
                  this.state.subjectCount.map((element) => {
                    return (
                      this.state.subjectList.length > 0 &&
                      <select
                        style={{ fontSize: 20, alignItems: 'left', marginTop: 10 }}
                        key={element}
                        name={element}
                        onChange={this.handleSublist}
                      >
                        {
                          this.state.subjectList.map((element1, index) => {
                            return (
                              <option key={(element * index).toString()}>{element1}</option>
                            )
                          })
                        }
                      </select>
                    )
                  })
                }
              </div>
              <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlignLast: 'center' }}>
                {
                  this.state.subjectCount.map((element) => {
                    return (
                      this.state.teacherList.length > 0 &&
                      <select
                        style={{ fontSize: 20, alignItems: 'right', marginTop: 10 }}
                        key={element}
                        name={element}
                        onChange={this.handleTeachlist}
                      >
                        {
                          this.state.teacherList.map((element1, index) => {
                            return (
                              <option key={(element * index).toString()}>{element1}</option>
                            )
                          })
                        }
                      </select>
                    )
                  })
                }
              </div>

            </div>




            <Button type="submit" fullWidth variant="contained" color="primary" style={{ margin: 10 }}>Submit</Button>
          </form>
        </div>
      </Container>
    );
  }

}