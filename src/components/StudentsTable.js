import { Table } from "@themesberg/react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { GradeContext } from "../contexts/gradeContext";
import { StudentContext } from "../contexts/studentContext";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function StudentsTable() {
  const { id } = useParams();
  const { addGrades } = useContext(GradeContext);
  const { goBack } = useHistory();
  const { students, course, getStudentsInCourse, loading, clearState } =
    useContext(StudentContext);

  const [form, setForm] = useState({});

  useEffect(() => {
    if (id) {
      getStudentsInCourse(id);
    }

    return () => {
      clearState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFormChange = (studentId, formData) => {
    setForm((prevForm) => ({
      ...prevForm,
      [studentId]: { ...prevForm[studentId], formData },
    }));
  };

  const handleSaveAll = () => {
    students.forEach((student) => {
      if (form[student.user._id]) {
        addGrades(id, student.user._id, form.mte_score, form.ete_score);
      }
    });
  };

  return (
    <>
      <h2>
        <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} /> Students in{" "}
        {course?.course}
      </h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>S.no</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>CWS Score</th>
            <th>PRS Score</th>
            <th>MTE score</th>
            <th>ETE score</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading && <>Loading...</>}
        {!loading && students.length < 1 && <>No students in this course yet</>}
        <tbody>
          {students?.map((e, index) => (
            <Element
              e={e}
              index={index}
              key={index}
              handleFormChange={handleFormChange}
            />
          ))}
          <tr></tr>
          <tr>
            <td colSpan={7}>All Marks</td>
            <td>
              <Button onClick={handleSaveAll}>Save All</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default StudentsTable;

function Element({ e, index, handleFormChange }) {
  const { addGrades } = useContext(GradeContext);
  const [form, setForm] = useState({
    cws_score: e?.cws_score ?? 0,
    prs_score: e?.prs_score ?? 0,
    mte_score: e?.mte_score ?? 0,
    ete_score: e?.ete_score ?? 0,
  });

  const handleSave = () => {
    if (e.course && e.user) {
      addGrades(e.course, e.user._id, form.mte_score, form.ete_score);
    }
  };

  useEffect(() => {
    if (form && e.user) {
      handleFormChange(e.user._id, form);
    }
    // eslint-disable-next-line
  }, [form]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{e?.user?.first_name}</td>
      <td>{e?.user?.last_name}</td>
      <td>
        <input
          type="text"
          value={form.cws_score ?? "0"}
          onChange={(e) => setForm({ ...form, cws_score: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          value={form.prs_score ?? "0"}
          onChange={(e) => setForm({ ...form, prs_score: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          value={form.mte_score ?? "0"}
          onChange={(e) => setForm({ ...form, mte_score: e.target.value })}
        />
      </td>
      <td>
        <input
          type="text"
          value={form.ete_score ?? "0"}
          onChange={(e) => setForm({ ...form, ete_score: e.target.value })}
        />
      </td>
      <td>
        <Button onClick={handleSave}>Save</Button>
      </td>
    </tr>
  );
}
