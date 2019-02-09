package com.imooc.service;

import com.imooc.pojo.Room;

public interface RoomService {
	//从文件中读取数据并将其插入数据库
	public void ReadAndInsert(String filePath);
	//根据id查询对应的room
	public Room QueryRoomById(String id);
}
