import React from 'react';
import {SearchBar, Toast, Modal, List} from 'antd-mobile';
import MapView from 'COMPONENTS/mapView';
import {inject, observer} from "mobx-react";

@inject(stores => ({
    ...stores.signInStore.state,
    mapSearch: stores.signInStore.mapSearch,
    setBMap: stores.signInStore.setBMap,
    setMarker: stores.signInStore.setMarker,
    signIn: stores.signInStore.signIn,
    setStoreState: stores.signInStore.setStoreState,
    resetStoreState: stores.signInStore.resetStoreState,

    handleTabChange: stores.mainStore.handleTabChange
}))
@observer
export default class SignIn extends React.Component {
    state = {};

    setStoreState = this.props.setStoreState;
    mapSearch = this.props.mapSearch;
    setBMap = this.props.setBMap;
    setMarker = this.props.setMarker;
    signIn = this.props.signIn;
    handleTabChange = this.props.handleTabChange;

    onMapLoad = (BMap) => {
        let map = new BMap.Map('map-view'); // 创建Map实例
        this.setBMap(map, this.handleOnSearch);
    };

    handleOnSearch = (result) => {
        if (result === true) {
            Toast.hide();
            this.handleClose('searchResultModal', true)();
        } else {
            Toast.fail('未搜索到结果', 2);
        }
    };

    handleSearchChange = (searchValue) => {
        this.handleClose('searchResultModal')();
        this.setStoreState({searchValue});
    };

    handleSearchSubmit = (value) => {
        Toast.loading('loading...', 0, null);
        this.mapSearch(value);
    };

    handleClose = (modalName, visible) => () => {
        this.setState({[modalName + 'Visible']: visible});
    };

    handleModalListClick = (item) => () => {
        this.handleClose('searchResultModal')();
        this.setStoreState({searchValue: ''});
        this.setMarker(item);
    };

    render() {
        const {searchValue, searchResult} = this.props;
        const {searchResultModalVisible, searchResultModalFocus} = this.state;
        return (
            <div className='sign-in-container'>
                <div className='sign-in'>
                    <SearchBar placeholder="搜索" maxLength={15} value={searchValue}
                               focus={searchResultModalFocus}
                               onChange={this.handleSearchChange}
                               onSubmit={this.handleSearchSubmit}/>
                    <MapView id="map-view" className="map-view" onMapLoad={this.onMapLoad}/>
                </div>
                <Modal
                    animationType="slide-up" popup
                    visible={searchResultModalVisible}
                    title='搜索结果'
                    onClose={this.handleClose('searchResultModal')}>
                    <List className='modal-popup-list'>
                        {searchResult.map((item, index) =>
                            <List.Item key={index} arrow="horizontal" multipleLine
                                       onClick={this.handleModalListClick(item)}>
                                {item.title}<List.Item.Brief>{item.address}</List.Item.Brief>
                            </List.Item>
                        )}
                    </List>
                </Modal>

            </div>
        );
    }
}