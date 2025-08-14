import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCounts } from '../state/count/Action';

const ordersDataByYear = {
  2023: [4, 8, 9, 0, 6, 15, 20, 18, 10],
  2024: [5, 12, 18, 25, 20, 15],
  2025: [6, 10, 22, 30, 25, 20],
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Your Pie Chart data and colors
const orderStatusData = [
  { name: 'Pending', value: 20 },
  { name: 'Shipped', value: 40 },
  { name: 'Delivered', value: 30 },
  { name: 'Cancelled', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const dispatch = useDispatch();

  const { users, orders, books, discounts, isLoading } = useSelector(state => state.count);

  useEffect(() => {
    dispatch(fetchAllCounts());
  }, [dispatch]);

  const summaryData = [
    { title: 'Total Books', count: books, color: '#1976d2' },
    { title: 'Total Users', count: users, color: '#2e7d32' },
    { title: 'Total Orders', count: orders, color: '#ed6c02' },
    { title: 'Active Discounts', count: discounts, color: '#d32f2f' },
  ];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid size={3}>
            <Paper
              sx={{
                padding: 3,
                backgroundColor: item.color,
                color: 'white',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" textAlign={'center'}>{item.title}</Typography>
              <Typography variant="h4" textAlign={'center'}>{isLoading ? '...' : item.count}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bar Chart Section */}
      {/* <Box sx={{ marginTop: 5 }}>
        <Paper sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Orders Per Month ({selectedYear})
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select value={selectedYear} label="Year" onChange={handleYearChange}>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <BarChart
            xAxis={[{ scaleType: 'band', data: months }]}
            series={[{ data: ordersDataByYear[selectedYear], label: 'Orders' }]}
            width={600}
            height={300}
          />
        </Paper>
      </Box>  */}

      {/* Pie Chart Section */}
      {/* <Box sx={{ marginTop: 5 }}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Orders by Status
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {orderStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Paper>
      </Box> */}
    </Box>
  );
};

export default AdminDashboardPage;
