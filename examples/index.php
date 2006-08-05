<?php
/*
  Copyright 2002, 2005 The Apache Software Foundation.
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
       http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

//the client has following lines of js code
/*
var logger = Log4js.getLogger("testlogger");
logger.setLevel(Log4js.Level.ALL);
//logger.addAppender(new ConsoleAppender(logger));
logger.addAppender(new AjaxAppender(logger, "./index.php?action=log"));

logger.info('an info');
logger.warn('a warning');
logger.error('an error');
*/

require_once('Log.php');
$client_logger= &Log::singleton('file','client.log');

if ($_REQUEST['action'] == "log"){
	clientLogger();
}

function clientLogger()	{
	global $client_logger;
	$client_logger->info($_POST);
}
?>