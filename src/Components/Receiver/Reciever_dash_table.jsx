import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from "react-router";

const Tab = ({ tabdat,myemail,mydet }) => {
  const navigate = useNavigate();
  // console.log("my",mydet);
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'fullName',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 150,
    },
    {
      title: 'Experience yrs',
      dataIndex: 'yearsOfExperience',
      key: '2yearsOfExperience',
      width: 150,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      width: 150,
    },
    {
      title: 'ServicesOffered',
      dataIndex: 'servicesOffered',
      key: 'servicesOffered',
      width: 150,
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
      width: 150,
    },
    {
      title: 'InterestsAndHobbies',
      dataIndex: 'personalInterestsAndHobbies',
      key: 'personalInterestsAndHobbies',
      width: 150,
    },
    {
      title: 'Spoken Languages',
      dataIndex: 'languagesSpoken',
      key: 'languagesSpoken',
      width: 150,
    },
    {
      title: 'Education',
      dataIndex: 'education',
      key: 'education',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: 'contactNumber',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      width: 150,
    },
    {
      title: 'ClientFocus',
      dataIndex: 'clientFocus',
      key: 'clientFocus',
      width: 150,
    },
    {
      title: 'Allergies',
      dataIndex: 'allergies',
      key: 'allergies',
      width: 150,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 130,
      render: (_, record) => (
        <Button style={styles.btn} onClick={() => Executemyfun(record)}>View Profile</Button>
      ),
    },
  ];

  const Executemyfun = (e) => {
    console.log("hello", e);
    navigate("/gviewforr", { state: { e ,myemail,mydet} });
  };

  console.log("tabdat", tabdat);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tabdat}
        scroll={{
          x: 1500,
          y: 250,
        }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 4,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default Tab;

const styles = {
  btn: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};
