package com.imooc.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.n3r.idworker.Sid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.imooc.mapper.ProductCategoryMapper;
import com.imooc.pojo.ProductCategory;
import com.imooc.pojo.vo.ProductCategoryVO;
import com.imooc.service.ProductCategoryService;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService{

	@Autowired
	private ProductCategoryMapper pcMapper;
	
	//用于生成唯一的id
	@Autowired
	private Sid sid;
	
	@Transactional(propagation = Propagation.SUPPORTS)
	@Override
	public List<ProductCategoryVO> queryProductCategoryList() {
		List<ProductCategory>pcList=(List<ProductCategory>)pcMapper.selectAll();
		List<ProductCategoryVO>pcVOList=new ArrayList<>();
		for(int i=0;i<pcList.size();i++) {
			ProductCategoryVO pcVO=new ProductCategoryVO();
			BeanUtils.copyProperties(pcList.get(i), pcVO);
			System.out.println("productCategory:"+pcVO.getCategoryName()+"  "+pcVO.getCategoryType());
			pcVOList.add(pcVO);
		}
		return pcVOList;
	}

	//分割并插入数据库
	private void SpiltAndInsert(String line) {
		String []arr=line.split(",");
		//生成唯一的id
		String pcId=sid.nextShort();
		ProductCategory pc=new ProductCategory();
		pc.setCategoryId(pcId);
		//file中的内容 name,type
		pc.setCategoryName(arr[0]);
		pc.setCategoryType(Integer.valueOf(arr[1]));
		pcMapper.insert(pc);
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
			}
			
		}
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void ReadAndInsert(String filePath) {
		ReadTxtFile(filePath);
	}

}
