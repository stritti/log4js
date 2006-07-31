<%
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

   //Test without log4j just write to System out the logs.
   java.io.BufferedReader reader = request.getReader();
	
   String ln = reader.readLine();
   while(ln != null) {
      System.out.println("log4js: " + ln); 
      ln = reader.readLine();
   }
%>
<log4js><logged /></log4js>
