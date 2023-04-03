import { Button, Table } from "@themesberg/react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { GradeDashboardContext } from "../contexts/gradingDashboardContext";
import gradeList from "../utilities/gradesList";

function GradesTable() {
  const [gradeForm, setGradeForm] = useState([]);
  const { grades, saveGrades } = useContext(GradeDashboardContext);

  const handleSave = async () => {
    await saveGrades(gradeForm);
    alert("Grades Saved");
  };

  const updateGrade = (grade, value) => {
    const temp = [...gradeForm];
    const newModeration = Number(value);
    const gradeIndex = temp.findIndex((e) => e.grade.grade === grade.grade);
    if (gradeIndex > -1) {
      // Update the moderation value for the selected grade
      temp[gradeIndex].grade.moderation = newModeration;

      // Update starts_at
      temp[gradeIndex].grade.starts_from = grade.starts_at - newModeration;

      // Update the ends_at for the below grade
      if (gradeIndex < gradeForm.length) {
        temp[gradeIndex + 1].grade.ends_at = temp[gradeIndex].grade.starts_from;
      }
      setGradeForm(temp);
    }
  };

  useEffect(() => {
    if (grades) {
      setGradeForm(grades);
    }
  }, [grades]);

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Suggested Range</th>
            <th>Moderation</th>
            <th>Revised Range</th>
            <th>Count</th>
            {/* <th>Revised Count</th> */}
          </tr>
        </thead>
        <tbody>
          {gradeForm.map((grade, index) => (
            <Element
              key={index}
              grade={gradeList.find((e) => e.grade === grade.grade.grade)}
              e={grade?.grade ?? grade}
              index={index}
              count={grade?.count ?? 0}
              updateGrade={updateGrade}
            />
          ))}
        </tbody>
      </Table>
      <Button onClick={handleSave}>Save Grades</Button>
    </>
  );
}

export default GradesTable;

function Element({ e, index, count, grade, updateGrade }) {
  return (
    <tr key={index}>
      <td>{e.grade}</td>
      <td>
        {grade.starts_at} - {grade.ends_at}
      </td>
      <td>
        {grade.grade === "F" ? (
          <>0</>
        ) : (
          <input
            type="number"
            value={e?.moderation}
            onChange={(e) => updateGrade(grade, e.target.value)}
            min={0}
            max={35}
          />
        )}
      </td>
      <td>
        {e.starts_from} - {e.ends_at}
      </td>
      <td>{count}</td>
      {/* <td>{count}</td> */}
    </tr>
  );
}
