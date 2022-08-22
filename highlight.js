fetch(chrome.runtime.getURL('/popup.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforebegin', html);
  // not using innerHTML as it would break js event listeners of the page
});
const api_url = "https://helloacm.com/api/pinyin/?cached&s=";
const cors_anywhere = "https://salty-shore-25326.herokuapp.com/";


function debounce(fn, delay) {
  let timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

function doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_anywhere + options.url);
  x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  x.setRequestHeader('Access-Control-Allow-Origin','*');
  x.onload = function() {
    var jsonResponse = x.response;
  };
  x.send(options.data);
  x.onreadystatechange = function(){
    if (x.responseText != ""){
      var data = x.responseText
      var jsonData = JSON.parse(data);
      var pinyinstr = "";
      for(var key in jsonData) {
        for (var key1 in jsonData[key]) {
          let temp = jsonData[key][key1];
          temp = temp.replace("v", "ü");
          // for characters w multiple possible pinyin, pick the first one
          let index = temp.search(/\d/);
          console.log("index: " + index);
          temp = temp.substring(0, index+1); 
          console.log("temp: " + temp);

          // replace numbers with accent marks
          if (temp.includes("1")){
            if (temp.includes("a")){
              temp = temp.replace("a", "ā");
            }
            else if (temp.includes("e")){
              temp = temp.replace("e", "ē");
            }
            else if (temp.includes("o")){
              temp = temp.replace("o", "ō");
            }
            else if (temp.includes("i")){
              temp = temp.replace("i", "ī");
            }
            else if (temp.includes("u")){
              temp = temp.replace("u", "ū");
            }
            else if (temp.includes("ü")){
              temp = temp.replace("ü", "ǖ")
            }
          }
          else if (temp.includes("2")){
            if (temp.includes("a")){
              temp = temp.replace("a", "á");
            }
            else if (temp.includes("e")){
              temp = temp.replace("e", "é");
            }
            else if (temp.includes("o")){
              temp = temp.replace("o", "ó");
            }
            else if (temp.includes("i")){
              temp = temp.replace("i", "í");
            }
            else if (temp.includes("u")){
              temp = temp.replace("u", "ú");
            }
            else if (temp.includes("ü")){
              temp = temp.replace("ü", "ǘ")
            }
          }
          else if (temp.includes("3")){
            if (temp.includes("a")){
              temp = temp.replace("a", "ǎ");
            }
            else if (temp.includes("e")){
              temp = temp.replace("e", "ě");
            }
            else if (temp.includes("o")){
              temp = temp.replace("o", "ǒ");
            }
            else if (temp.includes("i")){
              temp = temp.replace("i", "ǐ");
            }
            else if (temp.includes("ü")){
              temp = temp.replace("ü", "ǚ")
            }
            else if (temp.includes("u")){
              temp = temp.replace("u", "ǔ");
            }

          }
          else if (temp.includes("4")){
            if (temp.includes("a")){
              temp = temp.replace("a", "à");
            }
            else if (temp.includes("e")){
              temp = temp.replace("e", "è");
            }
            else if (temp.includes("o")){
              temp = temp.replace("o", "ò");
            }
            else if (temp.includes("i")){
              temp = temp.replace("i", "ì");
            }
            else if (temp.includes("ü")){
              temp = temp.replace("ü", "ǜ")
            }
            else if (temp.includes("u")){
              temp = temp.replace("u", "ù");
            }

          }
          
          temp = temp.replace(/[0-9]/g, '');

          pinyinstr += temp + " ";

          console.log("pinyin:" + pinyinstr);
        }
      }
      pinyinstr.replaceAll(",", " ");
      let popup = document.getElementById("popup");
      let popuptext = document.getElementById("popuptext");
      popup.style.visibility = "visible";
      popuptext.innerHTML = pinyinstr;
    }
    
   

    // open popup
    
  }
};

document.addEventListener("selectionchange", debounce(function (event) {  

    let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();  
    let regExp = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;
    let found = regExp.test(selection);
    
    if (selection ===""){
      console.log("EMPTY");
      let popup = document.getElementById("popup");
      let popuptext = document.getElementById("popuptext");
      popup.style.visibility="hidden";
      popuptext.innerHTML="";
    }
    if (found && selection != ""){
      
    
      selection.replace("\uFF0C", "\u00bf");
      selection.replace("\u002c", "\u00bf");
      let url = cors_anywhere + api_url+ selection + "&t=1";
      
      
      doCORSRequest({
        method: 'GET',
        url: url
      });
      
    }
      
  }, 300))
