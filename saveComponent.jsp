<%@ page contentType="text/html; charset=utf-8"%>
<%@ page language="java" %>
<%@ page import="java.io.*,java.util.*" %>
<%
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    String clzName = request.getParameter("clzName");
    String data = request.getParameter("data");
    String path = request.getRealPath("wof2.0");

    //todo 生成一个独立的包装类（外观模式）

    //todo 生成扳手类

    //读取js引用文件
    Reader reader = new InputStreamReader(new FileInputStream(path+"/componentList.js"));
    int tempchar;
    StringBuilder sb = new StringBuilder();
    while ((tempchar = reader.read()) != -1) {
        // 对于windows下，\r\n这两个字符在一起时，表示一个换行。
        // 但如果这两个字符分开显示时，会换两次行。
        // 因此，屏蔽掉\r，或者屏蔽\n。否则，将会多出很多空行。
        if(((char) tempchar) != '\r') {
            sb.append((char) tempchar);
        }
    }
    reader.close();
    String jsStr = sb.toString();
    //插入新的js的引用
    String newJs = "\"<script src=\\\\\"src/wof/bizWidget/"+clzName+".js\\\\\"></script><script src=\\\\\"src/wof/bizWidget/spanner/"+clzName+"Spanner.js\\\\\"></script>\"\n//--insertScript";
    jsStr = jsStr.replaceAll("//--insertScript", newJs);
    //生成业务构件列表js
    OutputStreamWriter os1 = new OutputStreamWriter(new FileOutputStream(path+"/componentList.js"), "UTF-8");
    os1.write(jsStr);
    os1.flush();
    os1.close();

    //以追加的方式向生成业务构件记录js插入新的构件类名记录
    OutputStreamWriter os2 = new OutputStreamWriter(new FileOutputStream(path+"/component/component.js",true), "UTF-8");
    os2.write(clzName);
    os2.write("@wof@");
    os2.flush();
    os2.close();

    out.print("保存业务构件成功");


    //为每个业务构件生成独立的json数据文件
    /**
    String jsonPath = path + "/component/"+id+".json";
    OutputStreamWriter os1 = new OutputStreamWriter(new FileOutputStream(jsonPath), "UTF-8");
    os1.write(data);
    os1.flush();
    os1.close();
    */
%>