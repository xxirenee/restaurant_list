# 我的餐廳清單
![This is an image](https://github.com/xxirenee/restaurant_list/blob/main/public/image/Cover4.PNG)

## 介紹
提供簡易的口袋餐廳清單，可以瀏覽餐廳列表、查詢餐廳和詳細資訊，也可以新增、編輯和修改喜愛的餐廳。

## 功能
- 列出所有餐廳
- 點擊查看餐廳詳細資料
- 以餐廳名稱搜尋
- 以餐廳類別搜尋
- 連結餐廳地址至Google地圖
- 使用者可以新增、修改、刪除餐廳
- 餐廳搜尋結果可依名字、類型、地區等排序顯示
- 可以自行註冊(Email 或 facebook)，創建清單

## 開始使用
1.請先安裝 node.js 與 npm

2.將專案 clone 到本地
```
https://github.com/xxirenee/restaurant_list.git
```

3.在本地開啟之後，透過終端機進入資料夾
```
cd restaurant_list
```

4.安裝nodemon

```
npm install -g nodemon
```

5.安裝完畢後，輸入：

```
npm run seed
npm run start
```

6.若能看見以下訊息代表運行成功，可用瀏覽器進入到以下網址:

```
Express is listening on localhost:3000
```

7.結束運行請輸入:

```
ctrl + c
```

## 開發工具
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 8.2.0
- Express 4.16.4
- Express-Handlebars 4.0.2
- express-session: 1.17.1
- MongoDB
- mongoose 6.0.5
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0
