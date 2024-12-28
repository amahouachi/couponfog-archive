#!/bin/bash

# for manual execution do :
# set -a
# source env/dev.env
# infra/bin/service_monitor.sh

# CONFIGURATION OF NMAP FOR NON-ROOT USE
# sudo apt install nmap libcap2-bin
# sudo chgrp admin /usr/bin/nmap
# sudo setcap cap_net_raw,cap_net_admin,cap_net_bind_service+eip /usr/bin/nmap

workdir=/var/lib/couponfog/infra-status
export NMAP_PRIVILEGED=""
topic=$CF_AWS_SNS_TOPIC_INFRA
frequency=$CF_SERVICE_MONITOR_FREQUENCY

STATUS_UP="UP"
STATUS_DOWN="DOWN"

if [ ! -d $workdir ]
then
  mkdir $workdir
fi

if [ $# -ne 1 ]; then
    echo "Usage: $0 <services.csv file>"
    exit 1
fi

infraFile="$1"
IFS=','

while true
do
  while read name host port
  do
    statusFile=$workdir/${host}_${port}.status
    if [ ! -f "$statusFile" ]; then
      touch "$statusFile"
    fi

    status=$(<"$statusFile")

    out=$(nmap --host-timeout 500ms --initial-rtt-timeout 500ms --max-rtt-timeout 500ms -sS -n -Pn --max-retries 0 --disable-arp-ping $host -p $port 2>/dev/null | grep -q "$port/tcp open")

    if [[ $? -eq 0 ]]; then
      echo -n $STATUS_UP > "$statusFile"
      if [ "$status" = "$STATUS_DOWN" ]; then
        aws sns publish \
        --subject "[SOLVED] $name is UP" \
        --message "Previously reported issue has been cleared on $host:$port" \
        --topic-arn "$topic" \
        >/dev/null
      fi
    else
      echo -n $STATUS_DOWN > "$statusFile"
      if [ "$status" != "$STATUS_DOWN" ]; then
        aws sns publish \
        --subject "[ISSUE] $name is DOWN" \
        --message "$host:$port is down" \
        --topic-arn "$topic" \
        >/dev/null
      fi
    fi
  done < $infraFile

  sleep $frequency
done

