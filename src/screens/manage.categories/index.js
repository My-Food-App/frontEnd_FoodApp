import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import {myStore, dataDetail} from '../../data/data';
import {COLOR, SIZES, FONTS, icons} from '../../constants';
import {
  getCategories,
  deleteCategories,
  updateCategory,
  addCategory,
} from '../../api';
import {MyModal} from '../../components';
import {Input} from '../../components';

export function ManageCategogy() {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [modalAddCategoryVisible, setModalAddCategoryVisible] = useState(false);
  const [modalUpdateCategoryVisible, setModalUpdateCategoryVisible] =
    useState(false);
  const [categoryName_add, setCategoryName_add] = useState('');
  const [categoryImage_add, setCategoryImage_add] = useState(
    'https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_travelpictdinner_1484336833.png',
  );
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const pr = await getCategories();
    setCategories(pr);
  };

  const handleDeleteCategory = async () => {
    const id = category._id;
    await deleteCategories({id});
    setModalVisible(false);
    loadCategory();
  };
  const handleAddCategory = async () => {
    const name = categoryName_add;
    const image = categoryImage_add;
    await addCategory({name, image});
    setModalAddCategoryVisible(false);
    setCategoryImage_add(
      'https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_travelpictdinner_1484336833.png',
    );
    setCategoryName_add('');
    console.log('ADDDDDDDDDDDD');
  };

  const onUpdateCategory = async () => {
    const name = categoryName;
    const image = categoryImage;
    const id = category._id;
    await updateCategory({id, name, image});
    setModalUpdateCategoryVisible(false);
  };

  const openCallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      //  console.log("response=", response);
      if (response.didCancel) {
        console.log('user cancel');
      } else if (response.errorMessage) {
        console.log('error message:', response.errorMessage);
      } else {
        const source = 'data:image/jpeg;base64,' + response.assets[0].base64;
        setCategoryImage_add(source);
      }
    });
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontSize: 22,
            color: COLOR.BLACK,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Quản lý loại sản phẩm
        </Text>
      </View>
    );
  }

  const renderCategory = data => {
    const itemSize = width - 20;
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            marginRight: SIZES.radius,
            flexDirection: 'row',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            width: itemSize,
            height: 70,
            alignItems: 'center',
          }}
          onPress={() => {
            setCategory(item);
            setCategoryName(item.name);
            setCategoryImage(item.image);
            setModalVisible(true);
          }}>
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              marginVertical: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: 200,
              height: 50,
              marginLeft: 20,
              justifyContent: 'center',
            }}>
            <Text style={styles.fullname}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1}}>
        {/* foods */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            //              pagingEnabled
            showsHorizontalScrollIndicator={false}
            // onEndReachedThreshold={0.1}
            // onEndReached={loadMoreData}
          />
        </View>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <MyModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            height: 120,
            width: 220,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '500',
                fontStyle: 'italic',
                color: COLOR.BLACK,
              }}>
              {categoryName ? categoryName : ''}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setModalVisible(false);
                setModalUpdateCategoryVisible(true);
              }}>
              <Text style={styles.txtInBtn}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteCategory}
              style={styles.btnPost}>
              <Text style={styles.txtInBtn}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MyModal>
    );
  };

  const renderModalUpdateCategory = () => {
    return (
      <MyModal
        visible={modalUpdateCategoryVisible}
        onRequestClose={() => {
          setModalUpdateCategoryVisible(false);
        }}>
        <View
          style={{
            height: 370,
            width: 300,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                fontStyle: 'italic',
                color: COLOR.BLACK,
              }}>
              Cập nhật thông tin
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalUpdateCategoryVisible(false);
                // loadingStore();
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flex: 1, paddingTop: 0}}>
            <Text style={[styles.textTitle, {marginLeft: 10}]}>Hình ảnh:</Text>
            <TouchableOpacity>
              <Image
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
                source={{
                  uri: categoryImage,
                }}
              />
            </TouchableOpacity>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Tên:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Tên ..."
                value={categoryName}
                onChangeText={setCategoryName}
              />
            </View>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={async () => {
                  // await loadingStore()
                  setModalUpdateCategoryVisible(false);
                }}>
                <Text style={styles.txtInBtn}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await onUpdateCategory();
                  setTimeout(() => {
                    loadCategory();
                  }, 1500)
                }}
                style={styles.btnPost}>
                <Text style={styles.txtInBtn}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MyModal>
    );
  };

  const renderModalAddCategory = () => {
    return (
      <MyModal
        visible={modalAddCategoryVisible}
        onRequestClose={() => {
          setModalAddCategoryVisible(false);
        }}>
        <View
          style={{
            height: 370,
            width: 300,
            backgroundColor: COLOR.WHITE,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                fontStyle: 'italic',
                color: COLOR.BLACK,
              }}>
              Thêm loại sản phẩm
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalAddCategoryVisible(false);
                // loadingStore();
              }}
              style={{}}>
              <FontAwesome5 name="times" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flex: 1, paddingTop: 0}}>
            <Text style={[styles.textTitle, {marginLeft: 10}]}>Hình ảnh:</Text>
            <TouchableOpacity onPress={openCallery}>
              <Image
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
                source={{
                  uri: categoryImage_add,
                }}
              />
            </TouchableOpacity>
            <View style={styles.itemInContent}>
              <Text style={styles.textTitle}>Tên:</Text>
              <Input
                style={{marginTop: 10}}
                placeholder="Tên ..."
                value={categoryName_add}
                onChangeText={setCategoryName_add}
                
              />
            </View>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={async () => {
                  // await loadingStore()
                  setModalAddCategoryVisible(false);
                }}>
                <Text style={styles.txtInBtn}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await handleAddCategory()
                    .then(async() => {
                        setTimeout(() => {
                        loadCategory();
                      }, 1500)
                    })
                }}
                style={styles.btnPost}>
                <Text style={styles.txtInBtn}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MyModal>
    );
  };

  return (
    <View style={styles.container}>
      {renderModal()}
      {renderModalUpdateCategory()}
      {renderModalAddCategory()}
      {renderHeader()}
      {renderCategory(categories)}
      <TouchableOpacity
        onPress={() => {
          setModalAddCategoryVisible(true);
        }}>
        <Ionicons
          name="add-circle-outline"
          size={50}
          style={styles.iconAdd}
          color={COLOR.BLACK}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    position: 'relative',
  },
  headerContainer: {
    justifyContent: 'center',
    width: width,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLOR.lightGray3,
    height: 50,
    backgroundColor: COLOR.WHITE,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
  },
  fullname: {
    fontSize: 20,
    color: COLOR.BLACK,
  },
  iconAdd: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  btnCancel: {
    backgroundColor: COLOR.ORGANGE,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnPost: {
    backgroundColor: COLOR.GREEN2,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtInBtn: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  itemInContent: {
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLOR.BLACK,
  },
});
