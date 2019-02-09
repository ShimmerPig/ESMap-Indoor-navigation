package com.imooc.netty;

import java.time.LocalDateTime;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.concurrent.GlobalEventExecutor;

public class ChatHandler 
	extends SimpleChannelInboundHandler<TextWebSocketFrame>{

	private static ChannelGroup clients=
			new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);
	
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {
		String content=msg.text();
		System.out.println("接收到的消息："+content);
		clients.writeAndFlush(
				new TextWebSocketFrame(
						"服务器在"+LocalDateTime.now()
						+"接收到消息，消息为："+content));
	}
	
	@Override
	public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
		clients.add(ctx.channel());
	}
	
	@Override
	public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
		System.out.println("客户端断开，channel对应的长id为："
				+ctx.channel().id().asLongText());
		System.out.println("客户端断开，channel对应的短id为："
				+ctx.channel().id().asShortText());
	}

}
