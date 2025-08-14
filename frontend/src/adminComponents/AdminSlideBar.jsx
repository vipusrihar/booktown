import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import DiscountIcon from '@mui/icons-material/Discount';
// import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../state/authentication/Action';

const sliderParts = [
  { title: "DashBoard", icon: <ViewStreamIcon />, path: '/adminDashboard/' },
  { title: "Books", icon: <LibraryBooksIcon />, path: '/adminDashboard/books' },
  { title: "Users", icon: <SupervisedUserCircleIcon />, path: '/adminDashboard/users' },
  { title: "Orders", icon: <ViewStreamIcon />, path: '/adminDashboard/orders' },
  { title: "Discounts", icon: <DiscountIcon />, path: '/adminDashboard/discounts' },
  // { title: "Reviews", icon: <ReviewsIcon />, path: '/adminDashboard/reviews' },
];

const AdminSlideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="flex">
      <div className="fixed justify-around top-0 left-0 h-full w-16 md:w-48 bg-amber-800 text-yellow-400 transition-all duration-200 overflow-hidden hover:w-64 z-50">
        <ul className="mt-2 space-y-1">
          <li className='h-10'></li>
          {
            sliderParts.map((item, key) => (
              <li key={key}>
                <NavLink
                  to={item.path}
                  end={item.path === '/adminDashboard/'}
                  className={({ isActive }) =>
                    `flex items-center p-3 transition-colors h-15 hover:bg-black ${isActive ? 'bg-black' : ''
                    }`
                  }
                >
                  <span className="text-xl w-12 mr-3">{item.icon}</span>
                  <span className="hidden md:inline font-sans text-sm">{item.title}</span>
                </NavLink>
              </li>
            ))
          }
        </ul>
        <ul className="absolute bottom-0 left-0 w-full">
          <li>
            <button className="flex items-center hover:bg-black p-3 transition-colors h-15 w-full text-left" onClick={() => { dispatch(logoutUser(navigate)); }}>
              <LogoutIcon className="text-xl w-12 mr-3" />
              <span className="hidden md:inline font-sans text-sm">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSlideBar;
