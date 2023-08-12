import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { baseURL, endpoint } from '../Api/api';
import Card from '../component/Card';

const FavScreen = ({ navigation }) => {
  const [favoriteTransactions, setFavoriteTransactions] = useState([]);

  useEffect(() => {
    fetchFavoriteTransactions();
  }, []);

  const fetchFavoriteTransactions = async () => {
    try {
      const response = await fetch(baseURL + endpoint.GET_FAVORITE_TRANSACTIONS);
      const data = await response.json();
      setFavoriteTransactions(data);
      console.log(data,"fe")
    } catch (error) {
      console.error('Error fetching favorite transactions:', error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={{textAlign:'center', fontSize: 25, paddingTop: 10}}>IMPORTANT TRANSACTION</Text>
    <FlatList
      data={favoriteTransactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <Card
            amount={item.amount}
            date={item.date}
            category={item.category}
            transactions_type={item.transactions_type}
           
          />
      )}
    />
   
  </View>  );
};




export default FavScreen;