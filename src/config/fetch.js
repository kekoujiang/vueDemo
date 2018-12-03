import { baseUrl } from './env'
import md5 from 'js-md5';
import querystring from 'querystring';
import { Loading } from 'element-ui';

export default async({url = '', data = {},secretKey="", type = 'GET', method = 'fetch' , dataType = true}) => {
  let loadingInstance = Loading.service({ fullscreen: true ,target:document.querySelector("#app")});
	type = type.toUpperCase();
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
  const timestamp = (new Date()).getTime();
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
        token: md5("/power/webapi" + url + timestamp + "escst"),
        timestamp: timestamp,
        secretKey:secretKey|| ""
			},
			mode: "cors",
			cache: "force-cache"
		}
		if(!dataType){
      requestConfig.headers['Content-Type']='application/json';
      data=JSON.stringify(data);
    }else {
      requestConfig.headers['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
      if(dataType!=="formdata"){
        data=querystring.stringify(data);
      }
    }
    console.log(data)
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: data
			})
		}

		try {
			const response = await fetch("http://47.96.69.209:5100/power/webapi"+url, requestConfig);
			const responseJson = await response.json();
      loadingInstance.close();
			return responseJson
		} catch (error) {
      loadingInstance.close();
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
          loadingInstance.close();
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
