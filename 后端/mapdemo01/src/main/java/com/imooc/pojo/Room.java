package com.imooc.pojo;

import javax.persistence.*;

public class Room {
    @Id
    private String id;

    private String x;

    private String y;

    private Integer fnum;

    @Column(name = "floor_name")
    private String floorName;

    private String name;

    private String qrcode;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return x
     */
    public String getX() {
        return x;
    }

    /**
     * @param x
     */
    public void setX(String x) {
        this.x = x;
    }

    /**
     * @return y
     */
    public String getY() {
        return y;
    }

    /**
     * @param y
     */
    public void setY(String y) {
        this.y = y;
    }

    /**
     * @return fnum
     */
    public Integer getFnum() {
        return fnum;
    }

    /**
     * @param fnum
     */
    public void setFnum(Integer fnum) {
        this.fnum = fnum;
    }

    /**
     * @return floor_name
     */
    public String getFloorName() {
        return floorName;
    }

    /**
     * @param floorName
     */
    public void setFloorName(String floorName) {
        this.floorName = floorName;
    }

    /**
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return qrcode
     */
    public String getQrcode() {
        return qrcode;
    }

    /**
     * @param qrcode
     */
    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }
}