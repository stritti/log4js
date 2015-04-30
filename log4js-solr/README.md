SOLR LOG RECIEVER
=================

Use schema.xml as base.

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
