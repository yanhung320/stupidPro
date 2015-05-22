angular.module('tmAPP', [])
  .controller('tmCtrl', function($scope, $http) {
    
	// start of my add

	$scope.newItem =[]
	
	// end of my add
	
	var postdata = function(data){
		$http.post('http://140.118.20.158:90/hello_py',{cmd: data})
		//$http.post('http://127.0.0.1:90/hello_py',{cmd: data})
		.success(function(data){
			console.log("post ok")
        })
		.error(function() {
			console.log("post wrong")
		})
	}

/******************************************************************/
/***********************   Qos block   ****************************/
/******************************************************************/
	//Qos view variable
	$scope.Qosdpid = '000000089be8d3c3'
	$scope.QosNwDst = '10.0.0.1'
	$scope.QosTpDst = '5002'
	$scope.QosPortName = 'vnet0'
	$scope.QosQueue = '1'
	$scope.QosId = '1'
	$scope.QosMaxRateSelected = '800000'
	$scope.QosMaxRateOptions = ['100000', '500000', '800000']
	$scope.QosMinRateSelected = '100000'
	$scope.QosMinRateOptions = ['100000', '500000', '800000']
	//Qos command string
	// $scope.QosSwitchStr = "/sbin/curl -X PUT -d '\"tcp:127.0.0.1:6632\"' http://localhost:5500/v1.0/conf/switches/"+$scope.Qosdpid+"/ovsdb_addr"
	// $scope.QosQueueStr  = "/sbin/curl -X POST -d '{\"port_name\": \""+$scope.QosPortName+"\", \"type\": \"linux-htb\", \"max_rate\": \"1000000\", \"queues\": [{\"max_rate\": \""+$scope.QosMaxRateSelected+"\"}, {\"\min_rate\": \""+$scope.QosMinRateSelected+"\"}]}' http://localhost:5500/qos/queue/"+$scope.Qosdpid
	// $scope.QosRuleStr   = "/sbin/curl -X POST -d '{\"match\": {\"nw_dst\":\""+$scope.QosNwDst+ ", \"nw_proto\": \"UDP\", \"tp_dst\": \""+$scope.QosTpDst+"\"}, \"actions\":{\"queue\": \""+$scope.QosQueue+"\"}}' http://localhost:5500/qos/rules/"+$scope.Qosdpid
	// $scope.QosGetQueueStr = "/sbin/curl -X GET http://localhost:5500/qos/queue/"+$scope.Qosdpid
	// $scope.QosGetRulesStr = "/sbin/curl -X GET http://localhost:5500/qos/rules/"+$scope.Qosdpid
	// $scope.QosDelQueueStr = "/sbin/curl -X DELETE http://localhost:5500/qos/queue/"+$scope.Qosdpid
	// $scope.QosDelRulesStr = "/sbin/curl -X DELETE -d '{\"qos_id\":\""+$scope.QosId+"\"}' http://localhost:5500/qos/rules/"+$scope.Qosdpid
	//Qos function structure
	$scope.QosSetFuncs = [
		{name:"SetQosSwitch",	method:"SetQosSwitch()"},
		{name:"SetQosQueue",	method:"SetQosQueue()"},
		{name:"SetQosRule",		method:"SetQosRule()"}
	]
	$scope.QosGetFuncs = [	
		{name:"GetQosQueue",	method:"GetQosQueue()" ,herf :"get_qos_queue_data"},
		{name:"GetQosRule",		method:"GetQosRule()"  ,herf :"get_qos_rules_data"}
	]
	$scope.QosDelFuncs = [	
		{name:"DelQosQueue",	method:"DelQosQueue()"},
		{name:"DelQosRule",		method:"DelQosRule()"},
	]	
	// Qos Function
    $scope.QostriggerMethod = function(method) {
      if (method === "SetQosSwitch()") {
		$scope.QosSwitchStr = "/sbin/curl -X PUT -d '\"tcp:127.0.0.1:6632\"' http://localhost:5500/v1.0/conf/switches/"+$scope.Qosdpid+"/ovsdb_addr"
        postdata($scope.QosSwitchStr)
		console.log($scope.QosSwitchStr)
      } else if (method === "SetQosQueue()") {
		$scope.QosQueueStr  = "/sbin/curl -X POST -d '{\"port_name\": \""+$scope.QosPortName+"\", \"type\": \"linux-htb\", \"max_rate\": \"1000000\", \"queues\": [{\"max_rate\": \""+$scope.QosMaxRateSelected+"\"}, {\"\min_rate\": \""+$scope.QosMinRateSelected+"\"}]}' http://localhost:5500/qos/queue/"+$scope.Qosdpid
        postdata($scope.QosQueueStr)
		console.log($scope.QosQueueStr)
      }else if (method === "SetQosRule()") {
		$scope.QosRuleStr   = "/sbin/curl -X POST -d '{\"match\": {\"nw_dst\":\""+$scope.QosNwDst+ "\", \"nw_proto\": \"UDP\", \"tp_dst\": \""+$scope.QosTpDst+"\"}, \"actions\":{\"queue\": \""+$scope.QosQueue+"\"}}' http://localhost:5500/qos/rules/"+$scope.Qosdpid
        postdata($scope.QosRuleStr)
		console.log($scope.QosRuleStr)
      }else if (method === "GetQosQueue()") {
		$scope.QosGetQueueStr = "/sbin/curl -X GET http://localhost:5500/qos/queue/"+$scope.Qosdpid +" > /share/Public/queue.txt"
        postdata($scope.QosGetQueueStr)
		console.log($scope.QosGetQueueStr)
      }else if (method === "GetQosRule()") {
		$scope.QosGetRulesStr = "/sbin/curl -X GET http://localhost:5500/qos/rules/"+$scope.Qosdpid+" > /share/Public/rules.txt"
        postdata($scope.QosGetRulesStr)
		console.log($scope.QosGetRulesStr)
      }else if (method === "DelQosQueue()") {
		$scope.QosDelQueueStr = "/sbin/curl -X DELETE http://localhost:5500/qos/queue/"+$scope.Qosdpid
        postdata($scope.QosDelQueueStr)
		console.log($scope.QosDelQueueStr)
      }else if (method === "DelQosRule()") {
		$scope.QosDelRulesStr = "/sbin/curl -X DELETE -d '{\"qos_id\":\""+$scope.QosId+"\"}' http://localhost:5500/qos/rules/"+$scope.Qosdpid
        postdata($scope.QosDelRulesStr)
		console.log($scope.QosDelRulesStr)
      }
    }
	
/******************************************************************/
/***********************End of Qos block   ************************/
/******************************************************************/


/******************************************************************/
/***********************  Firewall block   ************************/
/******************************************************************/

	//Firewall view variable
	$scope.Firewalldpid = '000000089be8d3c3'
	$scope.FirewallNwSrc = '192.168.10.0'
	$scope.FirewallNwDst = '192.168.10.0'
	$scope.FirewallPriority=''
	$scope.FirewallProtocolList = [
		{id:"TCP" ,model:false},
		{id:"UDP" ,model:false},
		{id:"ICMP" ,model:false}
	]	
	$scope.FirewallActionList = [
		{id:"ALLOW" ,model:false},
		{id:"DENY" ,model:false}
	]	
	$scope.FirewallEnableSelected = 'enable'
	$scope.FirewallEnableList = ['enable' , 'disable']
	$scope.FirewallId = ''

	// Firewall command string
	// protocolstr=""
	// for (var i=0 ; i<$scope.FirewallProtocolList.length; i++){
		// if ($scope.FirewallProtocolList[i].model){
			// protocolstr = ",\"nw_proto\":\""+ $scope.FirewallProtocolList[i].id+ "\""
			// break 
		// }
	// }
	// actionstr=""
	// for (var i=0 ; i<$scope.FirewallActionList.length; i++){
		// if ($scope.FirewallActionList[i].model){
			// actionstr = ",\"actions\":\""+ $scope.FirewallActionList[i].id+ "\""
			// break 
		// }
	// }	
	
	// if ($scope.FirewallPriority!="")
		// prioritystr = ",\"priority\": \""+ $scope.FirewallPriority+ "\""	
	// else 
		// prioritystr=""
	
	// $scope.FirewallEnableStr	= "/sbin/curl -X PUT http://localhost:5500/firewall/module/"+$scope.FirewallEnableSelected+"/"+$scope.Qosdpid	
	// $scope.FirweallRulesStr 	= "/sbin/curl -X POST -d '{\"nw_src\": \""+$scope.FirewallNwSrc+"\",\"nw_dst\":\""+$scope.FirewallNwDst+"\""+protocolstr+actionstr+prioritystr+"}' http://localhost:5500/firewall/rules/all"		
	// $scope.FirweallGetStatusStr = "/sbin/curl -X GET http://localhost:5500/firewall/module/status"
	// $scope.FirweallGetRulesStr 	= "/sbin/curl -X GET http://localhost:5500/firewall/rules/"+$scope.Qosdpid
	// $scope.FirewallDelRulesStr 	= "/sbin/curl -X DELETE -d '{\"rule_id\":\""+$scope.FirewallId+"\"}' http://localhost:5500/firewall/rules/"+$scope.Qosdpid
	
	//Firewall function structure
	$scope.FirewallSetFuncs = [
		{name:"SetFirewallEnable",	method:"SetFirewallEnable()"},
		{name:"SetFirewallRule",	method:"SetFirweallRule()"}
	]
	$scope.FirewallGetFuncs = [	
		{name:"GetFirewallStatus",	method:"GetFirweallStatus()", herf: "get_firwall_Status_data"},
		{name:"GetFirewallRule",	method:"GetFirweallRule()",   herf: "get_firwall_rules_data"}
	]
	$scope.FirewallDelFuncs = [	
		{name:"DelFirewallRule",	method:"DelFirewallRule()"},
	]		
	
	//Firewall Function
    $scope.FirewalltriggerMethod = function(method) {
      if (method === "SetFirewallEnable()") {
		$scope.FirewallEnableStr	= "/sbin/curl -X PUT http://localhost:5500/firewall/module/"+$scope.FirewallEnableSelected+"/"+$scope.Qosdpid	
        postdata($scope.FirewallEnableStr)
		console.log("SetFirewallEnable")
      } else if (method === "SetFirweallRule()") {
			protocolstr=""
			for (var i=0 ; i<$scope.FirewallProtocolList.length; i++){
				if ($scope.FirewallProtocolList[i].model){
					protocolstr = ",\"nw_proto\":\""+ $scope.FirewallProtocolList[i].id+ "\""
					break 
				}
			}
			actionstr=""
			for (var i=0 ; i<$scope.FirewallActionList.length; i++){
				if ($scope.FirewallActionList[i].model){
					actionstr = ",\"actions\":\""+ $scope.FirewallActionList[i].id+ "\""
					break 
				}
			}	
			
			if ($scope.FirewallPriority!="")
				prioritystr = ",\"priority\": \""+ $scope.FirewallPriority+ "\""	
			else 
				prioritystr=""

			if (($scope.FirewallNwSrc!="") && ($scope.FirewallNwDst==""))
				nwsrcnwdstystr = "\"nw_src\": \""+ $scope.FirewallNwSrc+ "\""	
			else if (($scope.FirewallNwSrc=="") && ($scope.FirewallNwDst!=""))
				nwsrcnwdstystr = "\"nw_dst\": \""+ $scope.FirewallNwDst+ "\""	
			else
				nwsrcnwdstystr = "\"nw_src\": \""+ $scope.FirewallNwSrc+ "\"" + ",\"nw_dst\": \""+ $scope.FirewallNwDst+ "\""

			
		
		$scope.FirweallRulesStr 	= "/sbin/curl -X POST -d '{" + nwsrcnwdstystr+protocolstr+actionstr+prioritystr+"}' http://localhost:5500/firewall/rules/all"		
        postdata($scope.FirweallRulesStr)	
		console.log("SetFirweallRule")
		console.log($scope.FirweallRulesStr)
      }else if (method === "GetFirweallStatus()") {
		$scope.FirweallGetStatusStr = "/sbin/curl -X GET http://localhost:5500/firewall/module/status"+" > /share/Public/FirweallStatus.txt"
        postdata($scope.FirweallGetStatusStr)
		console.log("GetFirweallStatus")
      }else if (method === "GetFirweallRule()") {
		$scope.FirweallGetRulesStr 	= "/sbin/curl -X GET http://localhost:5500/firewall/rules/"+$scope.Qosdpid+" > /share/Public/FirweallRule.txt"
        postdata($scope.FirweallGetRulesStr)
		console.log("GetFirweallRule")
      }else if (method === "DelFirewallRule()") {
		$scope.FirewallDelRulesStr 	= "/sbin/curl -X DELETE -d '{\"rule_id\":\""+$scope.FirewallId+"\"}' http://localhost:5500/firewall/rules/"+$scope.Qosdpid
        postdata($scope.FirewallDelRulesStr)
		console.log("DelFirewallRule")
      }
    }	
	
/******************************************************************/
/*********************  End of Firewall block  ********************/
/******************************************************************/
	
	//new block
	
    $scope.echo = function() {
		$http.get("http://140.118.20.158:90/echo").success(function(response) {
		//$http.get("http://127.0.0.1:90/echo").success(function(response) {
			if (response.state === "ok") {
			  $scope.state = "\u2713"
			} else {
			  $scope.state = "\u2717"
			}
			 console.log (response)
		});
    }
    setInterval(function() {
      $scope.data += 1
      $http.get('http://140.118.20.158:90/monitor').success(function(somedata) {
      //$http.get('http://127.0.0.1:90/monitor').success(function(somedata) {
        console.log(somedata)
        $scope.somedata =somedata
        // console.log("hi")
      }).error(function() {
        console.log("data error")
      })
	
      $scope.$apply()
    }, 5000)
	
	
	
	$scope.PostData = function(){
		postdata("testpost")
	}	
	$scope.SetCommand = function(){
		postdata($scope.newItem)
	}		
	
	// end of my add
  })

.config(function($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
