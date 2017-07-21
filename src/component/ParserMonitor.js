/**
 * Created by kyeongrok.kim on 2017-07-19.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import AdminTable from './AdminTable';
import {Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';


class ParserMonitor extends React.Component{
    constructor() {
        super();
        this.state = {
            resultData: []
        };
    }

    componentWillMount() {

        console.log("component will mount hello");
        this.ajaxCall();
    }

    render(){
        let mappedList = [];
        for (let item of this.state.resultData) {
            mappedList.push(item);
        }

        console.log("this is ParserMonitor");
        console.log(this.state.resultData);


        return (
            <AdminTable data={mappedList}/>
        );

    }

    ajaxCall() {
        let host1 = window.location.hostname;
        axios.get("http://" + host1 + ":9000/cafe24", {
            params: {}
        })
            .then((response) => {
                console.log(response);
                let map = response['data'];
                this.setState({"resultData": map});
            });
    }
}


export default ParserMonitor;