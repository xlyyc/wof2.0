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
    String data = request.getParameter("data");
    String path = request.getRealPath("wof2.0");
    writeFile(path + "/data.json", data, false);
    out.print("保存成功");
%>