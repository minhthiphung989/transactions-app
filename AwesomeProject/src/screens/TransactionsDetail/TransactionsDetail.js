import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddFoodRecipeButtonModal from '../../component/Modal';
import ModalBox from 'react-native-modalbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, endpoint } from '../../Api/api';

const TransactionsDetail = ({navigation, route}) => {
  const {item, editItem, favoriteTransactions} = route.params;
  const [detail, setDetail] = useState(item);
  const addFoodRecipeModal = useRef(null);
  const updateFood = transactions => {
    editItem(transactions);
    setDetail(transactions);
  };
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch(`${baseURL}${endpoint.ADD_IMPORTANT}/${detail.id}`, {
        method: 'POST',
      });
      console.log(response);
  
      if (response.status === 201) {
        console.log("Thêm vào yêu thích thành công");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào yêu thích:", error);
    }
  };
  

  
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', margin: 10}}>
        <Image
          style={{
            width: 20,
            height: 20,
            borderTopLeftRadius: 10,
          }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png',
          }}></Image>
        <Text style={{fontWeight: '500'}}> BACK TO LIST</Text>
      </TouchableOpacity>
        <View
          style={{
            paddingTop: 20
          }}>
            <Text style={{fontSize: 25, textAlign:'center'}}>TRANSACTION DETAIL</Text>
          <View style={{paddingLeft: 16}}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingRight: 24,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Transaction Type:
                </Text>

                <View
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: detail.transactions_type === 'income' ? '#91C894' : '#E07A7E',
                  }}>
                  {detail.transactions_type}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 16}}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingRight: 24,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Category:
                </Text>

                <View
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  {detail.category}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 16}}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingRight: 24,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Note:
                </Text>

                <View
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  {detail.note}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 16}}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingRight: 24,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Date:
                </Text>

                <View
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  {detail.date}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 16}}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingRight: 24,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Amount:
                </Text>

                <View
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: detail.transactions_type === 'income' ? '#91C894' : '#E04348',
                  }}>
                  ${detail.amount}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      <TouchableOpacity
        style={{
          borderRadius: 100,
          margin: 10,
          height: 30,
          width: "90%",
          justifyContent: 'center',
          alignItems: 'center',
          borderColor:'#004D99',
           borderWidth: 1
        }}
        onPress={() => addFoodRecipeModal.current.open()}>
        <Text style={{ color:'#004D99',fontWeight:'500'}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 100,
          margin: 10,
          height: 30,
          width: "90%",
          justifyContent: 'center',
          alignItems: 'center',
          borderColor:'#004D99',
           borderWidth: 1
        }}
        onPress={handleAddToFavorites} >
        <Text style={{ color:'#004D99',fontWeight:'500'}}>ADD IMPORTANT</Text>
      </TouchableOpacity>
      <ModalBox style={{marginTop: 100, flex: 1}} ref={addFoodRecipeModal}>
        <AddFoodRecipeButtonModal
          select={detail}
          modalRef={addFoodRecipeModal}
          updateFood={updateFood}
        />
      </ModalBox>
    </View>
  );
};

export default TransactionsDetail;
