package com.imooc.netty;
import org.springframework.stereotype.Component;


import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

@Component
public class WSServer {
	
	private static class SingletionWSServer{
		static final WSServer instance=new WSServer();
	}
	
	public static WSServer getInstance() {
		return SingletionWSServer.instance;
	}
	
	private EventLoopGroup mainGruop;
	private EventLoopGroup subGruop;
	private ServerBootstrap server;
	private ChannelFuture future;
	
	public WSServer() {
		mainGruop=new NioEventLoopGroup();
		subGruop=new NioEventLoopGroup();
		server=new ServerBootstrap();
		server.group(mainGruop,subGruop)
			.channel(NioServerSocketChannel.class)
			.childHandler(new WSServerInitializer());
	}
	
	public void start() {
		this.future=server.bind(8088);
		System.err.println("netty websocket server 启动完毕...");
	}
	
}
