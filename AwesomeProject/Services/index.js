const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// Đọc dữ liệu từ tập tin JSON
const rawData = fs.readFileSync("./data.json");
const data = JSON.parse(rawData);

app.use(express.json());

app.get("/api/transactions", (req, res) => {
  res.status(200).json(data.transactions);
});

app.get("/api/transactions/:id", (req, res) => {
  const id = req.params.id;
  const finder = data.transactions.find(item => item.id == id);
  if (finder) {
    res.status(200).json(finder);
  } else {
    res.status(404).json({ message: 'Error' });
  }
});

app.get("/api/transactions/search/:search", (req, res) => {
  const search = req.params.search.toLowerCase();
  const searchData = data.transactions.filter(
    item =>
      item.category.toLowerCase().includes(search) ||
      item.note.toLowerCase().includes(search)
  );
  if (searchData.length > 0) {
    res.status(200).json(searchData);
  } else {
    res.status(404).json({ message: "Error" });
  }
});

app.post("/api/addTransactions", (req, res) => {
  const { amount, note, transactions_type, category } = req.body;

  if (!amount || !transactions_type) {
    res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin" });
  } else {
    const newTransaction = {
      amount,
      note: note || "",
      transactions_type,
      id: Math.random(),
      category,
      date: new Date().toISOString().slice(0, 10),
    };
    data.transactions.unshift(newTransaction);

    // Cập nhật tổng số tiền tiêu trong dữ liệu
    if (transactions_type === "expense") {
      data.total_expenses += parseFloat(amount);
    }

    res.status(201).json({
      message: "Thêm giao dịch thành công",
      data: { transactions: data.transactions, total_expenses: data.total_expenses },
    });
  }
});
app.get("/api/favoriteTransactions", (req, res) => {
  res.status(200).json(data.favoriteTransactions);
});

app.post("/api/addFavoriteTransaction/:id", (req, res) => {
  const id = req.params.id;

  const transactionToAdd = data.transactions.find(item => item.id == id);
  if (!transactionToAdd) {
    res.status(404).json({ message: "Không tìm thấy chi tiêu" });
  } else {
    data.favoriteTransactions.push(transactionToAdd);
    console.log(data.favoriteTransactions)
    res.status(201).json({ message: "Thêm vào yêu thích thành công" });
  }
});


app.put("/api/editTransactions/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const indexFind = data.transactions.findIndex(item => item.id == id);

  if (indexFind === -1) {
    res.status(404).json({ message: "ID not found" });
  } else {
    
    // Chỉ cập nhật các thuộc tính transactions_type, amount và note
    data.transactions[indexFind] = {
      ...data.transactions[indexFind],
      transactions_type: newData.transactions_type,
      amount: newData.amount,
      note: newData.note,
      category: newData.category,
      date: data.transactions[indexFind].date,
    };
    res.status(200).json({ message: "Thành công" , data: {transactions: data.transactions}});
  }
});


app.delete("/api/deleteTransactions/:id", (req, res) => {
  const id = req.params.id;
  const indexFinder = data.transactions.findIndex(item => item.id == id);

  if (indexFinder === -1) {
    res.status(404).json({ message: "ID not found" });
  } else {
    // Cập nhật tổng số tiền tiêu trong dữ liệu
    data.total_expenses -= data.transactions[indexFinder].amount;

    data.transactions.splice(indexFinder, 1);
    res.status(200).json({ message: "Thành công" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
