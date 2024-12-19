import React, { useEffect, useState } from "react";
import { Table, Input, message } from "antd";
import axios from 'axios';
import moment from 'moment';

const Application = () => {
    const [dataSource, setDataSource] = useState([]);
    const [searchedText, setSearchedText] = useState('');
    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/RashitKhamidullin/Educhain-Assignment/refs/heads/main/applications`)
            .then(res => {
                let rowData = [];
                console.log(res.data);
                Object.entries(res.data).forEach(([key, val]) => {
                    val['slno'] = parseInt(key) + 1;
                    const dt = val['applicationDate'];
                    var splitStr = dt.split('/');
                    let dateStr = splitStr[1] + '-' + splitStr[0] + '-' + splitStr[2];
                    const fd = new Date(dateStr);
                    val['dateSort'] = fd.getFullYear() + '' + String(parseInt(fd.getMonth()) + 1).padStart(2, '0') + '' + String(fd.getDate()).padStart(2, '0');
                    rowData.push(val);
                })
                setDataSource(rowData);
            }).catch((error) => {
                alert("Something went wrong. \n " + error.message);
            })
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'slno',
            key: 'slno'
        },
        {
            title: 'Application No',
            dataIndex: 'applicationNO',
            key: 'applicationNO',
            sorter: (a, b) => a.applicationNO - b.applicationNO
        },
        {
            title: 'Applicant Name',
            dataIndex: 'applicantName',
            key: 'applicantName',
            sorter: (a, b) => a.applicantName.length - b.applicantName.length,
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.applicantName).toLowerCase().includes(value.toLowerCase())
                    || String(record.studentID).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_En).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_Ar).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Application Date',
            dataIndex: 'applicationDate',
            key: 'applicationDate',
            sorter: (a, b) => {
                console.log(a.dateSort);
                console.log(b.dateSort);
                return a.dateSort - b.dateSort;
            }
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentID',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.applicantName).toLowerCase().includes(value.toLowerCase())
                    || String(record.studentID).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_En).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_Ar).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
        },
        {
            title: 'Status (English)',
            dataIndex: 'status_En',
            key: 'status_En',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.applicantName).toLowerCase().includes(value.toLowerCase())
                    || String(record.studentID).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_En).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_Ar).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Status (Arabic)',
            dataIndex: 'status_Ar',
            key: 'status_Ar',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return String(record.applicantName).toLowerCase().includes(value.toLowerCase())
                    || String(record.studentID).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_En).toLowerCase().includes(value.toLowerCase())
                    || String(record.status_Ar).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastDate',
            key: 'lastDate',
        },
    ];
    const searchData = (value, record) => {
        return String(record.applicationNO).toLowerCase().includes(value.toLowerCase())
            || String(record.applicationNO).toLowerCase().includes(value.toLowerCase())
            || String(record.applicationNO).toLowerCase().includes(value.toLowerCase())
    }
    return (
        <div style={{ width: 1200, marginTop: 30 }} >
            <Input.Search placeholder="Search here..." style={{ marginBottom: 10, width: 320 }}
                onSearch={(value) => { setSearchedText(value) }} onChange={(e) => {
                    setSearchedText(e.target.value);
                }} />
            <Table dataSource={dataSource} columns={columns} rowKey={dataSource.slno} />
        </div>
    );
};

export default Application;
