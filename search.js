'use strict';

const jis_search = React.createElement;
const jisSearchContainer = document.querySelector('#jis-search-btn');

class SearchJis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  handleSearchClick(){
    this.setState({
        isActive: true
    })
  }

  componentDidMount(){
    console.log('up!');
  }

  closeSearch(){
    this.setState({
        isActive: false
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "jis-search-btn",
      onClick: this.handleSearchClick
    }), this.state.active && /*#__PURE__*/React.createElement("div", {
      className: "jis-search-form-container"
    }, /*#__PURE__*/React.createElement("button", {
      className: "jis-close-search-btn",
      onClick: closeSearch
    }, "x"), /*#__PURE__*/React.createElement("form", {
      role: "search",
      method: "get",
      className: "jis-search-form form-inline",
      action: jisSearchContainer.dataset.action
    }, /*#__PURE__*/React.createElement("label", {
      className: "sr-only"
    }, jisSearchContainer.dataset.label), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("input", {
      type: "search",
      value: jisSearchContainer.dataset.query,
      name: "s",
      className: "search-field form-control",
      placeholder: jisSearchContainer.dataset.placeholder
    }), /*#__PURE__*/React.createElement("span", {
      className: "input-group-btn"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "search-submit btn btn-default"
    }, jisSearchContainer.dataset.submitlabel))))));
    
  }
}

const searchRoot = ReactDOM.createRoot(jisSearchContainer);
searchRoot.render(jis_search(SearchJis));

// <>
// <button type="button" className="jis-search-btn" onClick={this.handleSearchClick}></button>
// { this.state.active &&
//     <div className="jis-search-form-container">
//         <button className="jis-close-search-btn" onClick={closeSearch}>x</button>
//         <form role="search" method="get" className="jis-search-form form-inline" action={jisSearchContainer.dataset.action}>
//         <label className="sr-only">{jisSearchContainer.dataset.label}</label>
//         <div className="input-group">
//             <input type="search" value={jisSearchContainer.dataset.query} name="s" className="search-field form-control" placeholder={jisSearchContainer.dataset.placeholder} />
//             <span className="input-group-btn">
//             <button type="submit" className="search-submit btn btn-default">{jisSearchContainer.dataset.submitlabel}</button>
//             </span>
//         </div>
//         </form>
//     </div>
// }
// </>