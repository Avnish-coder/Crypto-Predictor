const { requestUrls } = require("./crypto");
const fs = require("fs");
const { db } = require("../model/connect.js");
const mysql = require("mysql");
let future = {};
function getHome(req, res) {
  res.sendFile("index.html");
}

function listeningLog(req, res) {
  console.log("server is running");
}

async function postLinks(req, res) {
  if (
    fs.existsSync("./json/futureCrypto.json") &&
    fs.existsSync("./json/lcwCrypto 2.json")
  ) {
    fs.unlinkSync("./json/futureCrypto.json");
    fs.unlinkSync("./json/lcwCrypto 2.json");
  }

  await requestUrls(req.body.link1, req.body.link2);
  futureCryptoInsert();
  InsertAllData(req,res);
  
  // console.log(obj);
  // console.log(future);

  // res.json({
  //   "obj": obj,
  //   "future": future
  // })

}

function ErrorHandling(req, res) {
  res.json({
    message: "Invalid request",
  });
}

function futureCryptoInsert() {
  let fCrypto = JSON.parse(
    fs.readFileSync("./json/futureCrypto.json", "utf-8")
  );
  let name = fCrypto.name;
  let price = fCrypto.price;
  let marketCap = fCrypto.marketCap;
  let volume = fCrypto.volume;
  let YearPer = fCrypto.YearPer;
  let totalCap =
    fCrypto.totalCap == "undefined" ? "undefined" : fCrypto.totalCap;
  let allTimeHigh4 =
    fCrypto.allTimeHigh4 == "undefined" ? "undefined" : fCrypto.allTimeHigh4;
  let range24 = fCrypto.range24 == "undefined" ? "undefined" : fCrypto.range24;
  let low24 = fCrypto.low24 == "undefined" ? "undefined" : fCrypto.low24;
  let high24 = fCrypto.high24 == "undefined" ? "undefined" : fCrypto.high24;



  db.getConnection(async (err, connection) => {
    const delete_query = `DELETE FROM futureCurr`
    await connection.query(delete_query);

    if (err) {
      console.log(err);
    } else {
      const sql_insert_query =
        "INSERT INTO futureCurr(name, price, marketCap, volume, totalCap, allTimeHigh4, range24, low24, high24, YearPer) VALUES (?,?,?,?,?,?,?,?,?,?)";
      const sqlInsert = mysql.format(sql_insert_query, [
        name,
        price,
        marketCap,
        volume,
        totalCap,
        allTimeHigh4,
        range24,
        low24,
        high24,
        YearPer,
      ]);
      await connection.query(sqlInsert, async (err, result) => {
        if (err) throw err;
        console.log("3");

        let ans = await fetchDataForFuture()
        return ans;
      });


      // setTimeout(fetchDataForFuture,10000,req,res) 

    }
  });
}

function InsertAllData(req,res) {
  let fCrypto = JSON.parse(fs.readFileSync("./json/lcwCrypto 2.json", "utf-8"));
  console.log("insertData");
  db.getConnection(async (err, connection) => {

    const delete_query = `DELETE FROM allData`
    console.log("log 1");
    await connection.query(delete_query);

    for (let i = 0; i < fCrypto.length; i++) {
      // console.log(i);
      let name = fCrypto[i].name;
      let price = fCrypto[i].price;
      let marketCap = fCrypto[i].marketCap;
      let volume = fCrypto[i].volume;
      let YearPer = fCrypto[i].YearPer;
      let totalCap = fCrypto[i].totalCap
      let allTimeHigh4 = fCrypto[i].allTimeHigh4
      let range24 = fCrypto[i].range24
      let low24 = fCrypto[i].low24
      let high24 = fCrypto[i].high24
      if (err) {
        console.log(err);
      } else {

        const sql_insert_query =
          "INSERT INTO `allData`(`id`, `name`, `price`, `marketCap`, `volume`, `totalCap`, `allTimeHigh4`, `range24`, `low24`, `high24`, `YearPer`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        const sqlInsert = mysql.format(sql_insert_query, [
          i,
          name,
          price,
          marketCap,
          volume,
          totalCap,
          allTimeHigh4,
          range24,
          low24,
          high24,
          YearPer,
        ]);
        await connection.query(sqlInsert,async (err, result) => {
          if (err) throw err;
          // console.log("result", result);
          // console.log("log 2");

          if (i == fCrypto.length - 1) {
            
            let ans = await FetchAllData(req,res)
            return ans;
          }
        });
      }
    }

  })

}

function fetchDataForFuture() {
  
    console.log("4");
    const select_query = `SELECT * FROM futureCurr`
    db.query(select_query, (err, result) => {
      console.log("futureCurr----", result)//to see if query works right
      future = result
    })
  
}

function FetchAllData(req,res) {
  
    console.log("2");
    const select_query = `SELECT * FROM allData`
    db.query(select_query, (err, result) => {
      console.log("all data ---", result)//to see if query works right
      // obj =  result
      res.json({
        result,
        future
      })

    })
  

}

module.exports = {
  getHome,
  listeningLog,
  ErrorHandling,
  postLinks,
};
