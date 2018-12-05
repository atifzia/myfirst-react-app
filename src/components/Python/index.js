import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import {
    DEFAULT_HITS_PER_PAGE, BASE_PATH, SEARCH_PARAM, SEARCH_PATH,
    DEFAULT_PAGE, PARAM_PAGE, PARAM_HITS_PER_PAGE
} from '../../constants/index.js'
import Table from '../Table/index'
import { Button, IsLoading } from '../Button/index'


// filter the results by search
// function isSearched(searchTerm){
//   return function(item){
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }


const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading ? <IsLoading /> : <Component {...rest} />

const updateTopStories = (hits, page) => (prevState) => {
    const { results, searchKey } = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    return {
        results: { ...results, [searchKey]: { hits: updatedHits, page } },
        isLoading: false
    }

}

class Python extends Component {
    // setting up internal component state
    // ES6 class can use constructor to initialize internal state
    constructor(props) {
        super(props);
        this.state = {
            results: null,
            searchKey: '',
            searchTerm: "python",
            isLoading: false,

        }

        this.removeItem = this.removeItem.bind(this);
        // this.searchValue = this.searchValue.bind(this);
        this.setTopStories = this.setTopStories.bind(this);
        this.fetchStories = this.fetchStories.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);

    }

    removeItem(id) {
        const { results, searchKey } = this.state
        const { hits, page } = results[searchKey]
        const updatedList = hits.filter(item => item.objectID !== id);
        this.setState({ results: { ...results, [searchKey]: { hits: updatedList, page } } });
    }

    // searchValue(event) {
    //     this.setState({ searchTerm: event.target.value });
    // }

    setTopStories(fetchedResult) {
        const { hits, page } = fetchedResult;
        this.setState(updateTopStories(hits, page))
    }

    fetchStories(searchTerm, page) {
        this.setState({ isLoading: true })
        fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HITS_PER_PAGE}${DEFAULT_HITS_PER_PAGE}`)
            .then(response => response.json())
            .then(result => this.setTopStories(result))
            .catch(e => e);
    }

    componentDidMount() {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm });
        this.fetchStories(searchTerm, DEFAULT_PAGE);
    }

    checkTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // onSubmit(event) {
    //     const { searchTerm } = this.state
    //     this.setState({ searchKey: searchTerm });
    //     if (this.checkTopStories(searchTerm)) {
    //         this.fetchStories(searchTerm, DEFAULT_PAGE);
    //     }
    //     event.preventDefault();
    // }

    render() {
        const { results, searchTerm, searchKey, isLoading } = this.state;
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <div className="jumbotron text-center">
                            <h1 style={{ fontWeight: 'bold', color: 'white' }}>Python</h1>
                            <hr style={{ border: '2px solid white', width: '100px' }} />
                        </div>
                    </Row>
                </Grid>
                <Grid>
                    <Row>
                        <Table
                            list={list}
                            removeItem={this.removeItem}
                        />
                        <div className="text-center alert ">
                            <ButtonWithLoading
                                isLoading={isLoading}
                                className="btn btn-success lbn"
                                onClick={() => this.fetchStories(searchTerm, page + 1)}
                            >
                                Load More
            </ButtonWithLoading>
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const ButtonWithLoading = withLoading(Button)

export default Python;





