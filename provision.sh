#!/usr/bin/env bash

if ! [ `which ansible` ]; then
    sudo apt-get install software-properties-common
    sudo apt-add-repository ppa:ansible/ansible
    sudo apt-get update -y
    sudo locale-gen ja_JP.UTF-8
    sudo apt-get install -y ansible git-core libssl-dev
fi

ansible-playbook /vagrant/ansible/playbook.yml
