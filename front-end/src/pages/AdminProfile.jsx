import React from 'react';
import AdminSideBar from '../components/adminSideBar/adminSideBar';
import AdminProfileValues from '../components/adminProfile/index';

const AdminProfile = () => (
  <div>
    <AdminSideBar menuTitle="Admin - Profile"/>
    <AdminProfileValues />
  </div>
);

export default AdminProfile;
