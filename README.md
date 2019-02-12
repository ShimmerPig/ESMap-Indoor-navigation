# ESMap-Indoor-navigation
ESMap+HBuilder+SpringBoot+FastDFS实现导航导购App<br>
<br><br>
## 功能介绍
### 搜索定位
### 扫码定位
### 图像识别店铺商标定位
### 导航
### 导购
<br><br><br>
## 数据库
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/db.png)
<br><br>
## 区域表 <br>
[这里的room表示商店中的一个店铺，或者是超市中的一个区域]
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/db3.png)
<br><br>
## 商品表
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/db2.png)
<br><br>
## 商品类目表
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/db1.png)
<br><br><br><br>
## 后端结构与接口
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/11.png)
### controller包提供如下接口:
#### searchRoom 扫描店铺二维码后传给后端id，后端从数据库中查询对应的店铺，并返回给前端
#### searchProduct 扫描商品二维码后传给后端id，后端从数据库中查询对应的商品，并返回给前端
#### productCategoryList 获取商品类目列表
#### productList 传入商品类目，查询该类目的所有商品
#### productInfo 通过商品的名称查询商品的所有信息 
<br><br><br>
## 测试效果
### 导航模块地图预览[以华发一角为例]
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/1.jpg)
### 导航功能
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/2.jpg)
### 搜索功能
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/3.jpg)
### 扫码定位功能
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/4.jpg)
<br>
### 导购模块地图预览
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/5.jpg)
### 商品搜索功能
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/6.jpg)
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/7.jpg)
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/8.jpg)
### 导购功能
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/9.jpg)
![](https://github.com/ShimmerPig/ESMap-Indoor-navigation/blob/master/image/10.jpg)
<br><br>
### App更多功能仍在完善...


<br><br><br>
