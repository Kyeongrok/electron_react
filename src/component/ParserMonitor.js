/**
 * Created by kyeongrok.kim on 2017-07-19.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import ResultTable2 from './AdminTable';
import {Table, Row, Col} from 'react-bootstrap';


class ParserMonitor extends React.Component{
    constructor() {
        super();
        this.state = {
            resultData: []
        };
    }

    render(){
        let mappedList = [];
        for (let item of this.state.resultData) {
            let key = item['product_code'] + "-" + item['item_code'];
            let product = this.state.ownProductMap[key];
            try {
                item['own_item_code'] = product['own_item_code'];
            } catch (e) {
            }
            mappedList.push(item);
        }




        return (
            <ResultTable2 data={mappedList}/>
        );

    }
}

export default ParserMonitor;