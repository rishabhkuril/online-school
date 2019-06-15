import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import axios from "axios";
import { textChangeRangeIsUnchanged } from "typescript";
import {API_URL} from "../config"
class StudentsList extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
    this.getstudentslist = this.getstudentslist.bind(this);
    // this.getFr=this.getFr.bind(this)
  }

  componentDidMount() {
    this.getstudentslist();
  }

  getstudentslist() {
    const classroomid = localStorage.getItem("classroom_id");
    console.log(classroomid);
    var self = this;
    axios
      .post(`${API_URL}/student/getstudentbyclassid`, {
        classroomid: classroomid
        // classroomid: this.state.classData[0]._id
      })
      .then(function(res) {
        console.log("Data is"+res.data)
        console.log(self);
        var friends = res.data;
        console.log(friends);
        self.setState(
          {
            students:friends
          },
          () => {
            console.log(self.state.students);
          }
        );
      });
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {this.state.students.map(student =>
            (
              <Col md={4}>
                <Card
                  title={student.name}
                //   category={`Class: ${friend.standard}`}
                  stats={student.email}
                  //  statsIcon="fa fa-history"
                  content={
                    <div className="table-full-width">
                      <table className="table" />
                    </div>
                  }
                />
              </Col>
            )
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default StudentsList;
