/* eslint-disable prettier/prettier */
/**
=========================================================
* E learning - v2.2.0
=========================================================
*/

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Paper,
} from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { courseAdd, fetchCourses } from '../../services/masterdataapicall';

function Masterdata() {
  const MySwal = withReactContent(Swal);

  const [selectedMaster, setSelectedMaster] = useState("1");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", status: "" });

  // Fetch data from API on load


  const fetchData = async () => {
    try {
      const payload = { ITEM: "VIEW_ALL" };
      const response = await fetchCourses(payload);
      if (response.status === "True") {
        setData(response.response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add new entry
  const handleAdd = () => {
    setFormData({ id: "", name: "", status: "Pending" });
    setOpen(true);
  };

  // Save new
  const handleSave = async () => {
    try {
      if (formData.id) {
        // Handle update logic here
      } else {
        if (selectedMaster === "Course Category") {
          const newEntry = { COURSE_CATEGORY_NAME: formData.name };
          const response = await courseAdd(newEntry);

          if (response.status === "True") {
            MySwal.fire({
              title: "Success!",
              text: response.message,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });

            // Add new row to the table
            setData([...data, { name: formData.name, status: formData.status }]);
          } else {
            MySwal.fire({
              title: "Error!",
              text: response.message,
              icon: "error",
              confirmButtonText: "Retry",
            });
          }
        }
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Table columns (Added "Status" column)
  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "CourseCategory", accessor: "CourseCategory", align: "left" }, // New Status Column
  ];

  // Table rows (Added Status)
  const rows = data.map((item, index) => ({
    name: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {index+1}
      </MDTypography>
    ),
   CourseCategory: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.COURSE_CATEGORY_NAME}
      </MDTypography>
    ),
  }));
  const handleMasterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMaster(selectedValue);
    if(selectedValue == "Course Category"){
      fetchData();
    }else{
        setData([]) 
    }
    // Additional functionality
    console.log("Selected Master Changed:", selectedValue);
   
  };
  

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Card sx={{ padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <h5>Select Master Data</h5>
            </Grid>

            <Grid item xs={6}>
              <Select
                fullWidth
                value={selectedMaster}
                onChange={handleMasterChange}
                sx={{ width: "250px", padding: "10px" }}
              >
                <MenuItem value="1">Select</MenuItem>
                <MenuItem value="Course Category">Course Category</MenuItem>
                <MenuItem value="Course SubCategory">Course SubCategory</MenuItem>
                <MenuItem value="System Role">System Role</MenuItem>
              </Select>
            </Grid>
            {selectedMaster !== "1" && (
            <Grid item xs={3} sx={{ textAlign: "right" }}>
              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add {selectedMaster}
              </Button>
            </Grid>
            )}
          </Grid>
        </Card>
      </MDBox>

      {/* Data Table */}
      {selectedMaster !== "1" && (
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
      )}

      {/* Dialog for adding new entry */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.id ? "Edit" : "Add"} {selectedMaster}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ marginTop: 2 }}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Masterdata;
