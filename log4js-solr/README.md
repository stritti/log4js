SOLR LOG RECIEVER
=================

As an exmple, I use latest solr, which is version 5.

Configure server
----------------

Use schema.xml as base. There is no required id field in schema, so you may omit setting this strange value for log
messages.

You can send arbitrary fields with with underscored suffixes like "collected_money_i" - where _i denotes integer type.
You might be interested in _t (text), _s (string), _b (boolean), _f (float), _dt (date/time). Use final 's' to mark
multivalued field. See schema.xml for details about other types. Feel free to change core schema !

Check your jetty version in $SOLR_HOME/server/lib/ directory and download corresponding jetty-servlets.jar from
http://central.maven.org/maven2/org/eclipse/jetty/jetty-servlets/

Patch your $SOLR_HOME/server/webapps/solr.war/WEB-INF/web.xml (this might require you unzip solr.war) with CORS filter:

```xml
<filter>
  <filter-name>cross-origin</filter-name>
  <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
  <init-param>
    <param-name>chainPreflight</param-name>
    <param-value>false</param-value>
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

Sample message:

```json
{
	"Log4js": [
		{
			"LoggingEvent":
			{
				"logger": "sample",
				"level": "INFO",
				"message": "this is a message from me",
				"referer": "http://true-generals.wg"
			}
		}
	]
}
```

Known Issues
------------

1. Anybody can screw up your logs, because update is available to anybody. Should be fixed with Jetty filters.
2. Exceptions parameter handling.