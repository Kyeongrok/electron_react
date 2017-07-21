/**
 * Created by kyeongrok.kim on 2017-07-19.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import AdminTable from './AdminTable';
import {Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';


class ParserMonitor extends React.Component{
    render(){
        let mappedList = [];
        for (let item of this.state.resultDataSecond) {
            mappedList.push(item);
        }

        //console.log("this is ParserMonitor");
        //console.log(this.state.resultDataSecond);


        return (
            <AdminTable data={mappedList}/>
        );

    }

}


export default ParserMonitor;