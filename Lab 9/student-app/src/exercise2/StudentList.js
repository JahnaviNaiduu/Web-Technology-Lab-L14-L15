import React from "react";
import StudentCard from "./StudentCard";  // same folder

function StudentList() {
  return (
    <div>
      <h2>Student Cards</h2>

      <StudentCard name="Jahnavi" department="CSE" marks="90" />
      <StudentCard name="Rahul" department="ECE" marks="85" />
      <StudentCard name="Anjali" department="IT" marks="92" />

    </div>
  );
}

export default StudentList;