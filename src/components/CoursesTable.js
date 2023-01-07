import { Table } from "@themesberg/react-bootstrap";
import React, { useContext, useEffect } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { TeacherContext } from "../contexts/teacherContext";
import { UserContext } from "../contexts/userContext";
import { useHistory } from "react-router-dom";

function CoursesTable() {
  const { user } = useContext(UserContext);
  const { courses, getCourses, clearState, loading } =
    useContext(TeacherContext);

  useEffect(() => {
    if (user) {
      getCourses();
    }

    return () => {
      clearState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Course Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading && <>Loading...</>}
        {!loading && courses?.length < 1 && <>No Courses yet</>}
        {courses?.map((e, index) => (
          <Element e={e} index={index} key={index} />
        ))}
        <tr></tr>
      </tbody>
    </Table>
  );
}

export default CoursesTable;

function Element({ e, index }) {
  const history = useHistory();
  const showStudents = (id) => {
    history.push(`/edit-grades/${id}`);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{e?.course?.course}</td>
      <td>
        <Button onClick={() => showStudents(e.course?._id)}>
          Show Students
        </Button>
      </td>
    </tr>
  );
}
