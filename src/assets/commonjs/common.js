///time  2020-07-06 13:15:20
///author jason
///时间转换
export function formatDate(source, format) {
  source = new Date(source);
  const o = {
    "M+": source.getMonth() + 1, // 月份
    "d+": source.getDate(), // 日
    "H+": source.getHours(), // 小时
    "m+": source.getMinutes(), // 分
    "s+": source.getSeconds(), // 秒
    "q+": Math.floor((source.getMonth() + 3) / 3), // 季度
    "f+": source.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (source.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}
//排序算法
export function bubbleSort(arr) {
  if (Array.isArray(arr)) {
    for (var i = arr.length - 1; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}
//累加算法
export function sum(arr) {
  var len = arr.length;
  if (len == 0) {
    return 0;
  } else if (len == 1) {
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}
//输入防止xss注入
export function unescapeHTML(a) {
  a = "" + a;
  return a
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}
//将<>转成实体
export function escapeHTML(a) {
  a = "" + a;
  return a
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
//随机转换颜色
export function randomColor() {
  return (
    "rgb(" +
    Math.randomNumber(255) +
    "," +
    Math.randomNumber(255) +
    "," +
    Math.randomNumber(255) +
    ")"
  );
}
//去掉空格字符串 1,所有空格 2，前后空格  3，前空格  4，后空格
export function removespace(str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}
//字符串替换  parmas：str 字符串   replacestr 要替换的字符  replacetext 替换成什么
export function replaceaAll(str, replacrstr, replacetext) {
  let raRegExp = new RegExp(replacrstr, "g");
  return str.replace(raRegExp, replacetext);
}
//查找某个字符出现的次数  str 字符串 strSplit 要查找的字符或字符串
export function conuntStr(str, strSplit) {
  return str.split(strSplit).length - 1;
}
//cookie 设置   parmas name cookie键   value cookie值  setdate设置时间
export function setCookie(name, value, setdate) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + setdate);
  document.cookie = name + "=" + value + ";expires=" + oDate;
}
//获取cookie  获取cookie parmas name cookie键值对
export function getCookie(name) {
  var arr = document.cookie.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return "";
}
//删除cookie
export function removeCookie(name) {
  return setCookie(name, 1, -1);
}
//通用打印
export function print() {
  return window.print();
}
//二分法查找算法
export function getIndex(arr, key) {
  var len = arr.length,
    start = 0,
    end = len - 1,
    middle,
    middle_val;
  while (start <= end) {
    middle = parseInt((start + end) / 2);

    middle_val = arr[middle];

    if (middle_val == key) {
      return middle;
    } else if (middle_val > key) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return -1;
}
//二分法排序算法
export function quick_sort(source_arr, left, right) {
  if (left < right) {
    var key = source_arr[left],
      start = left,
      end = right;
    while (start < end) {
      while (start < end && source_arr[end] > key) {
        end--;
      }
      source_arr[start] = source_arr[end];
      while (start < end && source_arr[start] < key) {
        start++;
      }
      source_arr[end] = source_arr[start];
    }
    source_arr[start] = key;
    quick_sort(source_arr, left, start - 1);
    quick_sort(source_arr, start + 1, right);
  }
}
