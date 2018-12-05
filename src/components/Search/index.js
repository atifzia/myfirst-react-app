import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Button } from '../Button/index';


class Search extends Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
    }
    componentDidMount() {
        this.searchInput.current.focus();
    }
    render() {
        const { onChange, value, onSubmit, children } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <FormGroup>

                    <h1 style={{ fontWeight: 'bold', color: 'white' }}>{children}</h1>
                    <hr style={{ border: '2px solid white', width: '100px' }} />

                    <div className="input-group">
                        <input
                            className="form-control width100 searchForm"
                            type="text"
                            onChange={onChange}
                            value={value}
                            ref={this.searchInput}
                        />
                        <span className="input-group-btn">
                            <Button
                                className="btn btn-primary searchBtn"
                                type="submit"
                            >
                                Search
            </Button>
                        </span>
                    </div>
                </FormGroup>
            </form>
        )
    }

}

export default Search;
