<%@ page contentType="text/html; charset=utf-8"%>
<%@ page language="java" %>
<%@ page import="java.io.*" %>
<%
    String data = request.getParameter("data");
    String path = request.getRealPath("wof2.0");
    //保存当前编辑的元数据
    String jsonPath = path + "/data.json";
    OutputStreamWriter os = new OutputStreamWriter(new FileOutputStream(jsonPath), "UTF-8");
    os.write(data);
    os.flush();
    os.close();
    out.println("保存成功");
%>