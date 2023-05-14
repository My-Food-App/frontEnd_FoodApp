import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLOR, SIZES, FONTS ,icons} from "../../constants";
import {ManagerAccount,ManagerStore,User,Statistical,ManageCategogy} from "../index"


const Tab = createBottomTabNavigator();


export function AdminTabs() {
    return (


        <Tab.Navigator

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLOR.BLUE : COLOR.BLACK;

                    switch (route.name) {
                        case "QL tài khoản":
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

                        case "QL cửa hàng":
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

                            case "QL loại SP":
                                return (
                                    <Image
                                        source={icons.category_icon}
                                        resizeMode="contain"
                                        style={{
                                            tintColor: tintColor,
                                            width: 25,
                                            height: 25
                                        }}
                                    />
                                )

                        case "Thống kê":
                            return (
                                <Image
                                    source={icons.statistical_icon}
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
                name="QL tài khoản"
                component={ManagerAccount}
            />   
             <Tab.Screen
                name="QL cửa hàng"
                component={ManagerStore}
            />   
            <Tab.Screen
                name="QL loại SP"
                component={ManageCategogy}
            />      
            <Tab.Screen
                name="Thống kê"
                component={Statistical}
            />
             {/* <Tab.Screen
                name="Tôi"
                component={User}
            /> */}
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
