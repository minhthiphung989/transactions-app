import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Card = ({
  category,
  transactions_type,
  amount,
  date,
  removeFood = () => {},
  handleUpdate,
  showDetail,
}) => {
  const handleRemoveFood = () => {
    removeFood();
  };
  return (
    <TouchableOpacity
      style={{
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
      }}
      onPress={showDetail}>
      <View>
        {/* <Image
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={{uri: img}}></Image> */}
        <TouchableOpacity
          style={{
            borderRadius: 100,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 5,
            right: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'white',
          }}
          onPress={handleRemoveFood}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 100,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // position: 'absolute',
            marginTop: 3,
           marginLeft: 260,
            width: 50,
            height: 30,
            // top: 5,
            // right: 40,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'white',
          }}
          onPress={handleUpdate}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>{category}</Text>
          <Text>{date}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 20}}>
          <Text
            style={{
              color: transactions_type === 'income' ? '#91C894' : '#E07A7E',
              marginTop: 5,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {amount}${' '}
          </Text>
          <Text
            style={{
              borderWidth: 2,
              borderColor:
                transactions_type === 'income' ? '#91C894' : '#E39694',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}>
            {transactions_type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
