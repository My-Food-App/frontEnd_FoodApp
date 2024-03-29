import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, ChangePassword, Register, ConfirmAccount, ForgotPassword,Home,OrderDetail,ShiperTabs,AddressPicker,SearchStore,
    Tabs,Account,DetailStore,DetailItem,MyStoreInfomation,CreateProduct,Order,Cart,MyOrder,FavoriteStore,
    GetLocation1,AdminTabs,ManagerAccountDetail,ManageStoreDetail,CreateShipper,UpdateProduct } from '../screens';
const Stack = createNativeStackNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor:'#FFFFFF'} }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="DetailStore" component={DetailStore} />
                <Stack.Screen name="DetailItem" component={DetailItem} />
                <Stack.Screen name="MyStoreInfomation" component={MyStoreInfomation} />
                <Stack.Screen name="CreateProduct" component={CreateProduct} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="MyOrder" component={MyOrder} />
                <Stack.Screen name="FavoriteStore" component={FavoriteStore} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} />
                <Stack.Screen name="ShiperTabs" component={ShiperTabs} />
                <Stack.Screen name="GetLocation" component={GetLocation1} />
                <Stack.Screen name="AddressPicker" component={AddressPicker} />
                <Stack.Screen name="SearchStore" component={SearchStore} />
                <Stack.Screen name="AdminTabs" component={AdminTabs} />
                <Stack.Screen name="ManagerAccountDetail" component={ManagerAccountDetail} />
                <Stack.Screen name="ManageStoreDetail" component={ManageStoreDetail} />
                <Stack.Screen name="CreateShipper" component={CreateShipper} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}