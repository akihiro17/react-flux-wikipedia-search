var React = require('react');
var ResultList = require('../components/ResultList.react');
var WikipediaActions = require('../actions/WikipediaActions.react');
var WikipediaStore = require('../stores/WikipediaStores.react');

var WikipediaThrower = React.createClass({
    getInitialState: function () {
        return {
            term: '',
            results: []
        }
    },

    updateTerm: function () {
        term = this.refs.input.getDOMNode().value;
        WikipediaActions.search(term);
        this.setState({term: term})
    },

    componentDidMount: function() {
        WikipediaStore.addChangeListener(this._onChange);
    },  

    componentWillUnmount: function() {
        WikipediaStore.removeChangeListener(this._onChange);
    },
    
    render: function () {
        return(
                <div>
                <h1>Wikipedia Search</h1>
                <input ref="input" type="text" size="100" value={this.state.term} onChange={this.updateTerm} />
                <ResultList results={this.state.results} />
                </div>
        );
    },

    _onChange: function () {
        this.setState({results: WikipediaStore.getResults()});
    }
});

module.exports = WikipediaThrower;
