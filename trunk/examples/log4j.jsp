<%@ page import="org.apache.log4j.Logger" %>
<%
// Log4J
	String category = request.getParameter("log4js.category");
	String message = request.getParameter("log4js.msg");
	String level = request.getParameter("log4js.level");
	String client = request.getParameter("log4js.client");
	
	Logger logger = Logger.getLogger( category);
	String msg = request.getRemoteAddr() + " - " + client + ": " + message;
	System.out.println(msg);
	if("debug".equals(level))
	{
		logger.debug(msg);
	} else {
		logger.error(msg);
	}
	//System.out.println(msg);
%>
<log4js><logged /></log4js>