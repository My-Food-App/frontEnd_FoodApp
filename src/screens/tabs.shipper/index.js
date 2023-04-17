import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import {HomeShipper,Notification,User,OrderShiper} from "../index"


const Tab = createBottomTabNavigator();


export function ShiperTabs() {
    return (


        <Tab.Navigator

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLOR.BLUE : COLOR.BLACK;

                    switch (route.name) {
                        case "Trang chủ":
                            return (
                                <Image
                                    source={icons.home_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Thông báo":
                            return (
                                <Image
                                    source={icons.notification_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Đơn hàng":
                            return (
                                <Image
                                    source={icons.store_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        case "Tôi":
                            return (
                                <Image
                                    source={icons.user_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                component={HomeShipper}
            />   
             <Tab.Screen
                name="Đơn hàng"
                component={OrderShiper}
            />       
            <Tab.Screen
                name="Thông báo"
                component={Notification}
            />
             <Tab.Screen
                name="Tôi"
                component={User}
            />
        </Tab.Navigator>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// import React from 'react';
// import { Text, View } from 'react-native';

// export function ShiperTabs() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//       <Text>Notifi!</Text>
//     </View>
//   )
// }
