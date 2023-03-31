import { Table } from "@themesberg/react-bootstrap";
import React from "react";

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
      <tbody></tbody>
    </Table>
  );
}

export default GradesTable;

function Element({ val }) {
  return (
    <tr>
      <td>{val}</td>
      <td>{val}</td>
    </tr>
  );
}
