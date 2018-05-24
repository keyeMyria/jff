import React from 'react';
import {observable, action} from "mobx";
import {ServerError} from 'EXCEPTION';

function InitState() {
    return {
        searchValue: '',
        searchResult: [],
        point: undefined
    };
}

class Store {
    @observable state = new InitState();
    mapControl = {};

    @action
    mapSearch = (searchStr) => {
        this.state.searchResult = [];
        if (this.mapControl.localSearch) this.mapControl.localSearch.search(searchStr);
    };

    @action
    setMarker = (result) => {
        if (this.mapControl.map) {
            setTimeout(() => {
                this.markerAndInfo(result);
            }, 500);
        }
    };

    @action
    setBMap = (map, handleOnSearch) => {
        map.centerAndZoom('上海市'); // 初始化地图,设置中心点坐标和地图级别
        let BMap = window.BMap;
        let geolocation = new BMap.Geolocation();
        let myGeo = new BMap.Geocoder();
        let localSearch = new BMap.LocalSearch(map.getCenter());

        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.GeolocationControl());

        localSearch.setSearchCompleteCallback((results) => {
            if (localSearch.getStatus() === window.BMAP_STATUS_SUCCESS) {
                let searchResult = [];
                for (let i = 0; i < results.getCurrentNumPois(); i++) {
                    let poi = results.getPoi(i);
                    searchResult.push({
                        address: poi.address, point: poi.point, title: poi.title
                    });
                }
                this.state.searchResult = searchResult;
                if (handleOnSearch) handleOnSearch(true);
            } else {
                if (handleOnSearch) handleOnSearch(results);
            }
        });

        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS && r.point.lat && r.point.lng)
                map.panTo(r.point);
        });
        map.addEventListener("longpress", (e) => {
            myGeo.getLocation(e.point, (result) => {
                if (result) this.markerAndInfo(result);
            });
        });
        this.mapControl = {map, myGeo, localSearch};
    };


    markerAndInfo = ({point, address}) => {
        if (!point || !address) return;
        let BMap = window.BMap;
        let infoWindow = new BMap.InfoWindow(JSON.stringify(point), {width: 0, height: 0, title: address});
        const {map, marker} = this.mapControl;
        if (!marker) {
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
            marker.addEventListener('click', () => {
                marker.closeInfoWindow();
                marker.openInfoWindow(infoWindow);
            });
            this.mapControl.marker = marker;
        } else {
            marker.setPosition(point);
        }

        map.openInfoWindow(infoWindow, point);
        map.panTo(point);
        this.state.point = {...point, address};
        if (map.getZoom() < 16) setTimeout(() => map.setZoom(17), 500);
    };

    @action
    setStoreState = (state) => {
        this.state = {...this.state, ...state};
    };

    @action
    resetStoreState = (stateName) => {
        let nState = new InitState();
        if (stateName) {
            this.state[stateName] = nState[stateName];
        } else {
            this.state = nState;
        }
    }

}

export default new Store();

