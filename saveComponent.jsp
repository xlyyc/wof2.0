<%@ page contentType="text/html; charset=utf-8"%>
<%@ page language="java" %>
<%@ page import="java.io.*,java.util.*" %>
<%!
    //读取文本文件
    public String readFile(String path) throws FileNotFoundException, IOException{
        Reader reader = new InputStreamReader(new FileInputStream(path),"UTF-8");
        int tempchar;
        StringBuilder sb = new StringBuilder();
        while ((tempchar = reader.read()) != -1) {
            if(((char) tempchar) != '\r') {
                sb.append((char) tempchar);
            }
        }
        reader.close();
        return sb.toString();
    }

    //写入文件
    public void writeFile(String path, String content, boolean type) throws FileNotFoundException, IOException{
        OutputStreamWriter os = new OutputStreamWriter(new FileOutputStream(path, type), "UTF-8");
        os.write(content);
        os.flush();
        os.close();
    }
%>
<%
    String id = request.getParameter("id");
    String name = request.getParameter("name");
    String clzName = request.getParameter("clzName");
    String data = request.getParameter("data");
    String path = request.getRealPath("wof2.0");

    //生成一个独立的包装类（外观模式）
    //读取包装类模板
    String clzStr = readFile(path+"/BizClass.js");
    clzStr = clzStr.replaceAll("\\[BizClass\\]", clzName);
    writeFile(path+"/src/wof/bizWidget/"+clzName+".js", clzStr, false);

    //生成扳手类
    //读取扳手类模板
    String clzSpannerStr = readFile(path+"/BizClassSpanner.js");
    clzSpannerStr = clzSpannerStr.replaceAll("\\[name\\]", name);
    clzSpannerStr = clzSpannerStr.replaceAll("\\[BizClass\\]", clzName);
    writeFile(path+"/src/wof/bizWidget/spanner/"+clzName+"Spanner.js", clzSpannerStr, false);

    //读取js引用文件
    String jsStr = readFile(path+"/componentList.js");
    //插入新的js的引用
    String newJs = "\"<script src=\\\\\"src/wof/bizWidget/"+clzName+".js\\\\\"></script><script src=\\\\\"src/wof/bizWidget/spanner/"+clzName+"Spanner.js\\\\\"></script>\"\n//--insertScript";
    jsStr = jsStr.replaceAll("//--insertScript", newJs);
    //生成业务构件列表js
    writeFile(path+"/componentList.js", jsStr, false);
    //以追加的方式向生成业务构件记录js插入新的构件类名记录
    writeFile(path+"/component/component.js", clzName+"@wof@", true);

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