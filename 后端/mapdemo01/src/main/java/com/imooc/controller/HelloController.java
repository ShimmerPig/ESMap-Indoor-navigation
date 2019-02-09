package com.imooc.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PlaceholderConfigurerSupport;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imooc.mapper.ProductCategoryMapper;
import com.imooc.pojo.ProductCategory;
import com.imooc.pojo.Room;
import com.imooc.pojo.vo.ProductCategoryVO;
import com.imooc.pojo.vo.ProductInfoVO;
import com.imooc.pojo.vo.RoomVO;
import com.imooc.service.ProductCategoryService;
import com.imooc.service.ProductInfoService;
import com.imooc.service.RoomService;
import com.imooc.utils.IMoocJSONResult;

@RestController
@RequestMapping("u")
public class HelloController {
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private ProductCategoryService pcService;
	
	@Autowired
	private ProductInfoService pService;
	
	//保存房间数据的接口
	//仅供开发者使用
	@GetMapping("/roomSave")
	public String roomSave() {
		roomService.ReadAndInsert("D:\\Users\\lenovo\\eclipse-workspace\\mapdemo01\\file\\room.txt");
		return "roomSave";
	}
	
	//保存商品类目的接口
	//仅供开发者使用
	@GetMapping("/pcSave")
	public String pcSave() {
		pcService.ReadAndInsert("D:\\Users\\lenovo\\eclipse-workspace\\mapdemo01\\file\\pc.txt");
		return "pcSave";
	}
	
	//保存商品的接口
	//仅供开发者使用
	@GetMapping("/piSave")
	public String piSave() {
		pService.ReadAndInsert("D:\\Users\\lenovo\\eclipse-workspace\\mapdemo01\\file\\pi.txt");
		return "piSave";
	}
	
	//扫描二维码后传给后端id，后端从数据库中查询对应的房间，并返回给前端
	@PostMapping("/searchRoom")
	public IMoocJSONResult searchRoom(String roomId) throws Exception {
		//判断roomId不为空
		if(StringUtils.isBlank(roomId)) {
			return IMoocJSONResult.errorMsg("");
		}
		//查询
		Room room=roomService.QueryRoomById(roomId);
		RoomVO roomVO=new RoomVO();
		BeanUtils.copyProperties(room, roomVO);
		//将查询到的roomVO对象返回给前端
		return IMoocJSONResult.ok(roomVO);
	}
	
	//获取商品列表
	@PostMapping("/productCategoryList")
	public IMoocJSONResult productCategoryList() {
		//数据库查询商品类目list
		List<ProductCategoryVO>pcVOList=pcService.queryProductCategoryList();
		return IMoocJSONResult.ok(pcVOList);
	}
	
	//传入商品类目，查询该类目的所有商品
	@PostMapping("/productList")
	public IMoocJSONResult productList(String categoryType) {
		System.out.println("前端请求的商品类目："+categoryType);
		List<ProductInfoVO>pVOList=pService.queryProductInfoList(categoryType);
		System.out.println("该类目对应的商品:");
		for(int i=0;i<pVOList.size();i++) {
			System.out.println(pVOList.get(i).getProductName());
		}
		return IMoocJSONResult.ok(pVOList);
	}
}
