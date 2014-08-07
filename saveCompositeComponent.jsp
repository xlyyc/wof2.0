<%@ page contentType="text/html; charset=utf-8"%>
<%@ page language="java" %>
<%@ page import="java.io.*" %>
<%
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    String data = request.getParameter("data");
    String path = request.getRealPath("wof2.0");
    //为每个复合构件生成独立的json数据文件
    String jsonPath = path + "/compositeComponent/"+id+".json";
    OutputStreamWriter os1 = new OutputStreamWriter(new FileOutputStream(jsonPath), "UTF-8");
    os1.write(data);
    os1.flush();
    os1.close();
    //追加的方式生成复合构件列表js
    String compositeComponentPath = path + "/compositeComponent/compositeComponent.js";
    OutputStreamWriter os2 = new OutputStreamWriter(new FileOutputStream(compositeComponentPath,true), "UTF-8");
    os2.write(id);
    os2.write("@wof@");
    os2.write(name);
    os2.write("@wof@");
    os2.flush();
    os2.close();
    out.println("保存复合构件成功");
%>