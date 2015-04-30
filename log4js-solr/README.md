SOLR LOG RECIEVER
=================

As an exmple, I use latest solr, which is version 5.

Use schema.xml as base.

Patch your $SOLR_HOME/server/webapps/solr.war with CORS filter:

```xml
<filter>
	<filter-name>cross-origin</filter-name>
	<filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
	<init-param>
		<param-name>allowedMethods</param-name>
		<param-value>POST</param-value>
	</init-param>
</filter>

<filter-mapping>
  <filter-name>cross-origin</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

This will allow your javascript clients to POST their messages without violating browsers' rules. More configuration
options: http://www.eclipse.org/jetty/documentation/current/cross-origin-filter.html

Javascript logging
------------------

Use

```
http://HOST:PORT/solr/COLLECTION_NAME/update/json/docs?split=/Log4js&f=/Log4js/LoggingEvent/*
```

to post your log messages. Use JSON Appender.

Known Issues
------------

1. Anybody can screw up your logs, because update is available to anybody. Should be fixed with Jetty filters.
2. No id field for log events. Maybe solr can be configured to autogenerate these ids.
3. Solr does not send Cross Origin Headers. Should be fixed with Jetty configuration.
