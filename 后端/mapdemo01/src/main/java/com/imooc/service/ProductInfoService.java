package com.imooc.service;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.pojo.Room;
import com.imooc.pojo.vo.ProductInfoVO;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

public interface ProductInfoService {
	//从文件中读取数据并将其插入数据库
	public void ReadAndInsert(String filePath);
	//通过商品的类目，查询对应的商品list
	public List<ProductInfoVO>queryProductInfoList(String categoryType);
	//通过商品name，查询对应的商品
	public ProductInfoVO queryProductInfoByName(String productName);
	//通过id查询对应的商品
	public ProductInfoVO queryProductInfoById(String productId);
}
