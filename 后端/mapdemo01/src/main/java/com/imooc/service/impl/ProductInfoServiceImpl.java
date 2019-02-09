package com.imooc.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.n3r.idworker.Sid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.imooc.mapper.ProductInfoMapper;
import com.imooc.pojo.ProductInfo;
import com.imooc.pojo.vo.ProductInfoVO;
import com.imooc.service.ProductInfoService;
import com.imooc.utils.FastDFSClient;
import com.imooc.utils.FileUtils;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class ProductInfoServiceImpl implements ProductInfoService{
	//在本地保存product图片的地址
	private String myPath="D:\\Users\\lenovo\\eclipse-workspace\\mapdemo01\\images\\product\\";
	
	@Autowired
	private ProductInfoMapper pMapper;
	
	//用于生成唯一的id
	@Autowired
	private Sid sid;
	
	@Autowired
	private FastDFSClient fastDFSClient;
	
	@Transactional(propagation = Propagation.SUPPORTS)
	@Override
	public List<ProductInfoVO> queryProductInfoList(String categoryType) {
		Example pExample=new Example(ProductInfo.class);
		Criteria pCriteria=pExample.createCriteria();
		pCriteria.andEqualTo("categoryType",categoryType);
		List<ProductInfo>pList=pMapper.selectByExample(pExample);
		List<ProductInfoVO>pVOList=new ArrayList<>();
		for(int i=0;i<pList.size();i++) {
			ProductInfoVO pVO=new ProductInfoVO();
			BeanUtils.copyProperties(pList.get(i), pVO);
			pVOList.add(pVO);
		}
		return pVOList;
	}
	
	//分割并插入数据库
	private void SpiltAndInsert(String line) throws Exception {
		String []arr=line.split(",");
		//生成唯一的id
		String piId=sid.nextShort();
		ProductInfo pi=new ProductInfo();
		pi.setProductId(piId);
		//文件内容x,y,fnum,name,price,type
		//使用的时候统一使用小图
		pi.setProductX(arr[0]);
		pi.setProductY(arr[1]);
		pi.setProductFnum(Integer.valueOf(arr[2]));
		pi.setProductName(arr[3]);
		BigDecimal bd=new BigDecimal(arr[4]);
		pi.setProductPrice(bd);
		//product的icon的名字,这里按照商品的name对图片进行命名
		String iconPath=myPath+pi.getProductName()+".png";
		//对文件进行转换
		MultipartFile iconFile=FileUtils.fileToMultipart(iconPath);
		String iconUrl=fastDFSClient.uploadBase64(iconFile);
		System.out.println(iconUrl);
		
		//获取缩略图的url
		String thump="_80x80.";
		String arr1[]=iconUrl.split("\\.");
		String thumpImgUrl=arr1[0]+thump+arr1[1];
		
		pi.setProductIconBig(iconUrl);
		pi.setProductIcon(thumpImgUrl);
		pi.setCategoryType(Integer.valueOf(arr[5]));
		
		pMapper.insert(pi);
	}
	
	//按行读取文件中的内容
	private void ReadTxtFile(String filePath) {
		String path=filePath;
		File file=new File(path);
		if(file.isDirectory()) {
			System.out.println("TestFile:The File doesn't not exist.");
		}else {
			try {
				InputStream instream  = new FileInputStream(file);
				if(instream!=null) {
					InputStreamReader inputreader =new InputStreamReader(instream,"gbk");
					BufferedReader buffreader=new BufferedReader(inputreader);
					String line;
					while((line=buffreader.readLine())!=null) {
						//读取一行数据，进行分割并插入数据库
						SpiltAndInsert(line);
						System.out.println("line:"+line);
					}
					instream.close();
				}
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
	}

	@Override
	public void ReadAndInsert(String filePath) {
		ReadTxtFile(filePath);
	}
	
}
