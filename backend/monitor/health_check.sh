#!/bin/bash

workdir=/var/lib/couponfog/infra-status
topic="arn:aws:sns:us-east-2:**********:infra-alerts"
export AWS_DEFAULT_REGION="us-east-2"
export AWS_ACCESS_KEY_ID="****************"
export AWS_SECRET_ACCESS_KEY="********************"

STATUS_UP="UP"
STATUS_DOWN="DOWN"

if [ ! -d $workdir ]
then
  mkdir $workdir
fi

if [ $# -ne 1 ]; then
    echo "Usage: $0 <infra.csv file>"
    exit 1
fi

infraFile="$1"
OLDIFS=$IFS
IFS=','

while read name host port
do
  statusFile=$workdir/${host}_${port}.status
  if [ ! -f "$statusFile" ]; then
    touch "$statusFile"
  fi

  status=$(<"$statusFile")

  out=$(sudo nmap --host-timeout 500ms --initial-rtt-timeout 500ms --max-rtt-timeout 500ms -sS -n -Pn --max-retries 0 --disable-arp-ping $host -p $port 2>/dev/null | grep -q "$port/tcp open")

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

IFS=$OLDIFS

exit

