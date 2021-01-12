let getCss = document.querySelector(".getCss");
let getJs = document.querySelector(".getJs");
let getHtml = document.querySelector(".getHtml");
let getXml = document.querySelector(".getXml");
let getJson = document.querySelector(".getJson");
let pagePre = document.querySelector(".pre");
let pageNext = document.querySelector(".next");
let show = document.querySelector(".show");
let pageShow = document.querySelector('.pageShow')
let n = 1;
let hasPage = false;
function httpLi(page) {
  if (n === 1) {
    pagePre.classList.add("notAllowed");
    if(hasPage){
        alert("已经是第一页");
        hasPage = true
    }
  }else if (n===3){
    pageNext.classList.add("notAllowed");
    if(hasPage){
        alert("别摁了，没有更多了");
    }
  }
  let request = new XMLHttpRequest();
  request.open("GET", `./${page}.json`);

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        pageShow.innerHTML = "";
        let res = JSON.parse(request.response);
        res.data.forEach((value, index) => {
          let li = document.createElement("li");
          li.textContent = value;
          pageShow.appendChild(li);
          hasPage = true
        });
      } else {
        
      }
    }
  };
  request.send();
}
httpLi(n);
pagePre.onclick = () => {
  pageNext.classList.remove("notAllowed");
  let arrClass = Object.values(pagePre.classList);

  // if(arrClass.indexOf('notAllowed')===-1){
  n--;
  // }
  httpLi(n);
};
pageNext.onclick = () => {
  pagePre.classList.remove("notAllowed");
  let arrClass = Object.values(pagePre.classList);
  if (arrClass.indexOf("notAllowed") === -1) {
    n++;
  }
  httpLi(n);
};

getJson.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./data.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        show.innerHTML = "";
        let json = document.createElement("json");
        json.innerText = request.response;
        show.appendChild(json);
        let obj = JSON.parse(request.response);
        console.log(obj);
      }
    }
  };
  request.send();
};

getXml.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./message.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        show.innerHTML = "";
        const xml = document.createElement("xml");
        xml.innerHTML = request.response;
        console.log(document);
        show.appendChild(xml);
        const dom = request.responseXML;
        const node = dom.querySelector("message");
        console.dir(node);
      } else {
        console.log("requset错误内容为", request.response);
      }
    }
  };
  request.send();
};

getHtml.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./3.html");
  request.onload = () => {
    show.innerHTML = "";
    const html = document.createElement("html");
    html.innerHTML = request.response;
    show.appendChild(html);
  };
  request.onerror = () => {
    console.log("requset错误内容为", request.response);
  };
  request.send();
};

getJs.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./2.js");
  request.onload = () => {
    console.log("request.response", request.response);
    const script = document.createElement("script");
    // 创建script标签
    script.innerHTML = request.response;
    // 填写script内容
    document.head.appendChild(script);
  };
  request.onerror = () => {
    console.log("请求错误");
  };
  request.send();
};

getCss.onclick = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./style.css");
  //   初始化请求
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      // 准备状态4则为流程结束
      if (request.status >= 200 && request.status < 300) {
        // 状态码介于200和300之间则为请求成功
        console.log("request.response", request.response);
        const style = document.createElement("style");
        // 创建style标签
        style.innerHTML = request.response;
        // 填写style内容
        document.head.appendChild(style);
      } else {
        //  状态码之外的则为失败
        console.log("加载错误");
      }
    }
  };
  request.send();
  //   发送请求
};
