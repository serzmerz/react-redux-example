import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/protectedData';

export class SomeProtectedComponent extends React.Component {

    componentWillMount () {
        this.fetchData();
    }

    fetchData () {
        let token = this.props.token;
        this.props.actions.fetchProtectedData(token);
    }

    render () {
      let res = (this.props.isFetching)? <h1>Loading data...</h1> :
      <div>
          <h1>Welcome back, you id:
              {this.props.data.id}!</h1>
              <h3>You accessToken created at: {this.props.data.iat}</h3>
              <h3>You accessToken expires: {this.props.data.exp}</h3>
      </div>;
        return (
            <div>
              {res}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data.data,
    isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SomeProtectedComponent);
