#!/bin/sh
CONF=/etc/config/qpkg.conf
QPKG_NAME="hello_py"
QPKG_ROOT=`/sbin/getcfg $QPKG_NAME Install_Path -f ${CONF}`
case "$1" in
  start)
    ENABLED=$(/sbin/getcfg $QPKG_NAME Enable -u -d FALSE -f $CONF)
    if [ "$ENABLED" != "TRUE" ]; then
        echo "$QPKG_NAME is disabled."
        exit 1
    fi
    : ADD START ACTIONS HERE
	/share/CACHEDEV1_DATA/.qpkg/QPython2/bin/python /share/Public/hello_py/x86/hello.py  
	docker exec test ryu-manager --wsapi-port 5500 /ryu/ryu/app/rest_qos.py /ryu/ryu/app/qos_simple_switch_13.py /ryu/ryu/app/rest_conf_switch.py &
	ln -sf /share/Public/hello_py/x86/templates /share/hello_py
    ;;

  stop)
    : ADD STOP ACTIONS HERE
	rm -f /share/Web/hello_py
	killall -9 python
    ;;

  restart)
    $0 stop
    $0 start
    ;;

  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
esac

exit 0
