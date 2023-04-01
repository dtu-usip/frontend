import { Table } from "@themesberg/react-bootstrap";
import React from "react";
import grades from "../utilities/gradesList";

function GradesTable() {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Suggested Range</th>
          <th>Count</th>
          <th>Moderation</th>
          <th>Revised Range</th>
          <th>Revised Count</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((grade, index) => (
          <Element e={grade} index={index} />
        ))}
      </tbody>
    </Table>
  );
}

export default GradesTable;

function Element({ e, index }) {
  return (
    <tr key={index}>
      <td>{e.grade}</td>
      <td>
        {e.starts_at} - {e.ends_at}
      </td>
      <td>{e.count}</td>
      <td>0</td>
      <td>
        {e.starts_at} - {e.ends_at}
      </td>
      <td>{e.count}</td>
    </tr>
  );
}
