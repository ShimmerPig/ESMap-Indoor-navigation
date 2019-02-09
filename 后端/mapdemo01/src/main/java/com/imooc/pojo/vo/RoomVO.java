package com.imooc.pojo.vo;

import javax.persistence.Column;

public class RoomVO {
	private String id;
    private String x;
    private String y;
    private Integer fnum;
    private String floorName;
    private String name;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getX() {
		return x;
	}
	public void setX(String x) {
		this.x = x;
	}
	public String getY() {
		return y;
	}
	public void setY(String y) {
		this.y = y;
	}
	public Integer getFnum() {
		return fnum;
	}
	public void setFnum(Integer fnum) {
		this.fnum = fnum;
	}
	public String getFloorName() {
		return floorName;
	}
	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
