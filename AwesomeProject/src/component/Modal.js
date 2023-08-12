import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ModalBox from 'react-native-modalbox';

const AddFoodRecipeButtonModal = ({modalRef, addFood = ()=>{}, select=null, updateFood= ()=>{}}) => {
  const [transactions_type, setType] = useState(select===null ? '' : select.transactions_type);
  const [amount, setAmount] = useState(select===null ? '' : select.amount);
  const [note, setNote] = useState(select===null ? '' : select.note);
  const [category, setCategory] = useState(select===null ? '' : select.category);

  const toggleModal = () => {
    // modalRef.current.closed();
  };
  const transactionTypeOptions = ['income', 'expense'];

  const handleAddFoodRecipe = () => {
    addFood({ transactions_type, amount, note , category})
    setType('');
    setAmount('');
    setNote('');
    setCategory('')
    // toggleModal();
  };
  const handleUpdateFood = () => {
    const data = {
      transactions_type, amount, note, id: select.id, category, date: select.date
    }
    updateFood(data)

  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      {/* <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <ModalBox
        style={{height: 500, backgroundColor: 'red', flex: 1}}
        ref={addFoodRecipeModal}> */}
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{select===null ? 'Add' : 'Edit'}</Text>
          <SelectDropdown
        data={transactionTypeOptions}
        onSelect={(selectedItem) => setType(selectedItem)}
        defaultButtonText={transactions_type || 'Select Transaction Type'}
        buttonStyle={styles.input}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
      />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount.toString()}
            onChangeText={(text) => setAmount(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={(text) => setCategory(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Note"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
          <Button title="Add" onPress={handleAddFoodRecipe} />
          <Button title="Update" onPress={handleUpdateFood} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      {/* </ModalBox> */}
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default AddFoodRecipeButtonModal;
