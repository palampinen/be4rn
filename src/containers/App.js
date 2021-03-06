import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Tabs from '../components/Tabs';
import DetailItem from '../components/DetailItem';
import TabOptions from '../constants/tabs';
import { selectItem, closeItem, fetchItems, selectTab } from '../actions/app-actions';

class App extends Component {

  componentDidMount() {
    this.fetchData(this.props.currentTab);
  }

  componentWillReceiveProps(nextProps) {
    const tabChanged = nextProps.currentTab !== this.props.currentTab;

    if (tabChanged){
      this.fetchData(nextProps.currentTab)
    }
  }

  fetchData(currentTab) {
    const category = TabOptions[currentTab];
    this.props.fetchItems(category);
  }

  // TODO component from this
  renderList() {
    return (
      <div className="list">
        {this.props.items.map((item, index) => (
          <ListItem key={index} item={item} selectItem={this.props.selectItem} />
        ))}
      </div>
    );
  }

  renderItem(item) {
    return (<DetailItem item={item} closeItem={this.props.closeItem} />);
  }

  render() {

    const { currentTab, selectTab, chosenItem } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <Header
            isInDetailView={this.props.chosenItem}
            closeItem={this.props.closeItem}
            title={`Introduction to ${TabOptions[currentTab] || 'React'}`}
          />
        </div>
        <div className="App-content">
          <div className="App-content__scroll">
            {
              chosenItem ?
                this.renderItem(chosenItem) :
                this.renderList()
            }
          </div>
        </div>
        <div className="App-footer">
          <Tabs
            tabs={TabOptions}
            selectTab={selectTab}
            currentTab={currentTab}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  items: store.get('items'),
  chosenItem: store.get('chosenItem'),
  currentTab: store.get('currentTab')
});

const mapDispatchToProps = ({
  fetchItems,
  selectItem,
  closeItem,
  selectTab
});

export default connect(mapStateToProps, mapDispatchToProps)(App);