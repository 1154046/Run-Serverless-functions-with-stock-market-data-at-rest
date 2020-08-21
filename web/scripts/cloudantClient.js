let usernameCloudant = "usernameCloudant";
let passwordCloudant = "passwordCloudant";

const cloudantURL = new URL("https://" + usernameCloudant + ":" + passwordCloudant + "@" + usernameCloudant + ".cloudant.com");

function getAll(fn) {

  fetch(cloudantURL.origin + "/stocks/_all_docs?include_docs=true", {
    method: 'get',
    headers: {
      "Authorization": "Basic " + btoa(usernameCloudant + ":" + passwordCloudant),
      "Accept": "application/json",
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    fn(data)
  })
}

function addStock(stock, fn) {
  let companyDetails;

  fetch("https://cloud.iexapis.com/stable/stock/"+ stock + "/quote?token=USER_TOKEN", { //token generated from iexapis.com
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data)
    companyDetails = data
    fetch(cloudantURL.origin + "/stocks/" + data.symbol, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Authorization": "Basic " + btoa(usernameCloudant + ":" + passwordCloudant),
        "Accept": "application/json",
        "Content-type":"application/json"
      }
    }).then(function (response) {
      // handle cloudant status
      console.log(response.status)
      return response.json();
    }).then(function (data) {
      fn(data,companyDetails)
    }).catch(function (error) {
      console.log(error)
    })
  }).catch(function (error) {
     // console.warn(xhr.responseText)
     console.log(error)
    })
}

function getDataAndNews(stock,fn) {
  fetch(cloudantURL.origin + "/stocks-details/data-and-news", {
    method: 'get',
    headers: {
      "Authorization": "Basic " + btoa(usernameCloudant + ":" + passwordCloudant),
      "Accept": "application/json",
      "Content-type":"application/json"
    }
  }).then(function (response) {
    // handle cloudant status
    console.log(response.status)
    return response.json();
  }).then(function (data) {
    console.log(data);
    fn(data[stock])
  }).catch(function (error) {
    console.log(error)
  })
}

function getNLU(stock,fn) {
  fetch(cloudantURL.origin + "/nlu/_all_docs?include_docs=true", {
    method: 'get',
    headers: {
      "Authorization": "Basic " + btoa(usernameCloudant + ":" + passwordCloudant),
      "Accept": "application/json",
      "Content-type":"application/json"
    }
  }).then(function (response) {
    // handle cloudant status
    console.log(response.status)
    return response.json();
  }).then(function (data) {
    fn(data)
  }).catch(function (error) {
    console.log(error)
  })
}

function getCompanyData(stock,fn) {
  fetch(cloudantURL.origin + "/stocks/" + stock, {
    method: 'get',
    headers: {
      "Authorization": "Basic " + btoa(usernameCloudant + ":" + passwordCloudant),
      "Accept": "application/json",
      "Content-type":"application/json"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    fn(data)
  }).catch(function (error) {
    console.log(error)
  })
}
