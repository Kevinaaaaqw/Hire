import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class Link extends Component {
    render(){
        return(
            <React.Fragment>
                {this.props.route.map((item,index)=>{
                    return(
                        <NavLink className='pe-3' to={item.link}>aaaa</NavLink>
                    )
                })}
            </React.Fragment>
        )
    }
}
export default Link