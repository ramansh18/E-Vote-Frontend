import { useState, useEffect } from "react";
import { Table, Input, Button } from "@mui/material";  // Assuming Material UI

// Sample data for table (Replace with dynamic data later)
const sampleVoters = [
  { name: "John Doe", email: "john@example.com", date: "2025-03-01", status: "Verified" },
  { name: "Alice Smith", email: "alice@example.com", date: "2025-03-02", status: "Pending" },
  { name: "Bob Johnson", email: "bob@example.com", date: "2025-04-01", status: "Verified" },
];

export default function VoterManagement() {
  const [voters, setVoters] = useState(sampleVoters);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter voters by name or email
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter voters based on search query
  const filteredVoters = voters.filter((voter) =>
    voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voter.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Voter Management</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Voter Table */}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVoters.map((voter, index) => (
            <tr key={index}>
              <td>{voter.name}</td>
              <td>{voter.email}</td>
              <td>{voter.date}</td>
              <td>{voter.status}</td>
              <td>
                <Button variant="contained" color="primary" size="small">
                  View
                </Button>
                <Button variant="outlined" color="secondary" size="small" className="ml-2">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
