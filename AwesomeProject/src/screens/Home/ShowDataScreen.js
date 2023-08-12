import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { baseURL, endpoint } from '../../Api/api';
import Card from '../../component/Card';
import AddFoodRecipeButtonModal from '../../component/Modal';

const ShowDataScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectFood, setSelectFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    let total = 0;
    data.forEach(item => {
      if (item.transactions_type === 'income') {
        total += item.amount;
      } else {
        total -= item.amount;
      }
    });
    setTotalBalance(total);
  }, [data]);

  const addFoodRecipeModal = useRef(null);

  useEffect(() => {
    getData();
  }, []);
 
  useEffect(() => {
    if (selectFood) {
      const updatedData = data.map(item => {
        if (item.id === selectFood.id) {
          return selectFood;
        }
        return item;
      });

      setData([...updatedData]);
    }
  }, [selectFood]);

  

  const getData = async () => {
    try {
      let response = await fetch(baseURL + endpoint.GET_DATA);
      const food = await response.json();
      setData(food);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const addFood = async (food) => {
    try {
      const { amount, note, transactions_type, category } = food;
  
      const response = await fetch(baseURL + endpoint.ADD_TRANSACTIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          note,
          transactions_type,
          category
        }),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        // Cập nhật dữ liệu sau khi thêm giao dịch thành công
        setData(responseData.data.transactions);
        console.log(responseData.message);
      } else {
        console.error('Error adding transaction:', responseData.message);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };
  
  
  

  const removeFood = async ({ item }) => {
    try {
      const response = await fetch(
        baseURL + endpoint.DELETE_TRANSACTIONS + item.id,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        getData();
      } else {
        console.error('Error deleting food:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const updateFood1 = async updateTransactions => {
    try {
      const response = await fetch(baseURL + endpoint.EDIT_TRANSACTIONS + updateTransactions.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTransactions),
      });
  
      if (response.ok) {
        const updatedData = data.map(item => {
          if (item.id === updateTransactions.id) {
            return { ...item, ...updateTransactions };
          }
          return item;
        });
  console.log(updateTransactions, "sds")
        setData(updatedData);
        setSelectFood(updateTransactions);
  
        console.log('Food updated successfully');
      } else {
        console.error('Error updating food:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };
  
  const Refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getData();
    }, 2000);
  };

  const showDetail = async ({ item }) => {
    try {
      let response = await fetch(baseURL + endpoint.GET_DETAIL + item.id);
      let detail = await response.json();
      navigation.navigate('TransactionsDetail', { item: detail, editItem: updateFood1 });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

<Text style={{textAlign:'center', fontSize: 25}}>
TOTAL SPENDABLE MONEY:  ${totalBalance.toFixed(2)}
    </Text>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={Refresh}></RefreshControl>
        }
        pagingEnabled
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card
            amount={item.amount}
            date={item.date}
            category={item.category}
            transactions_type={item.transactions_type}
            removeFood={() => removeFood({ item, index })}
            showDetail={() => showDetail({ item, index })}
            handleUpdate={() => {
              setSelectFood(item);
              setTimeout(() => {
                addFoodRecipeModal.current.open();
              }, 100);
            }}
          />
        )}
      />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => addFoodRecipeModal.current.open()}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ModalBox style={{ marginTop: 100, flex: 1 }} ref={addFoodRecipeModal}>
        <AddFoodRecipeButtonModal
          modalRef={addFoodRecipeModal}
          updateFood={updateFood1}
          addFood={addFood}
          select={selectFood}
        />
      </ModalBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 100,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowDataScreen;
