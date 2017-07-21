import React from 'react';

/*
사용법
 <PageNation
 viewList = {50}
 nowPageNum={this.state.nowPageNum}
 totalCount={this.state.totalCount}
 handleChangePage={this.handleChangePage}/>
 */

class PageNation extends React.Component{

    constructor(props) {
        super(props);
        this.state = { viewPage : 10 }
    }
    render(){
        // 페이징 처리
        let totalPage = Math.ceil(this.props.totalCount / this.props.viewList);
        let pageEnd = Math.ceil(this.props.nowPageNum/this.state.viewPage) * this.state.viewPage;
        let pageBtnList = [];
        let num = 0;
        for(let num = (pageEnd-9); num<=pageEnd && num<=totalPage; num++){
            pageBtnList.push(<li key={num} className={num==this.props.nowPageNum ? "active" : ""}><a href="javascript:;" onClick={() =>{this.props.handleChangePage(num)}}>{num}</a></li>);
        }
        return(
            <div className={this.props.mode == "livetabAdmin" ? "text-center" : "container text-center"}>
                <ul className="pagination">
                    <li className={this.props.nowPageNum <= 1 ? "disabled" : ""}>
                        <a href="javascript:;" onClick={this.props.nowPageNum <= 1 ? null : () =>{this.props.handleChangePage(1)} }>처음으로</a>
                    </li>
                    <li className={this.props.nowPageNum <= 10 || totalPage <= 10 ? "disabled" : ""}>
                        <a href="javascript:;" onClick={this.props.nowPageNum <= 10 || totalPage <= 10 ? null : () =>{this.props.handleChangePage(pageEnd - 10)}}>이전</a>
                    </li>
                    {pageBtnList}
                    <li className={this.props.nowPageNum == totalPage || pageEnd >= totalPage ? "disabled" : ""}>
                        <a href="javascript:;" onClick={this.props.nowPageNum == totalPage || pageEnd > totalPage ? null : () =>{this.props.handleChangePage(pageEnd + 1)}}>다음</a>
                    </li>
                    <li className={this.props.nowPageNum == totalPage || totalPage == 0 ? "disabled" : ""}>
                        <a href="javascript:;" onClick={ this.props.nowPageNum == totalPage || totalPage == 0 ? null : () =>{this.props.handleChangePage(totalPage)}}>마지막</a>
                    </li>
                </ul>
            </div>
        )
    }
};

export default PageNation;