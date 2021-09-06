import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions'



export default () => {

    useEffect(() => {
        requestLocationPermission();
    }, [])

    const requestLocationPermission = async () => {
        if (Platform === 'ios') {
            var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('iphone', response)

            if (request === 'granted') {
                this.locateCurrentPosition();
            }
        } else {
            var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            console.log('android is ', response)

            if (request === 'granted') {
                this.locateCurrentPosition();
            }

        }
    }

    let locateCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(JSON.stringify(position));

                let initialPosition= {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }
                setState({initialPosition})
            },
            error => Alert.alert(error.message),
            {enableHighAccuracy:true, timeout:10000, maximumAge:1000}
        )
    }

    return (

        < View style={styles.container} >
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map=>_map=map}
                showsUserLocation={true}
                style={styles.map}
                // initialRegion={initialPosition}
                >
                {/* <Marker
                    coordinate={{ latitude: 25.1998015, longitude: 66.5551213 }}
               
                >
                    <Callout>
                        <Text>karachi</Text>
                    </Callout>


                </Marker> */}
            </MapView>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});