package com.imooc.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.n3r.idworker.Sid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.imooc.mapper.RoomMapper;
import com.imooc.pojo.Room;
import com.imooc.service.RoomService;
import com.imooc.utils.FastDFSClient;
import com.imooc.utils.FileUtils;
import com.imooc.utils.QRCodeUtils;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class RoomServiceImpl implements RoomService{

	//在本地保存图片的地址
	private String myPath="D:\\Users\\lenovo\\eclipse-workspace\\mapdemo01\\images\\room\\";
	
	@Autowired
	private RoomMapper roomMapper;
	
	//用于生成唯一的id
	@Autowired
	private Sid sid;
	
	//生成二维码的工具类
	@Autowired
	private QRCodeUtils qrCodeUtils;
	
	@Autowired
	private FastDFSClient fastDFSClient;
	
	//分割并插入数据库
	private void SpiltAndInsert(String line) {
		String []arr=line.split(",");
		//生成唯一的id
		String roomId=sid.nextShort();
		Room room=new Room();
		room.setId(roomId);
		//文件中的内容 x,y,fnum,FloorName,name
		room.setX(arr[0]);
		room.setY(arr[1]);
		room.setFnum(Integer.valueOf(arr[2]));
		room.setFloorName(arr[3]);
		room.setName(arr[4]);
		//生成唯一的二维码图片这里是图片的名称
		String qrCodePath=myPath+room.getName()+"qrcode.png";
		//这里设置的是图片扫码后得到的内容
		qrCodeUtils.createQRCode(qrCodePath,"zhuzhu_qrcode:"+room.getId());
		//转成可以上传的文件形式
		MultipartFile qrCodeFile = FileUtils.fileToMultipart(qrCodePath);
		String qrCodeUrl = "";
		try {
			qrCodeUrl = fastDFSClient.uploadQRCode(qrCodeFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
		room.setQrcode(qrCodeUrl);
		roomMapper.insert(room);
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

	@Transactional(propagation = Propagation.SUPPORTS)
	@Override
	public Room QueryRoomById(String id) {
		Example re=new Example(Room.class);
		Criteria rc=re.createCriteria();
		rc.andEqualTo("id",id);
		return roomMapper.selectOneByExample(re);
	}

}
