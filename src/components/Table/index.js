import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { Button, Sort } from '../Button/index';


const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
}
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        }
        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
        this.setState({ sortKey, isSortReverse });
    }
    render() {
        const { sortKey, isSortReverse } = this.state;
        const { list, removeItem } = this.props
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return (
            <div className="col-sm-10 col-sm-offset-1">
                <div className='text-center'>
                    <Sort
                        sortKey={'NONE'}
                        onSort={this.onSort}
                        active={sortKey}
                    >
                        Default
        </Sort>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={this.onSort}
                        active={sortKey}
                    >
                        Title
        </Sort>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={this.onSort}
                        active={sortKey}
                    >
                        Author
        </Sort>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={this.onSort}
                        active={sortKey}
                    >
                        Comments
        </Sort>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={this.onSort}
                        active={sortKey}
                    >
                        Points
        </Sort>
                    <hr />
                </div>
                {
                    reverseSortedList.map(item =>
                        <div key={item.objectID}>
                            <h1>
                                <a href={item.url}>
                                    {item.title}</a>
                            </h1>
                            <h4>
                                {item.author} | {item.num_comments} Comments | {item.points} Points
                <Button
                                    className="btn btn-danger btn-xs"
                                    type="button"
                                    onClick={() => removeItem(item.objectID)}>
                                    Remove
                </Button>

                            </h4> <hr />
                        </div>
                    )
                }
            </div>
        )
    }
}


Table.prototypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            url: PropTypes.string,
            title: PropTypes.string,
            author: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.points,
        })
    ),
    removeItem: PropTypes.func.isRequired,
}

export default Table;