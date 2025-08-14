import React from 'react'
import AdminSlideBar from '../adminComponents/AdminSlideBar'
import { Route, Routes } from 'react-router-dom';
import OrdersPage from '../adminComponents/OrdersPage'
import BooksPage from '../adminComponents/BooksPage';
import DiscountPage from '../adminComponents/DiscountPage';
import UsersPage from '../adminComponents/UsersPage';
// import ReviewsPage from '../adminComponents/ReviewsPage';
import AdminDashboardPage from '../adminComponents/AdminDashboardPage';

const AdminPage = () => {
  return (
    <div className="flex" >
      <AdminSlideBar />
      <div className="flex-1 min-h-screen bg-gray-100 pl-10 md:pl-60" style={{
            backgroundImage:
              'url("https://th.bing.com/th/id/OIP.Q3QGjBhOW9QJLdgk2iKS8wHaDe?w=333&h=164&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            marginTop: 0,
          }}>
        <div className="pt-5 p-1"  >
          <Routes>
            <Route path="/" element={<AdminDashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/discounts" element={<DiscountPage />} />
            <Route path="/users" element={<UsersPage />} />
            {/* <Route path="/reviews" element={<ReviewsPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
