let btn = document.querySelector(".btn");
let input = document.querySelector("input");
let allData = document.querySelector(".output")
let futureCrypt = document.querySelector("#future");
let loader = document.querySelector(".loading");

let link1 = "https://coinranking.com";
let link2 = "https://www.livecoinwatch.com";

btn.addEventListener("click", async () => {
  let linksArr = input.value.split(" ");
  if (input.value == "" || linksArr.length > 2 || linksArr[0] != link1 || linksArr[1] != link2) {
    alert("Invalid Urls");
    return;
  }
  loader.style.display = "flex"
  allData.innerHTML = ""
  futureCrypt.innerHTML = ""
  let res = await axios.post("/scrap", { link1, link2 });
  console.log(res.data.future);
  console.log(res.data.result);

  for(let i of res.data.result){
    allData.innerHTML +="<br>" +  JSON.stringify(i,undefined,2)
  }
  futureCrypt.innerHTML = JSON.stringify(res.data.future[0],undefined,2)
  loader.style.display = "none"
  // console.log("res0", link1);
  // console.log("res0", link2);
});
