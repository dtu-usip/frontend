import { Table } from "@themesberg/react-bootstrap";
import React, { useContext, useState } from "react";
import { Button } from "@themesberg/react-bootstrap";
import { GradeContext } from "../contexts/gradeContext";

function StudentsTable({ students }) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>S.no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>MTE score</th>
          <th>ETE score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((e, index) => (
          <Element e={e} index={index} key={index} />
        ))}
        <tr></tr>
      </tbody>
    </Table>
  );
}

export default StudentsTable;

function Element({ e, index }) {
  const { addGrades } = useContext(GradeContext);
  const [form, setForm] = useState({
    mte_score: e?.mte_score ?? 0,
    ete_score: e?.ete_score ?? 0,
  });

  const handleSave = () => {
    if (e.course && e.user) {
      addGrades(e.course, e.user._id, form.mte_score, form.ete_score);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{e?.user?.first_name}</td>
      <td>{e?.user?.last_name}</td>
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
