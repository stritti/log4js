
<%
	//Test without log4j just write to System out the logs.
	
	java.io.BufferedReader reader = request.getReader();
	
	String ln = reader.readLine();
    while(ln != null) {
   	System.out.println("> " + ln); 
   	ln = reader.readLine();
    }
	
%>
<log4js><logged /></log4js>