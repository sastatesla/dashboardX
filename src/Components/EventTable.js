// EventTable.js
import React from 'react';

function EventTable({ applicants }) {
  return (
    <div className="event-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            {/* Add more table headers */}
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.status}</td>
              {/* Add more table data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
